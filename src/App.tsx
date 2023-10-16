import { useEffect } from "react";
import "./App.css";
import netlog_defs from "./resources/netlog_defs";
import { addOverlayListener } from "./resources/overlay_plugin_api";
import { type DamageType } from "./types/damage";

function App(): JSX.Element {
  useEffect(() => {
    addOverlayListener("LogLine", (e) => {
      if (
        [
          netlog_defs.Ability.type,
          netlog_defs.NetworkAOEAbility.type,
          netlog_defs.NetworkDoT.type,
        ].includes(e.line[0] as DamageType)
      ) {
        console.log(e);
      }
    });
    window.startOverlayEvents();
  });

  return <>react</>;
}

export default App;
