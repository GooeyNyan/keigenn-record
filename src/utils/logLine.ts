import netlog_defs from "../../cactbot/resources/netlog_defs";
import { EventResponses } from "../../cactbot/types/event";
import { keigenns } from "../constants/keigenns";
import { initialState } from "../hooks/useStore";
import { DamageType, Effect } from "../types/dataObject";

export const isAbility = (e: EventResponses["LogLine"]): boolean =>
  netlog_defs.Ability.type === e.line[0] ||
  netlog_defs.NetworkAOEAbility.type === e.line[0];

export const isDot = (e: EventResponses["LogLine"]): boolean =>
  netlog_defs.NetworkDoT.type === e.line[0];

export const isGainsEffect = (e: EventResponses["LogLine"]): boolean =>
  netlog_defs.GainsEffect.type === e.line[0];

export const isLosesEffect = (e: EventResponses["LogLine"]): boolean =>
  netlog_defs.LosesEffect.type === e.line[0];

export const isDefeated = (e: EventResponses["LogLine"]): boolean =>
  netlog_defs.WasDefeated.type === e.line[0];

const actorControlFadeInCommandPre62 = "40000010";
const actorControlFadeInCommand = "4000000F";

export const isWipe = (e: EventResponses["LogLine"]): boolean => {
  const command = e.line[netlog_defs.ActorControl.fields.command];
  return (
    netlog_defs.ActorControl.type === e.line[0] &&
    (command === actorControlFadeInCommand ||
      command === actorControlFadeInCommandPre62)
  );
};

export const isRSVData = (e: EventResponses["LogLine"]): boolean =>
  netlog_defs.RSVData.type === e.line[0];

export const DodgeDamageRegex = new RegExp(/1$/);
export const DeathDamageRegex = new RegExp(/33$/);
export const PhysicsDamageRegex = new RegExp(/(?<!5...)[356]$/);
export const MagicDamageRegex = new RegExp(/5.{3}[356]$/);
export const DarknessDamageRegex = new RegExp(/6.{3}[356]$/);

export const dodgeLowByte = "01";
export const blockLowByte = "05";
export const parriedLowByte = "06";

export const getDamageType = (flags: string, lowByte: string): DamageType => {
  if (lowByte === "01") {
    return DamageType.Dodge;
  }
  if (DeathDamageRegex.test(flags)) {
    return DamageType.Death;
  }
  if (PhysicsDamageRegex.test(flags)) {
    return DamageType.Physics;
  }
  if (MagicDamageRegex.test(flags)) {
    return DamageType.Magic;
  }
  if (DarknessDamageRegex.test(flags)) {
    return DamageType.Darkness;
  }
  return DamageType.Unknown;
};

const blockMutation = { physics: 20, magic: 20 };
const parriedMutation = { physics: 15, magic: 0 };

const formatNumber = (num: number) =>
  Number.isInteger(num) ? num.toString() : num.toFixed(2);

export const getMutation = (args: {
  damageType: DamageType;
  effects: Effect[];
  lowByte: string;
  state: typeof initialState;
}): number | string => {
  const { damageType, effects, lowByte, state } = args;

  const isPhysics = damageType === DamageType.Physics;
  const isMagic = damageType === DamageType.Magic;
  const isBlocked = lowByte === blockLowByte;
  const isParried = lowByte === parriedLowByte;

  // 不是物理和魔法咱就不算了（x
  if (!isPhysics && !isMagic) {
    return 0;
  }

  // 获取 buffs, debuffs 的减伤
  const effectsToMutation = effects.map((effect) => {
    try {
      const keigenn = keigenns[effect.effectId];
      if (effect.mutation) {
        return effect.mutation;
      }
      if (keigenn?.getMutation) {
        const mutation = keigenn.getMutation(effect, state);
        effect.mutation = mutation;
        return mutation;
      } else if (keigenn?.mutation) {
        return keigenn.mutation;
      }
      return { physics: 0, magic: 0 };
    } catch (e) {
      console.error(">>>> unknow effect", effect);
      return { physics: 0, magic: 0 };
    }
  });

  // 加上格挡、招架之后的减伤
  const mutations = [
    ...effectsToMutation,
    ...(isBlocked ? [blockMutation] : []),
    ...(isParried ? [parriedMutation] : []),
  ]
    .map((i) => {
      if (isPhysics) return i.physics;
      if (isMagic) return i.magic;
      return 0;
    })
    .filter((i) => i);

  const mutation = formatNumber(
    (1 -
      mutations.reduce((acc, mutation) => {
        acc *= 1 - mutation / 100;
        return acc;
      }, 1)) *
      100,
  ).replace(".00", "");

  return mutation ?? 0;
};

export const isUsefull = (damageType: DamageType, effect: Effect): boolean => {
  const keigenn = keigenns[effect.effectId];
  if (!keigenn) {
    return true;
  }
  let ret = 1;
  switch (damageType) {
    case DamageType.Physics:
      ret = keigenn.physics;
      break;
    case DamageType.Magic:
      ret = keigenn.magic;
      break;
    case DamageType.Darkness:
      ret = keigenn.darkness;
      break;
    case DamageType.Dodge:
      ret = keigenn.dodge;
      break;
    default:
      ret = 1;
      break;
  }
  return ret > 0;
};

export const isFriendly = (id: string) => id.startsWith("1");
export const isEnemy = (id: string) => id.startsWith("4");
