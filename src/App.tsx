import { Table, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import "./App.css";
import { addOverlayListener } from "../cactbot/resources/overlay_plugin_api";
import { useLogLine } from "./hooks/useLogLine";
import { useStore } from "./hooks/useStore";
import { DataType, EffectIcon } from "./types/dataObject";

const columns: ColumnsType<DataType> = [
  {
    title: "时间",
    dataIndex: "duartion",
    key: "duration",
    width: 60,
  },
  {
    title: "技能",
    dataIndex: "ability",
    key: "ability",
    width: 100,
  },
  {
    title: "目标",
    dataIndex: "target",
    key: "target",
    width: 100,
  },
  {
    title: "伤害",
    dataIndex: "damage",
    key: "damage",
    width: 70,
  },
  {
    title: "状态",
    dataIndex: "effects",
    key: "effects",
    render: (value) => (
      <div className="flex items-center flex-wrap">
        {value.map((i: EffectIcon) => (
          <Image
            height={25}
            src={i.url}
            fallback={i.fallbackUrl}
            preview={false}
          />
        ))}
      </div>
    ),
  },
];

function App(): JSX.Element {
  const { state, dispatch } = useStore();
  const { onLogLine } = useLogLine(dispatch);

  useEffect(() => {
    addOverlayListener("LogLine", onLogLine);
    // window.startOverlayEvents?.();
  }, []);

  return (
    <div className="w-screen">
      <Table
        columns={columns}
        dataSource={state.list}
        pagination={false}
        size="small"
      />
    </div>
  );
}

export default App;
