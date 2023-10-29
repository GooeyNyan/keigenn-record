import netlog_defs from "../../cactbot/resources/netlog_defs";
import { callOverlayHandler } from "../../cactbot/resources/overlay_plugin_api";
import { EventResponses } from "../../cactbot/types/event";
import { processAbilityLine } from "../../cactbot/ui/oopsyraidsy/death_report";
import { actionChinese } from "../constants/actionName";
import { keigenns } from "../constants/keigenns";
import { getStatusName } from "../constants/status";
import { DataType, Effect, EffectIcon, LogLineEnum } from "../types/dataObject";
import { StoreAction } from "../types/store";
import { Config, YesOrNo } from "../types/ui";
import {
  DamageIcon,
  getEffectIconPath,
  getIconUrlFromCafeApi,
  getIconUrlFromXivApi,
} from "../utils/icon";
import {
  blockLowByte,
  dodgeLowByte,
  getDamageType,
  getMutation,
  isAbility,
  isDefeated,
  isDot,
  isEnemy,
  isFriendly,
  isGainsEffect,
  isLosesEffect,
  isRSVData,
  isUsefull,
  isVictory,
  isWipe,
  parriedLowByte,
} from "../utils/logLine";
import { inCombat, setInCombat } from "./useOverlayEvent";
import { initialState } from "./useStore";
import { useTimer } from "./useTimer";

export let gameRegion: "International" | "Chinese" | "Korean" | "Unknown" =
  "Chinese";
export const isChineseGameRegion = () => gameRegion === "Chinese";

(async () => {
  try {
    const e = await callOverlayHandler({
      call: "cactbotLoadUser",
      source: location.href,
      overlayName: "raidboss",
    });
    if (e?.detail?.gameRegion) {
      gameRegion = e.detail.gameRegion;
    }
  } catch (e) {
    // TODO: 这里有问题 callOverlayHandler 不会向 JS 进程正确抛出异常，catch 不到
    console.error(e);
    gameRegion = "Unknown";
  }
})();

