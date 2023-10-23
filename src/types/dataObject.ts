import { Party } from "./store";

export type DataObject = {
  id: string;
  name: string;
  effectMap: Map<string, Effect>;
};

export type Effect = {
  timestamp?: number;
  expiration: number;
  effectId: string;
  effect: string;
  duration?: string;
  sourceId: string;
  source: string;
  targetId: string;
  target: string;
  count: string;
  url: string;
  fallbackUrl: string;
};

export type EffectIcon = {
  duration: string;
  source: string;
  effectId: string;
  effect: string;
  url: string;
  fallbackUrl: string;
  isUsefull: boolean;
  isOwner: boolean;
};

export type DataType = {
  key: string;
  duration?: string;
  ability?: string;
  source?: string;
  sourceId?: string;
  target?: string;
  targetId?: string;
  targetName?: string;
  targetIconUrl?: string;
  targetIconFallbackUrl?: string;
  damage?: string | number;
  damageType?: DamageType;
  damageIcon?: { url: string; fallbackUrl: string };
  mutation?: string | number;
  effects?: EffectIcon[];
  type?: LogLineEnum;
};

export type HistoricalData = {
  key: string;
  list: DataType[];
  startTime: number;
  endTime: number;
  combatDuration: string;
  playerId: string;
  playerName: string;
  party: Party[];
  zoneID: string;
  zoneName: string;
};

export enum LogLineEnum {
  Ability = 1,
  DoT,
  Defeated,
  Wipe,
}

export enum DamageType {
  Physics = 1,
  Magic,
  Darkness,
  Dodge,
  Death,
  Unknown,
}
