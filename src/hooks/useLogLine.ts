import { type EventMap } from "../../cactbot/types/event";
import { processAbilityLine } from "../../cactbot/ui/oopsyraidsy/death_report";
import { DataObject, DataType, Effect, EffectIcon } from "../types/dataObject";
import { LogEvent } from "../types/logLine";
import { StoreAction } from "../types/store";
import {
  getEffectIconPath,
  getEffectIconUrlFromCafeApi,
  getEffectIconUrlFromXivApi,
} from "../utils/icon";
import { isAbility, isGainsEffect, isLosesEffect } from "../utils/logLine";

// TODO: 团灭清理
const processedLogs = new Set<string>();
const MAX_PROCESS_LENGTH = 1000;

// TODO: 团灭清理
const dataObjectMap = new Map<string, DataObject>();

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

const getDataObjectEffects = (id: string) => {
  const dataObject = dataObjectMap.get(id);
  return dataObject?.effectMap.values() ?? [];
};

// TODO: 判断来自玩家, onpartyChange 的时候记录一下玩家
// TODO: 区分伤害类型
export const handleAbility = (e: LogEvent, dispatch: React.Dispatch<any>) => {
  const eventId = e.line[e.line.length - 1];

  const ability = processAbilityLine(e.line); // from cactbot UnscrambleDamage calculateDamage

  const { amount, lowByte, flags, isHeal, isAttack } = ability;

  if (isAttack) {
    const [type, timestamp, sourceId, source, id, ability, targetId, target] =
      e.line;

    const effects = getDataObjectEffects(targetId);

    const output = {
      key: eventId,
      duration: "",
      ability: ability,
      target: target,
      damage: amount,
      effects: Array.from(effects).map((i) => {
        return {
          duration: "",
          url: i.url,
          fallbackUrl: i.fallbackUrl,
        } as EffectIcon;
      }),
    };

    dispatch({
      type: StoreAction.AddList,
      payload: output as DataType,
    });
  }
  processedLogsCleaner();
};

export const handleGainsEffect = (e: LogEvent) => {
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

  let dataObject = dataObjectMap.get(targetId);
  const path = getEffectIconPath(effectId);
  const iconUrlFromCafeApi = getEffectIconUrlFromCafeApi(path);
  const iconUrlFromXivApi = getEffectIconUrlFromXivApi(path);

  if (dataObject) {
    const effectMap = dataObject.effectMap;

    effectMap.set(effectId, {
      effectId,
      effect,
      duration,
      sourceId,
      source,
      targetId,
      target,
      count,
      url: iconUrlFromCafeApi,
      fallbackUrl: iconUrlFromXivApi,
    });
  } else {
    const effectMap = new Map<string, Effect>();

    effectMap.set(effectId, {
      effectId,
      effect,
      duration,
      sourceId,
      source,
      targetId,
      target,
      count,
      url: iconUrlFromCafeApi,
      fallbackUrl: iconUrlFromXivApi,
    });

    dataObject = {
      id: targetId,
      name: target,
      effectMap,
    };

    dataObjectMap.set(targetId, dataObject);
  }

  processedLogsCleaner();
};

export const handleLosesEffect = (e: LogEvent) => {
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

  let dataObject = dataObjectMap.get(targetId);

  if (dataObject) {
    const effectMap = dataObject.effectMap;

    effectMap.delete(effectId);
  }

  processedLogsCleaner();
};

export const useLogLine = (dispatch: React.Dispatch<any>) => {
  const onLogLine: EventMap["LogLine"] = (e) => {
    const eventId = e.line[e.line.length - 1];

    if (isAbility(e) && canHandleLog(eventId)) {
      handleAbility(e, dispatch);
    } else if (isGainsEffect(e) && canHandleLog(eventId)) {
      handleGainsEffect(e);
    } else if (isLosesEffect(e) && canHandleLog(eventId)) {
      handleLosesEffect(e);
    }
  };

  return { onLogLine };
};
