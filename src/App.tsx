import {
  DownCircleOutlined,
  HistoryOutlined,
  SettingOutlined,
  UpCircleOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Button,
  ConfigProvider,
  Dropdown,
  Form,
  Image,
  Modal,
  Popover,
  Radio,
  Slider,
  Table,
  message,
  theme,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import classnames from "classnames";
import copy from "copy-to-clipboard";
import { useEffect, useRef, useState } from "react";
import {
  addOverlayListener,
  removeOverlayListener,
} from "../cactbot/resources/overlay_plugin_api";
import "./App.css";
import {
  TableHeaderHeight,
  compactConfig,
  defaultConfig,
  localStorageConfigKey,
} from "./constants/ui";
import { useLogLine } from "./hooks/useLogLine";
import { useOverlayEvent } from "./hooks/useOverlayEvent";
import { useStore } from "./hooks/useStore";
import {
  DamageType,
  DataType,
  EffectIcon,
  LogLineEnum,
} from "./types/dataObject";
import { StoreAction } from "./types/store";
import { Config, TargetType, YesOrNo } from "./types/ui";
import { getInitials } from "./utils/ui";

function App(): JSX.Element {
  let prevConfig = defaultConfig;
  if (prevConfig.isCompact === YesOrNo.Yes) {
    prevConfig = { ...prevConfig, ...compactConfig };
  }
  try {
    const localConfigStr = localStorage.getItem(localStorageConfigKey);
    if (localConfigStr) {
      const localConfig: Config = JSON.parse(localConfigStr);
      prevConfig = localConfig;
    }
  } catch (e) {
    console.error("JSON.parse localConfig error", e);
  }

  // 兼容逻辑：因为默认紧凑模式了，历史用户没有 inCompact 的话，需要调整一下列宽
  if (!("isCompact" in prevConfig)) {
    prevConfig = {
      ...prevConfig,
      isCompact: YesOrNo.Yes,
      durationWidth: compactConfig.durationWidth,
      abilityWidth: compactConfig.abilityWidth,
      targetWidth: compactConfig.targetWidth,
      damageWidth: compactConfig.damageWidth,
      mutationWidth: compactConfig.mutationWidth,
    };
  }

  // 兼容逻辑：
  if (!("autoTranslateAbilityNameInIntl" in prevConfig)) {
    prevConfig = {
      ...prevConfig,
      autoTranslateAbilityNameInIntl: YesOrNo.Yes,
    };
  }

  const [viewportWidth, setViewportWidth] = useState<number>(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState<number>(
    window.innerHeight,
  );
  const [tableHeaderHeight, setTableHeaderHeight] =
    useState<number>(TableHeaderHeight);
  const [settingVisible, setSettingVisible] = useState<boolean>(false);
  const tableRef = useRef<HTMLDivElement>(null);
  const [config, setConfig] = useState<Config>(prevConfig);
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [isActOverlay, setIsActOverlay] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(true);

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const { state, dispatch } = useStore();
  const { onLogLine } = useLogLine(config, state, dispatch);
  const {
    onInCombatChangedEvent,
    onChangePrimaryPlayer,
    onPartyChanged,
    onChangeZone,
  } = useOverlayEvent(state, dispatch);

  const handleResize = () => {
    setViewportWidth(window.innerWidth);
    setViewportHeight(window.innerHeight);
  };

  const handleOverlayStateUpdate = (e: any) => {
    if ("isLocked" in e?.detail) {
      setIsLocked(e?.detail?.isLocked);
    }
  };

  const handleSettingOk = async () => {
    const values = await form.validateFields();
    setConfig(values);
    localStorage.setItem(localStorageConfigKey, JSON.stringify(values));
    setSettingVisible(false);
  };

  const handleSettingCancel = () => setSettingVisible(false);

  const handleResetForm = () => {
    let config = defaultConfig;
    if (config.isCompact === YesOrNo.Yes) {
      config = { ...config, ...compactConfig };
    }
    form.setFieldsValue(config);
  };

  const handleRowClick = (record: DataType) => {
    let text = "";
    if (record.type === LogLineEnum.Ability) {
      if (record.isDodge) {
        text = `${record.duration} ${record.source} 使用 ${record.ability} 对 ${record.targetName} 造成了 ${record.damage} 点伤害，似乎没有效果，伤害被回避了！`;
      } else {
        text = `${record.duration} ${record.source} 使用 ${record.ability} 对 ${
          record.targetName
        } 造成了 ${record.damage} 点${
          record.damageType === DamageType.Physics
            ? "物理"
            : record.damageType === DamageType.Magic
            ? "魔法"
            : ""
        }伤害`;
        if (record.mutation && ~~record.mutation > 0) {
          text += `，减伤百分比：${record.mutation}%，`;
        }
        if (
          (record.effects && record.effects.length > 0) ||
          record.isBlock ||
          record.isParried
        ) {
          text += `状态：${[
            ...(record.effects
              ? record.effects?.map((effect) => effect.effect)
              : []),
            ...(record.isBlock ? ["格挡"] : []),
            ...(record.isParried ? ["招架"] : []),
          ].join(" ")}`;
        }
      }
    } else if (record.type === LogLineEnum.Defeated) {
      text = `${record.duration} ${record.ability}`;
    } else if (record.type === LogLineEnum.Wipe) {
      text = `${record.duration} ${record.ability}`;
    } else if (record.type === LogLineEnum.DoT) {
      text = `${record.duration} ${record.source} 对 ${record.targetName} 造成了 ${record.damage} 点DoT伤害`;
    }
    if (text) {
      copy(text);
      messageApi.success("已复制到剪贴板");
    }
  };

  useEffect(() => {
    addOverlayListener("LogLine", onLogLine);
    addOverlayListener("onInCombatChangedEvent", onInCombatChangedEvent);
    addOverlayListener("ChangePrimaryPlayer", onChangePrimaryPlayer);
    addOverlayListener("PartyChanged", onPartyChanged);
    addOverlayListener("ChangeZone", onChangeZone);
    addEventListener("resize", handleResize);
    document.addEventListener("onOverlayStateUpdate", handleOverlayStateUpdate);

    return () => {
      removeOverlayListener("LogLine", onLogLine);
      removeOverlayListener("onInCombatChangedEvent", onInCombatChangedEvent);
      removeOverlayListener("ChangePrimaryPlayer", onChangePrimaryPlayer);
      removeOverlayListener("PartyChanged", onPartyChanged);
      removeOverlayListener("ChangeZone", onChangeZone);
      removeEventListener("resize", handleResize);
      document.removeEventListener(
        "onOverlayStateUpdate",
        handleOverlayStateUpdate,
      );
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const overlayWs = urlParams.get("OVERLAY_WS");
      const hostPort = urlParams.get("HOST_PORT");
      if (!window.OverlayPluginApi && !overlayWs && !hostPort) {
        setIsActOverlay(false);
      }

      if (!window.OverlayPluginApi && (overlayWs || hostPort)) {
        const wsUrl = (overlayWs || hostPort) as string;
        const connectWs = function (wsUrl: string) {
          const ws = new WebSocket(wsUrl);

          ws.addEventListener("error", (e) => {
            setIsActOverlay(false);
          });

          ws.addEventListener("open", () => {
            setIsActOverlay(true);
          });

          ws.addEventListener("close", () => {
            setIsActOverlay(false);
            window.setTimeout(() => {
              connectWs(wsUrl);
            }, 300);
          });
        };

        connectWs(wsUrl);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (tableRef.current) {
      const element = document.querySelector(".ant-table-header");
      if (element?.clientHeight) {
        setTableHeaderHeight(element.clientHeight);
      }
    }
  }, [tableRef.current]);

  const renderTarget = (value: string, record: DataType) => {
    const { targetType, showTargetName } = config;
    if (!record.targetIconUrl) {
      return value;
    }

    if (targetType === TargetType.JobName) {
      return (
        <>
          <div>{value}</div>
          {showTargetName === YesOrNo.Yes ? (
            <div className="mt-0 leading-none z-10 relative">
              {getInitials(record.targetName ?? "")}
            </div>
          ) : null}
        </>
      );
    }

    if (
      [TargetType.JobIcon, TargetType.JobIconV2, TargetType.JobIconV3].includes(
        targetType as TargetType,
      )
    ) {
      return (
        <>
          <Image
            width={20}
            src={record.targetIconUrl}
            fallback={record.targetIconFallbackUrl}
            preview={false}
          />

          {showTargetName === YesOrNo.Yes ? (
            <div
              className={classnames("leading-none z-10 relative", {
                "-mt-1.5": [TargetType.JobIcon, TargetType.JobIconV2].includes(
                  targetType as TargetType,
                ),
                "-mt-1": TargetType.JobIconV3 === targetType,
              })}
            >
              {getInitials(record.targetName ?? "")}
            </div>
          ) : null}
        </>
      );
    }

    return null;
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "时间",
      dataIndex: "duration",
      key: "duration",
      width: config.durationWidth,
      shouldCellUpdate: (record, prevRecord) =>
        record.duration !== prevRecord.duration,
      render: (value) => {
        return (
          <div className="flex items-center h-full">
            <span>{value}</span>
          </div>
        );
      },
    },
    {
      title: "技能",
      dataIndex: "ability",
      key: "ability",
      width: config.abilityWidth,
      shouldCellUpdate: (record, prevRecord) =>
        record.ability !== prevRecord.ability,
      render: (value: string, record) => {
        if (record.type === LogLineEnum.Ability) {
          return (
            <Popover content={value}>
              <div className="flex items-center">
                <span className="w-full h-full truncate">
                  {value.startsWith("unknown_") ? "未知" : value}
                </span>
              </div>
            </Popover>
          );
        }
        if (record.type === LogLineEnum.DoT) {
          return (
            <div className="flex items-center h-full break-all italic">
              <span>{value}</span>
            </div>
          );
        }
        return (
          <div className="flex items-center h-full w-72 font-bold">
            <span>{value}</span>
          </div>
        );
      },
    },
    {
      title: "目标",
      dataIndex: "target",
      key: "target",
      width: config.targetWidth,
      shouldCellUpdate: (record, prevRecord) =>
        record.target !== prevRecord.target,
      filters:
        /**
         * 有点难看
         * 先判断当前 list 里面有没有值
         * 在判断历史数据里面有没有值
         */
        state.list.length > 0
          ? state.party.length > 0
            ? state.party.map((i) => ({
                text: `${i.jobName} - ${i.name}`,
                value: i.id,
              }))
            : undefined
          : state?.activeHistoricalData?.party.length > 0
          ? state?.activeHistoricalData?.party.map((i) => ({
              text: `${i.jobName} - ${i.name}`,
              value: i.id,
            }))
          : undefined,
      onFilter: (value, record: DataType) => record.targetId === value,
      render: (value, record) => {
        return record.type === LogLineEnum.Ability ||
          record.type === LogLineEnum.DoT ? (
          <Popover content={record.targetName}>
            <div className="flex items-center justify-center flex-wrap w-full h-full relative">
              {renderTarget(value, record)}
            </div>
          </Popover>
        ) : null;
      },
    },
    {
      title: "伤害",
      dataIndex: "damage",
      key: "damage",
      width: config.damageWidth,
      shouldCellUpdate: (record, prevRecord) =>
        record.damage !== prevRecord.damage,
      sorter: (a, b) => {
        const damageA = ~~(a.damage as number);
        const damageB = ~~(b.damage as number);
        return damageA - damageB;
      },
      sortDirections: ["descend"],
      render: (value, record) => {
        return (
          <div className="flex flex-wrap items-center h-full">
            {record.damageIcon?.url ? (
              <Image
                className={config.isCompact === YesOrNo.Yes ? "" : "pr-0.5"}
                width={config.isCompact === YesOrNo.Yes ? 12 : 16}
                src={record.damageIcon?.url}
                fallback={record.damageIcon?.fallbackUrl}
                preview={false}
              />
            ) : null}
            <span
              className={
                record.damageType === DamageType.Dodge ? "line-through" : ""
              }
            >
              {value}
            </span>
          </div>
        );
      },
    },
    {
      title: "减伤",
      dataIndex: "mutation",
      key: "mutation",
      width: config.mutationWidth,
      shouldCellUpdate: (record, prevRecord) =>
        record.mutation !== prevRecord.mutation,
      render: (value) => {
        return value && value !== "0" && value > 0 ? (
          <div className="flex items-center h-full">{value}%</div>
        ) : null;
      },
    },
    {
      title: "状态",
      dataIndex: "effects",
      key: "effects",
      shouldCellUpdate: (record, prevRecord) =>
        record.effects?.map((i) => i.effectId).join(",") !==
        prevRecord.effects?.map((i) => i.effectId).join(","),
      render: (value) => (
        <div className="flex items-center flex-wrap -mt-2">
          {value?.map((effect: EffectIcon) => {
            return (
              <Popover
                content={`${effect.effect} ${effect.source}`}
                key={effect.effectId}
              >
                <div className="relative h-5 mt-2 -top-0.5">
                  <Image
                    className={!effect.isUsefull ? "grayscale" : ""}
                    height={24}
                    src={effect.url}
                    fallback={effect.fallbackUrl}
                    preview={false}
                  />
                  <span
                    className={classnames(
                      "absolute z-10 top-3.5 left-0 text-center min-w-full scale-75",
                      {
                        "text-green-300": effect.isOwner,
                      },
                    )}
                  >
                    {effect.duration}
                  </span>
                </div>
                {/* <div className="flex justify-center flex-wrap w-5">
                  <Image
                    className={!effect.isUsefull ? "grayscale" : ""}
                    width={18}
                    src={effect.url}
                    fallback={effect.fallbackUrl}
                    preview={false}
                  />
                  <span
                    className={classnames("-mt-2", {
                      "text-green-300": effect.isOwner,
                    })}
                  >
                    {effect.duration}
                  </span>
                </div> */}
              </Popover>
            );
          })}
        </div>
      ),
    },
  ];

  const dropdownItems: MenuProps["items"] = state.historicalData.map(
    (data) => ({
      key: data.key,
      label: (
        <div>
          <div
            className={classnames({
              "text-cyan-400 font-bold":
                state.list.length === 0 &&
                state.activeHistoricalKey === data.key,
            })}
          >
            <span className="mr-2">{data.combatDuration}</span>
            <span>{data.zoneName}</span>
          </div>
          {data.startTime ? (
            <div>
              <span>{new Date(data.startTime).toLocaleString()}</span>
            </div>
          ) : null}
        </div>
      ),
    }),
  );

  const onClickDropdown: MenuProps["onClick"] = ({ key }) => {
    dispatch({
      type: StoreAction.SetActiveHistoricalData,
      activeHistoricalKey: key,
    });
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: [
          theme.darkAlgorithm,
          ...(config.isCompact === YesOrNo.Yes ? [theme.compactAlgorithm] : []),
        ],
        components: {
          Table: {
            colorBgContainer: `rgba(67, 67, 67, ${
              config.opacity ? config.opacity / 100 : 0.45
            })`,
            colorText: "#fafafa",
            fontSize: config.fontSize,
            algorithm: true,
          },
        },
      }}
    >
      <div className="w-screen relative">
        {contextHolder}
        {/* 减伤数据展示 */}
        {visible ? (
          <Table
            ref={tableRef}
            rowClassName={(record: DataType) =>
              record.type === LogLineEnum.Wipe ? "wipe" : ""
            }
            onRow={(record: DataType) => ({
              onClick: () => handleRowClick(record),
            })}
            columns={columns}
            dataSource={
              state?.list?.length > 0
                ? state?.list
                : state?.activeHistoricalData?.list ?? []
            }
            pagination={false}
            // virtual
            scroll={{
              x: viewportWidth,
              y: viewportHeight - tableHeaderHeight,
            }}
            size="small"
          />
        ) : null}

        {/* 右上角控件 */}
        <div
          className={classnames("absolute top-1 right-2", {
            "top-1.5": config.isCompact === YesOrNo.No,
          })}
          style={config.isCompact === YesOrNo.Yes ? { fontSize: `14px` } : {}}
        >
          {visible ? (
            <>
              <UpCircleOutlined
                className="mr-3 text-zinc-50"
                onClick={() => setVisible(false)}
              />
              <Dropdown
                menu={{
                  items: dropdownItems,
                  onClick: onClickDropdown,
                }}
                arrow={false}
              >
                <HistoryOutlined className="mr-3 text-zinc-50" />
              </Dropdown>
              <SettingOutlined
                className="text-zinc-50"
                onClick={() => setSettingVisible(true)}
              />
            </>
          ) : (
            <div
              className="p-2 bg-zinc-500/50 flex items-center justify-center rounded-md cursor-pointer"
              onClick={() => setVisible(true)}
            >
              <DownCircleOutlined
                className="cursor-pointer text-zinc-50"
                onClick={() => setVisible(true)}
              />
            </div>
          )}
        </div>

        {/* 设置弹窗 */}
        <Modal
          title="设置"
          className="top-5"
          classNames={{
            body: "overflow-y-scroll",
          }}
          styles={{
            body: { maxHeight: viewportHeight - 160 },
          }}
          open={settingVisible}
          onOk={handleSettingOk}
          onCancel={handleSettingCancel}
          okText="保存"
          cancelText="取消"
        >
          <Form
            form={form}
            name="setting"
            size="small"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            initialValues={{
              ...defaultConfig,
              ...(config.isCompact === YesOrNo.Yes ? compactConfig : {}),
              ...config,
            }}
          >
            <div className="mb-5">
              （注：目标列、Dot的设置需要刷新悬浮窗后生效，下面有列宽设置）
            </div>

            <Form.Item<Config> name="isCompact" label="紧凑模式">
              <Radio.Group>
                <Radio
                  value={YesOrNo.Yes}
                  onClick={() => form.setFieldsValue(compactConfig)}
                >
                  是
                </Radio>
                <Radio
                  value={YesOrNo.No}
                  onClick={() => form.setFieldsValue(defaultConfig)}
                >
                  否
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item<Config>
              name="targetType"
              label="目标列展示方式"
              className="mb-3"
            >
              <Radio.Group>
                <Radio value={TargetType.JobName}>学者</Radio>
                <Radio value={TargetType.JobIcon}>
                  <div className="flex justify-center flex-wrap w-7">
                    <Image
                      width={20}
                      src={
                        "https://cafemaker.wakingsands.com/i/062000/062028.png"
                      }
                      fallback={"https://xivapi.com/i/062000/062028.png"}
                      preview={false}
                    />
                    <div className="-mt-1">丝瓜</div>
                  </div>
                </Radio>
                <Radio value={TargetType.JobIconV2}>
                  <div className="flex justify-center flex-wrap w-7">
                    <Image
                      width={20}
                      src={
                        "https://cafemaker.wakingsands.com/i/062000/062128.png"
                      }
                      fallback={"https://xivapi.com/i/062000/062128.png"}
                      preview={false}
                    />
                    <div className="">丝瓜</div>
                  </div>
                </Radio>
                <Radio value={TargetType.JobIconV3}>
                  <div className="flex justify-center flex-wrap w-7">
                    <Image
                      width={20}
                      src={
                        "https://cafemaker.wakingsands.com/i/062000/062409.png"
                      }
                      fallback={"https://xivapi.com/i/062000/062409.png"}
                      preview={false}
                    />
                    <div className="-mt-1">丝瓜</div>
                  </div>
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item<Config> name="showTargetName" label="展示名称缩写">
              <Radio.Group>
                <Radio value={YesOrNo.Yes}>是</Radio>
                <Radio value={YesOrNo.No}>否</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item<Config> name="showDotDamage" label="展示Dot伤害">
              <Radio.Group>
                <Radio value={YesOrNo.Yes}>是</Radio>
                <Radio value={YesOrNo.No}>否</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item<Config>
              name="autoTranslateAbilityNameInIntl"
              label="自动将国际服技能名翻译为中文"
            >
              <Radio.Group>
                <Radio value={YesOrNo.Yes}>是</Radio>
                <Radio value={YesOrNo.No}>否</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item<Config> label="字体大小" name="fontSize">
              <Slider max={32} min={10} />
            </Form.Item>

            <Form.Item<Config> label="背景透明度" name="opacity">
              <Slider max={100} min={1} />
            </Form.Item>

            <Form.Item<Config> label="时间列宽" name="durationWidth">
              <Slider min={1} />
            </Form.Item>

            <Form.Item<Config> label="技能列宽" name="abilityWidth">
              <Slider min={1} max={200} />
            </Form.Item>

            <Form.Item<Config> label="目标列宽" name="targetWidth">
              <Slider min={1} max={200} />
            </Form.Item>

            <Form.Item<Config> label="伤害列宽" name="damageWidth">
              <Slider min={1} />
            </Form.Item>

            <Form.Item<Config> label="减伤列宽" name="mutationWidth">
              <Slider min={1} />
            </Form.Item>

            <Form.Item<Config> label="重置全部">
              <Button type="default" onClick={handleResetForm}>
                初始化
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {!isLocked ? (
          <div className="fixed top-0 left-0 w-screen h-screen rounded-md bg-zinc-500/50 z-10">
            <div className="absolute bottom-2 left-2 text-sm text-black">
              🔓 请调整至合适大小，随后在ACT勾选"锁定悬浮窗"以开始使用。
            </div>
          </div>
        ) : null}

        {!isActOverlay ? (
          <div className="fixed top-0 left-0 w-screen h-screen rounded-md bg-zinc-500/50 z-10">
            <div className="absolute bottom-2 left-2 text-sm text-black">
              ⚠️ 请在ACT悬浮窗中添加此页面。
            </div>
          </div>
        ) : null}
      </div>
    </ConfigProvider>
  );
}

export default App;
