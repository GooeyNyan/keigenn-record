import { useReducer } from "react";
import { Party, StoreAction } from "../types/store";
import {
  DataObject,
  DataType,
  HistoricalData,
  LogLineEnum,
} from "../types/dataObject";
import { formatDuration } from "../utils/time";
import { Config } from "../types/ui";

export const MAX_HISTORICAL_DATA_LENGTH = 5;

export const initialState = {
  list: [] as DataType[],
  startTime: undefined,
  lastStartTime: undefined,
  endTime: undefined,
  inCombat: false,
  combatDuration: "00:00",
  dataObjectMap: new Map<string, DataObject>(),
  timer: undefined,
  playerId: "",
  playerName: "",
  party: [] as Party[],
  zoneID: "",
  zoneName: "",
  historicalData: [] as HistoricalData[],
  activeHistoricalKey: "",
  activeHistoricalData: undefined as unknown as HistoricalData,
  rsvData: {} as Record<string, string>,
};

const handleAddList = (
  state: typeof initialState,
  action: any,
): typeof initialState => {
  const item: DataType = action.payload;
  const player = state.party.find((i) => i.id === item.targetId);

  if (item.effects) {
    item.effects = item.effects.map((effect) => ({
      ...effect,
      isOwner: effect.sourceId === state.playerId,
    }));
  }

  if (item.type === LogLineEnum.Ability) {
    if (player) {
      item.duration = state.combatDuration;
      item.target = player.jobName;
      item.targetIconUrl = player.jobIconUrl;
      item.targetIconFallbackUrl = player.jobIconFallbackUrl;

      return {
        ...state,
        list: [item, ...state.list],
      };
    }
    if (item.targetId === state.playerId) {
      item.duration = state.combatDuration;
      item.target = "YOU";

      return {
        ...state,
        list: [item, ...state.list],
      };
    }
  }

  if (item.type === LogLineEnum.DoT) {
    if (player) {
      item.duration = state.combatDuration;
      item.ability = "DoT";
      item.target = player.jobName;
      item.targetIconUrl = player.jobIconUrl;
      item.targetIconFallbackUrl = player.jobIconFallbackUrl;

      return {
        ...state,
        list: [item, ...state.list],
      };
    }
    if (item.targetId === state.playerId) {
      item.duration = state.combatDuration;
      item.ability = "DoT";
      item.target = "YOU";

      return {
        ...state,
        list: [item, ...state.list],
      };
    }
  }

  if (item.type === LogLineEnum.Defeated) {
    if (!player && item.targetId !== state.playerId) {
      return state;
    }
    item.duration = state.combatDuration;

    let name = item.target;
    if (item.targetId === state.playerId) {
      name = "你";
    } else if (player) {
      name = `${player.jobName} (${player.name}) `;
    }

    item.ability = `🥺 ${name}被${item.source}做掉了！`;

    return {
      ...state,
      list: [item, ...state.list],
    };
  }

  if (item.type === LogLineEnum.Wipe) {
    item.duration = state.combatDuration;
    return {
      ...state,
      list: [item, ...state.list],
    };
  }

  return state;
};

const handleStartCombat = (
  state: typeof initialState,
  action: any,
): typeof initialState => {
  const kMinimumSecondsAfterWipe = 5;

  if (
    state.startTime ||
    (state.endTime &&
      action.startTime - state.endTime < 1000 * kMinimumSecondsAfterWipe)
  ) {
    clearInterval(action.timer);
    return state;
  }

  if (state.timer) {
    clearInterval(state.timer);
  }

  return {
    ...state,
    startTime: action.startTime,
    endTime: action.endTime,
    inCombat: action.inCombat,
    combatDuration: action.combatDuration,
    timer: action.timer,
  };
};

const handleEndCombat = (
  state: typeof initialState,
  action: any,
): typeof initialState => {
  if (state.timer) {
    clearInterval(state.timer);
  }
  return {
    ...state,
    startTime: action.startTime,
    endTime: action.endTime,
    lastStartTime: state.startTime,
    timer: action.timer,
    inCombat: action.inCombat,
  };
};