export const RSV_PREFIX = "_rsv_";

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
  config: Config,
  e: EventResponses["LogLine"],
  startTimerFromAbility: (params: {
    time: number;
    sourceId: string;
    targetId: string;
  }) => void,
) => {
  const eventId = e.line[e.line.length - 1];
  const [type, timestamp, sourceId, source, id, ability, targetId, target] =
    e.line;
  const currentHp = Number.parseInt(
    e.line[netlog_defs.Ability.fields.targetCurrentHp],
  );

  const abilityLine = processAbilityLine(e.line); // from cactbot UnscrambleDamage calculateDamage

  const { amount, lowByte, flags, isHeal, isAttack } = abilityLine;

  if (isAttack) {
    const now = new Date(timestamp).getTime();

    if (!inCombat) {
      startTimerFromAbility({
        time: now,
        sourceId,
        targetId,
      });
    }

    if (!isEnemy(sourceId) || !isFriendly(targetId)) {
      return;
    }

    const damageType = getDamageType(flags, lowByte);
    const damageIcon = DamageIcon[damageType];

    const targetEffects = getDataObjectEffects(state, target);
    const sourceEffects = getDataObjectEffects(state, source);

    const keigennEffects = [
      ...filterTargetEffects([...targetEffects]),
      ...filterSourceEffects([...sourceEffects]),
    ];

    const effectIcons = keigennEffects.map((effect) => {
      const usefull = isUsefull(damageType, effect);
      let duration: string = Math.max(
        Math.ceil((effect.expiration - now) / 1000),
        0,
      ).toString();
      if (Number.parseInt(duration) > 9000) duration = "∞";
      return {
        duration: duration,
        source: effect.source,
        sourceId: effect.sourceId,
        effectId: effect.effectId,
        effect: effect.effect,
        url: effect.url,
        fallbackUrl: effect.fallbackUrl,
        isUsefull: usefull,
        // isOwner: effect.sourceId === targetId,
      } as EffectIcon;
    });

    const mutation = getMutation({
      damageType,
      effects: keigennEffects,
      lowByte,
      state,
    });

    let abilityName = ability;

    if (
      ability.startsWith(RSV_PREFIX) ||
      config.autoTranslateAbilityNameInIntl === YesOrNo.Yes ||
      !isChineseGameRegion()
    ) {
      const index = Number.parseInt(id, 16);
      if (index in actionChinese) {
        abilityName = actionChinese[index];
      } else if (ability in state.rsvData) {
        abilityName = state.rsvData[ability];
      }
    }

    const output: DataType = {
      key: eventId,
      ability: abilityName,
      targetId,
      target,
      targetName: target,
      damage: amount,
      damageType,
      damageIcon,
      mutation: mutation,
      duration: "00:00",
      effects: effectIcons,
      type: LogLineEnum.Ability,
      source,
      sourceId,
      isBlock: lowByte === blockLowByte,
      isParried: lowByte === parriedLowByte,
      isDodge: lowByte === dodgeLowByte,
      currentHp,
    };

    dispatch({
      type: StoreAction.AddList,
      payload: output,
    });
  }
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

  const index = Number.parseInt(effectId, 16).toString();
  const statusName = getStatusName(index);

  const effectObj: Effect = {
    expiration:
      new Date(timestamp).getTime() + Number.parseFloat(duration) * 1000,
    effectId,
    effect: statusName ? statusName : effect,
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
};

export const handleDot = (
  state: typeof initialState,
  dispatch: React.Dispatch<any>,
  e: EventResponses["LogLine"],
) => {
  const [
    type,
    timestamp,
    id,
    name,
    which,
    _effectId,
    damage,
    currentHp,
    _maxHp,
    _currentMp,
    _maxMp,
    _currentTp,
    _maxTp,
    _x,
    _y,
    _z,
    _heading,
    sourceId,
    source,
  ] = e.line;
  const eventId = e.line[e.line.length - 1];

  if (!isEnemy(sourceId) || !isFriendly(id)) {
    return;
  }

  if (which === "DoT") {
    const output: DataType = {
      key: eventId,
      type: LogLineEnum.DoT,
      targetId: id,
      targetName: name,
      source,
      sourceId,
      damage: Number.parseInt(damage, 16),
      currentHp: Number(currentHp),
    };

    dispatch({
      type: StoreAction.AddList,
      payload: output,
    });
  }
};

export const handleDefeated = (
  state: typeof initialState,
  dispatch: React.Dispatch<any>,
  e: EventResponses["LogLine"],
) => {
  const [type, timestamp, targetId, target, sourceId, source] = e.line;
  const eventId = e.line[e.line.length - 1];

  const output: DataType = {
    key: eventId,
    type: LogLineEnum.Defeated,
    targetId,
    target,
    sourceId,
    source,
  };

  dispatch({
    type: StoreAction.AddList,
    payload: output,
  });
};

export const handleWipe = (
  state: typeof initialState,
  dispatch: React.Dispatch<any>,
  e: EventResponses["LogLine"],
  stopTimer: (now: number) => void,
) => {
  const eventId = e.line[e.line.length - 1];

  const output: DataType = {
    key: eventId,
    ability: `✋ 团灭`,
    type: LogLineEnum.Wipe,
  };

  dispatch({
    type: StoreAction.AddList,
    payload: output,
  });

  setInCombat(false);
  stopTimer(Date.now());

  const kMinimumSecondsAfterWipe = 0.5;

  setTimeout(() => {
    dispatch({ type: StoreAction.MoveDataToHistoricalData });
  }, kMinimumSecondsAfterWipe * 1000);
};

export const handleVictory = (
  state: typeof initialState,
  dispatch: React.Dispatch<any>,
  e: EventResponses["LogLine"],
) => {
  const kMinimumSecondsAfterWipe = 0.5;

  setTimeout(() => {
    dispatch({ type: StoreAction.MoveDataToHistoricalData });
  }, kMinimumSecondsAfterWipe * 1000);
};

export const handleRSVData = (
  state: typeof initialState,
  dispatch: React.Dispatch<any>,
  e: EventResponses["LogLine"],
) => {
  const [type, timestamp, locale, _unknown0, key, value] = e.line;
  const eventId = e.line[e.line.length - 1];

  dispatch({
    type: StoreAction.UpdateRSVData,
    key,
    value,
  });
};

export const useLogLine = (
  config: Config,
  state: typeof initialState,
  dispatch: React.Dispatch<any>,
) => {
  const { startTimerFromAbility, stopTimer } = useTimer(state, dispatch);

  const onLogLine = (e: EventResponses["LogLine"]) => {
    const eventId = e.line[e.line.length - 1];

    if (isAbility(e)) {
      handleAbility(state, dispatch, config, e, startTimerFromAbility);
    } else if (isGainsEffect(e)) {
      handleGainsEffect(state, e);
    } else if (isLosesEffect(e)) {
      handleLosesEffect(state, e);
    } else if (isDot(e)) {
      handleDot(state, dispatch, e);
    } else if (isDefeated(e)) {
      handleDefeated(state, dispatch, e);
    } else if (isWipe(e)) {
      handleWipe(state, dispatch, e, stopTimer);
    } else if (isVictory(e)) {
      handleVictory(state, dispatch, e);
    } else if (isRSVData(e)) {
      handleRSVData(state, dispatch, e);
    }
  };

  return { onLogLine };
};
