import { HistoryOutlined, SettingOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
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
import { useEffect, useRef, useState } from "react";
import {
  addOverlayListener,
  removeOverlayListener,
} from "../cactbot/resources/overlay_plugin_api";
import "./App.css";
import {
  TableHeaderHeight,
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
import { Config, ShowTargetName, TargetType } from "./types/ui";
import copy from "copy-to-clipboard";

function App(): JSX.Element {
  let prevConfig = defaultConfig;
  try {
    const localConfig = localStorage.getItem(localStorageConfigKey);
    if (localConfig) {
      prevConfig = JSON.parse(localConfig);
    }
  } catch (e) {
    console.error("JSON.parse localConfig error", e);
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
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const { state, dispatch } = useStore();
  const { onLogLine } = useLogLine(state, dispatch);
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

  const handleSettingOk = async () => {
    const values = await form.validateFields();
    setConfig(values);
    localStorage.setItem(localStorageConfigKey, JSON.stringify(values));
    setSettingVisible(false);
  };

  const handleSettingCancel = () => setSettingVisible(false);

  const handleRowClick = (record: DataType) => {
    let text = "";
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
      }伤害
${
  record.mutation && ~~record.mutation > 0
    ? `减伤百分比：${record.mutation}%，`
    : ""
}${
        record.effects
          ? `状态：${[
              ...record.effects?.map((effect) => effect.effect),
              ...(record.isBlock ? ["格挡"] : []),
              ...(record.isParried ? ["招架"] : []),
            ].join(" ")}`
          : ""
      }`;
    }
    if (text) {
      copy(text);
      messageApi.info("已复制到剪贴板");
    }
  };

  useEffect(() => {
    addOverlayListener("LogLine", onLogLine);
    addOverlayListener("onInCombatChangedEvent", onInCombatChangedEvent);
    addOverlayListener("ChangePrimaryPlayer", onChangePrimaryPlayer);
    addOverlayListener("PartyChanged", onPartyChanged);
    addOverlayListener("ChangeZone", onChangeZone);
    addEventListener("resize", handleResize);

    return () => {
      removeOverlayListener("LogLine", onLogLine);
      removeOverlayListener("onInCombatChangedEvent", onInCombatChangedEvent);
      removeOverlayListener("ChangePrimaryPlayer", onChangePrimaryPlayer);
      removeOverlayListener("PartyChanged", onPartyChanged);
      removeOverlayListener("ChangeZone", onChangeZone);
      removeEventListener("resize", handleResize);
    };
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
        <Popover content={record.targetName}>
          <div>
            <div>{value}</div>
            {showTargetName === ShowTargetName.Yes ? (
              <div>{record.targetName?.slice(0, 2)}</div>
            ) : null}
          </div>
        </Popover>
      );
    }

    if (
      [TargetType.JobIcon, TargetType.JobIconV2, TargetType.JobIconV3].includes(
        targetType as TargetType,
      )
    ) {
      return (
        <Popover content={record.targetName}>
          <div className="flex justify-center flex-wrap w-7">
            <Image
              width={20}
              src={record.targetIconUrl}
              fallback={record.targetIconFallbackUrl}
              preview={false}
            />

            {showTargetName === ShowTargetName.Yes ? (
              <div
                className={classnames({
                  "-mt-1": [TargetType.JobIcon, TargetType.JobIconV3].includes(
                    targetType as TargetType,
                  ),
                })}
              >
                {record.targetName?.slice(0, 2)}
              </div>
            ) : null}
          </div>
        </Popover>
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
            <div className="flex items-center h-full break-all">
              <span>{value.startsWith("unknown_") ? "未知" : value}</span>
            </div>
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
          ? state.party
            ? state.party.map((i) => ({
                text: `${i.jobName} - ${i.name}`,
                value: i.id,
              }))
            : undefined
          : state?.activeHistoricalData?.party
          ? state?.activeHistoricalData?.party.map((i) => ({
              text: `${i.jobName} - ${i.name}`,
              value: i.id,
            }))
          : undefined,
      onFilter: (value, record: DataType) => record.targetId === value,
      render: (value, record) => {
        return record.type === LogLineEnum.Ability ||
          record.type === LogLineEnum.DoT ? (
          <div className="flex items-center h-full">
            {renderTarget(value, record)}
          </div>
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
                className="pr-0.5"
                width={16}
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
          <div className="flex items-center h-full">
            <span>{value}%</span>
          </div>
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
        <div className="flex items-center flex-wrap min-h-full">
          {value?.map((effect: EffectIcon) => {
            return (
              <Popover
                content={`${effect.effect} ${effect.source}`}
                key={effect.effectId}
              >
                <div className="relative">
                  <Image
                    className={!effect.isUsefull ? "grayscale" : ""}
                    width={18}
                    src={effect.url}
                    fallback={effect.fallbackUrl}
                    preview={false}
                  />
                  <span
                    className={classnames(
                      "absolute -bottom-2 left-0 text-center min-w-full",
                      {
                        "text-green-300": effect.isOwner,
                      },
                    )}
                  >
                    {effect.duration}
                  </span>
                </div>
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
              "text-cyan-400 font-bold": state.activeHistoricalKey === data.key,
            })}
          >
            <span className="mr-2">{data.combatDuration}</span>
            <span>{data.zoneName}</span>
          </div>
          <div>
            <span>{new Date(data.startTime).toLocaleString()}</span>
          </div>
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
        algorithm: [theme.darkAlgorithm],
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

        {/* 右上角控件 */}
        <div className="absolute top-1.5 right-2">
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
        </div>

        {/* 设置弹窗 */}
        <Modal
          title="设置"
          centered
          open={settingVisible}
          onOk={handleSettingOk}
          onCancel={handleSettingCancel}
        >
          <Form
            form={form}
            name="setting"
            size="small"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            initialValues={config}
          >
            <span>（目标列的设置需要刷新悬浮窗后生效）</span>
            <Form.Item<Config> name="targetType" label="目标列展示方式">
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
                <Radio value={ShowTargetName.Yes}>是</Radio>
                <Radio value={ShowTargetName.No}>否</Radio>
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
          </Form>
        </Modal>
      </div>
    </ConfigProvider>
  );
}

export default App;
