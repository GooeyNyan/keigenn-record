import { useEffect } from "react";
import "./App.css";
import { type DamageType } from "./types/damage";
import netlog_defs from "./cactbot/resources/netlog_defs";
import { addOverlayListener } from "./cactbot/resources/overlay_plugin_api";

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
        // cactbot UnscrambleDamage calculateDamage
        // TODO: 获得准确的伤害数字
        console.log(e);
      }
    });
    window.startOverlayEvents();
  });

  return <>reactt</>;
}

export default App;
