export type DataObject = {
  id: string;
  name: string;
  effectMap: Map<string, Effect>;
};

export type Effect = {
  effectId: string;
  effect: string;
  duration: string;
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
  url: string;
  fallbackUrl: string;
};

export type DataType = {
  key: string;
  duration: string;
  ability: string;
  target: string;
  damage: string | number;
  effects: EffectIcon[];
};
