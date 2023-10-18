import netlog_defs from "../../cactbot/resources/netlog_defs";
import { LogEvent } from "../types/logLine";

export const isAbility = (e: LogEvent): boolean =>
  netlog_defs.Ability.type === e.line[0] ||
  netlog_defs.NetworkAOEAbility.type === e.line[0];

export const isDot = (e: LogEvent): boolean =>
  netlog_defs.NetworkDoT.type === e.line[0];

export const isGainsEffect = (e: LogEvent): boolean =>
  netlog_defs.GainsEffect.type === e.line[0];

export const isLosesEffect = (e: LogEvent): boolean =>
  netlog_defs.LosesEffect.type === e.line[0];
