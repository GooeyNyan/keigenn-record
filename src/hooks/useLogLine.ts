import { EventResponses } from "../../cactbot/types/event";
import { processAbilityLine } from "../../cactbot/ui/oopsyraidsy/death_report";
import { keigenns } from "../constants/keigenns";
import { DataType, Effect, EffectIcon } from "../types/dataObject";
import { StoreAction } from "../types/store";
import {
  DamageIcon,
  getEffectIconPath,
  getIconUrlFromCafeApi,
  getIconUrlFromXivApi,
} from "../utils/icon";
import {
  getDamageType,
  getMutation,
  isAbility,
  isGainsEffect,
  isLosesEffect,
  isUsefull,
} from "../utils/logLine";
import { initialState } from "./useStore";

// TODO: 清理机制
export const processedLogs = new Set<string>();
const MAX_PROCESS_LENGTH = 1000;

// TODO: 清理机制
// export const dataObjectMap = new Map<string, DataObject>();

export const canHandleLog = (eventId: string) => {
  if (!processedLogs.has(eventId)) {
    processedLogs.add(eventId);
    return true;
  }
  return false;
};

const processedLogsCleaner = () => {
  if (processedLogs.size > MAX_PROCESS_LENGTH) {
    processedLogs.clear();
  }
};

export const getDataObjectEffects = (
  state: typeof initialState,
  name: string,
) => {
  const dataObject = state.dataObjectMap.get(name);
  return dataObject?.effectMap.values() ?? [];
};

const filterTargetEffects = (effects: Effect[]) => {
  return effects.filter((i) => {
    if (keigenns.hasOwnProperty(i.effectId)) {
      return true;
    } else if (
      /(受伤|耐性|防御力)(提升|(大幅)?降低|低下|加重|减轻)|体力(增加|减少|衰减)/.test(
        i.effect,
      )
    ) {
      return true;
    }
    return false;
  });
};

const filterSourceEffects = (effects: Effect[]) =>
  effects.filter((i) => keigenns.hasOwnProperty(i.effectId));

export const handleAbility = (
  state: typeof initialState,
  dispatch: React.Dispatch<any>,
  e: EventResponses["LogLine"],
) => {
  const eventId = e.line[e.line.length - 1];

  const ability = processAbilityLine(e.line); // from cactbot UnscrambleDamage calculateDamage

  const { amount, lowByte, flags, isHeal, isAttack } = ability;

  if (isAttack) {
    const [type, timestamp, sourceId, source, id, ability, targetId, target] =
      e.line;

    const damageType = getDamageType(flags, lowByte);
    const damageIcon = DamageIcon[damageType];

    const targetEffects = getDataObjectEffects(state, target);
    const sourceEffects = getDataObjectEffects(state, source);

    const keigennEffects = Array.from([
      ...filterTargetEffects([...targetEffects]),
      ...filterSourceEffects([...sourceEffects]),
    ]);

    const now = new Date(timestamp).getTime();
    const effectIcons = keigennEffects.map((effect) => {
      const usefull = isUsefull(damageType, effect);
      let duration: string = Math.max(
        Math.ceil((effect.expiration - now) / 1000),
        0,
      ).toString();
      if (Number.parseInt(duration) > 9000) duration = "∞";
      return {
        duration: duration,
        effectId: effect.effectId,
        effect: effect.effect,
        url: effect.url,
        fallbackUrl: effect.fallbackUrl,
        isUsefull: usefull,
        isOwner: effect.sourceId === targetId,
      } as EffectIcon;
    });

    const mutation = getMutation({
      damageType,
      effects: keigennEffects,
      lowByte,
      state,
    });

    const output: DataType = {
      key: eventId,
      ability,
      targetId,
      target,
      targetName: target,
      damage: amount,
      damageType,
      damageIcon,
      mutation: mutation,
      duration: "00:00",
      effects: effectIcons,
    };

    dispatch({
      type: StoreAction.AddList,
      payload: output,
    });
  }
  processedLogsCleaner();
};

export const handleGainsEffect = (
  state: typeof initialState,
  e: EventResponses["LogLine"],
) => {
  const [
    type,
    timestamp,
    effectId,
    effect,
    duration,
    sourceId,
    source,
    targetId,
    target,
    count,
  ] = e.line;

  const path = getEffectIconPath(effectId, Number.parseInt(count));
  const iconUrlFromCafeApi = getIconUrlFromCafeApi(path);
  const iconUrlFromXivApi = getIconUrlFromXivApi(path);

  const effectObj: Effect = {
    expiration:
      new Date(timestamp).getTime() + Number.parseFloat(duration) * 1000,
    effectId,
    effect,
    sourceId,
    source,
    targetId,
    target,
    count,
    url: iconUrlFromCafeApi,
    fallbackUrl: iconUrlFromXivApi,
  };
  let dataObject = state.dataObjectMap.get(target);

  if (dataObject) {
    const effectMap = dataObject.effectMap;

    effectMap.set(effectId, effectObj);
  } else {
    const effectMap = new Map<string, Effect>();

    effectMap.set(effectId, effectObj);

    dataObject = {
      id: targetId,
      name: target,
      effectMap,
    };

    state.dataObjectMap.set(target, dataObject);
  }

  processedLogsCleaner();
};

export const handleLosesEffect = (
  state: typeof initialState,
  e: EventResponses["LogLine"],
) => {
  const [
    type,
    timestamp,
    effectId,
    effect,
    _duration,
    sourceId,
    source,
    targetId,
    target,
    count,
  ] = e.line;

  let dataObject = state.dataObjectMap.get(target);

  if (dataObject) {
    const effectMap = dataObject.effectMap;

    effectMap.delete(effectId);
  }

  processedLogsCleaner();
};

export const useLogLine = (
  state: typeof initialState,
  dispatch: React.Dispatch<any>,
) => {
  const onLogLine = (e: EventResponses["LogLine"]) => {
    const eventId = e.line[e.line.length - 1];

    if (isAbility(e) && canHandleLog(eventId)) {
      handleAbility(state, dispatch, e);
    } else if (isGainsEffect(e) && canHandleLog(eventId)) {
      handleGainsEffect(state, e);
    } else if (isLosesEffect(e) && canHandleLog(eventId)) {
      handleLosesEffect(state, e);
    }
  };

  return { onLogLine };
};
