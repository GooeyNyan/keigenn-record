import { ConfigProvider, Image, Popover, Statistic, Table, theme } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import {
  addOverlayListener,
  removeOverlayListener,
} from "../cactbot/resources/overlay_plugin_api";
import "./App.css";
import { useLogLine } from "./hooks/useLogLine";
import { useOverlayEvent } from "./hooks/useOverlayEvent";
import { useStore } from "./hooks/useStore";
import { DamageType, DataType, EffectIcon } from "./types/dataObject";
import classnames from "classnames";

const tableHeaderHeight = 28;

const columns: ColumnsType<DataType> = [
  {
    title: "时间",
    dataIndex: "duration",
    key: "duration",
    width: 40,
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
    render: (value: string) => {
      return (
        <div className="flex items-center h-full break-all">
          <span>{value.startsWith("unknown_") ? "未知" : value}</span>
        </div>
      );
    },
  },
  {
    title: "目标",
    dataIndex: "target",
    key: "target",
    width: 40,
    render: (value, record) => {
      return (
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
      );
    },
  },
  {
    title: "伤害",
    dataIndex: "damage",
    key: "damage",
    width: 65,
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
    render: (value) => (
      <div className="flex items-center flex-wrap min-h-full">
        {value.map((effect: EffectIcon) => {
          return (
            <Popover content={effect.effect} key={effect.effectId}>
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

function App(): JSX.Element {
  const [viewportWidth, setViewportWidth] = useState<number>(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState<number>(
    window.innerHeight,
  );

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

  return (
    <div className="w-screen">
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
        <Table
          columns={columns}
          dataSource={state.list}
          pagination={false}
          // virtual
          scroll={{
            x: viewportWidth,
            y: viewportHeight - tableHeaderHeight,
          }}
          size="small"
        />
      </ConfigProvider>
    </div>
  );
}

export default App;