const handleUpdateDuration = (
  state: typeof initialState,
  action: any,
): typeof initialState => {
  if (state.startTime) {
    return {
      ...state,
      combatDuration: formatDuration(Date.now(), state.startTime),
    };
  } else {
    clearInterval(state.timer);
  }
  return state;
};

const handleChangePlayer = (
  state: typeof initialState,
  action: any,
): typeof initialState => {
  return {
    ...state,
    ...action.payload,
  };
};

const handlePartyChange = (
  state: typeof initialState,
  action: any,
): typeof initialState => {
  return {
    ...state,
    ...action.payload,
  };
};

const handleChangeZone = (
  state: typeof initialState,
  action: any,
): typeof initialState => {
  return {
    ...state,
    ...action.payload,
  };
};

const handleMoveDataToHistoricalData = (
  state: typeof initialState,
  action: any,
): typeof initialState => {
  try {
    const {
      list,
      startTime,
      lastStartTime,
      endTime,
      combatDuration,
      playerId,
      playerName,
      party,
      zoneID,
      zoneName,
      historicalData,
      timer,
    } = state;

    if (list.length === 0) {
      return state;
    }

    if (timer) {
      clearInterval(timer);
    }

    state.dataObjectMap.clear();

    const historicalDataItem: HistoricalData = {
      key: list[0].key,
      list: JSON.parse(JSON.stringify(list)),
      startTime: (lastStartTime ?? startTime) as unknown as number,
      endTime: endTime as unknown as number,
      combatDuration,
      playerId,
      playerName,
      party: JSON.parse(JSON.stringify(party)),
      zoneID,
      zoneName,
    };

    if (historicalData.length > MAX_HISTORICAL_DATA_LENGTH) {
      historicalData.pop();
    }

    return {
      ...state,
      startTime: undefined,
      lastStartTime: undefined,
      endTime: undefined,
      timer: undefined,
      inCombat: false,
      list: [],
      historicalData: [historicalDataItem, ...state.historicalData],
      activeHistoricalKey: list[0].key,
      activeHistoricalData: historicalDataItem,
    };
  } catch (error) {
    console.error(`onWipe Error: `, error);
    return state;
  }
};

const handleSetActiveHistoricalData = (
  state: typeof initialState,
  action: any,
): typeof initialState => {
  const activeHistoricalKey = action.activeHistoricalKey;
  const activeHistoricalData = state.historicalData.find(
    (i) => i.key === activeHistoricalKey,
  );
  return {
    ...state,
    activeHistoricalData: activeHistoricalData as HistoricalData,
    activeHistoricalKey,
  };
};

const handleUpdateRSVData = (
  state: typeof initialState,
  action: any,
): typeof initialState => {
  if (action.key && action.value) {
    state.rsvData[action.key] = action.value;
  }
  return state;
};

const reducer = (
  state: typeof initialState,
  action: any,
): typeof initialState => {
  // console.log(">>>> state", state);
  // console.log(">>>> action", action);

  switch (action.type) {
    case StoreAction.AddList:
      return handleAddList(state, action);
    case StoreAction.StartCombat:
      return handleStartCombat(state, action);
    case StoreAction.EndCombat:
      return handleEndCombat(state, action);
    case StoreAction.UpdateDuration:
      return handleUpdateDuration(state, action);
    case StoreAction.ChangePlayer:
      return handleChangePlayer(state, action);
    case StoreAction.PartyChange:
      return handlePartyChange(state, action);
    case StoreAction.ChangeZone:
      return handleChangeZone(state, action);
    case StoreAction.MoveDataToHistoricalData:
      return handleMoveDataToHistoricalData(state, action);
    case StoreAction.SetActiveHistoricalData:
      return handleSetActiveHistoricalData(state, action);
    case StoreAction.UpdateRSVData:
      return handleUpdateRSVData(state, action);
    default:
      throw Error("Unknown action: " + action.type);
  }
};

export const useStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};
