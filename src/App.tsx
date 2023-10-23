import { HistoryOutlined, SettingOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { ConfigProvider, Dropdown, Image, Popover, Table, theme } from "antd";
import type { ColumnsType } from "antd/es/table";
import classnames from "classnames";
import { useEffect, useRef, useState } from "react";
import {
  addOverlayListener,
  removeOverlayListener,
} from "../cactbot/resources/overlay_plugin_api";
import "./App.css";
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

const TableHeaderHeight = 28;

function App(): JSX.Element {
  const [viewportWidth, setViewportWidth] = useState<number>(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState<number>(
    window.innerHeight,
  );
  const [tableHeaderHeight, setTableHeaderHeight] =
    useState<number>(TableHeaderHeight);
  const tableRef = useRef<HTMLDivElement>(null);

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

  const columns: ColumnsType<DataType> = [
    {
      title: "时间",
      dataIndex: "duration",
      key: "duration",
      width: 40,
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
      width: 90,
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
      width: 60,
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
            {record.targetIconUrl ? (
              <Popover content={record.targetName}>
                <Image
                  width={20}
                  src={record.targetIconUrl}
                  fallback={record.targetIconFallbackUrl}
                  preview={false}
                />
              </Popover>
            ) : (
              value
            )}
          </div>
        ) : null;
      },
    },
    {
      title: "伤害",
      dataIndex: "damage",
      key: "damage",
      width: 65,
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
      width: 50,
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
            colorBgContainer: "rgba(67, 67, 67, 0.45)",
            colorText: "#fafafa",
            fontSize: 12,
            algorithm: true,
          },
        },
      }}
    >
      <div className="w-screen relative">
        <Table
          ref={tableRef}
          rowClassName={(record: DataType) => {
            if (record.type === LogLineEnum.Defeated) {
              return "defeated";
            }
            if (record.type === LogLineEnum.Wipe) {
              return "wipe";
            }
            return "";
          }}
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
          <SettingOutlined className="text-zinc-50" />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;
