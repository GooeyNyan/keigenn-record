import React from "react";
import { EventResponses } from "../../cactbot/types/event";
import { Party, StoreAction } from "../types/store";
import { initialState } from "./useStore";
import { useTimer } from "./useTimer";
import Util, { nameToJobEnum } from "../utils/job";
import { getIconUrlFromCafeApi, getIconUrlFromXivApi } from "../utils/icon";

export let inCombat = false;

export const setInCombat = (combat: boolean) => (inCombat = combat);

export const useOverlayEvent = (
  state: typeof initialState,
  dispatch: React.Dispatch<any>,
) => {
  const { startTimer, stopTimer } = useTimer(state, dispatch);

  const onInCombatChangedEvent = (
    e: EventResponses["onInCombatChangedEvent"],
  ): void => {
    if (inCombat !== e.detail.inACTCombat) {
      if (e.detail.inACTCombat) {
        startTimer(Date.now());
      }
      // else {
      //   stopTimer(Date.now());
      // }
      inCombat = e.detail.inACTCombat;
    }
  };

  const onChangePrimaryPlayer = (
    e: EventResponses["ChangePrimaryPlayer"],
  ): void => {
    dispatch({
      type: StoreAction.ChangePlayer,
      payload: {
        playerId: (e.charID as unknown as number).toString(16).toUpperCase(),
        playerName: e.charName,
      },
    });
  };

  const onPartyChanged = (e: EventResponses["PartyChanged"]): void => {
    dispatch({
      type: StoreAction.PartyChange,
      payload: {
        party: e.party
          .filter((i) => i.inParty)
          .map((i): Party => {
            const path = Util.jobEnumToJobIconPath(i.job);
            return {
              ...i,
              jobName: Util.nameToFullName(Util.jobEnumToJob(i.job)).simple2,
              jobIconPath: path,

              jobIconUrl: [nameToJobEnum.VPR, nameToJobEnum.PCT].includes(i.job)
                ? getIconUrlFromXivApi(path)
                : getIconUrlFromCafeApi(path),
              jobIconFallbackUrl: getIconUrlFromXivApi(path),
            };
          }),
      },
    });
  };

  const onChangeZone = (e: EventResponses["ChangeZone"]): void => {
    setInCombat(false);
    stopTimer(Date.now());
    dispatch({ type: StoreAction.MoveDataToHistoricalData });
    // 为了记录正确的 zoneName 所以手动加了个延迟
    setTimeout(() => {
      dispatch({
        type: StoreAction.ChangeZone,
        payload: {
          zoneID: e.zoneID,
          zoneName: e.zoneName,
        },
      });
    }, 500);
  };

  const onCombatData = (e: EventResponses["CombatData"]): void => {};

  const onPlayerChangedEvent = (
    e: EventResponses["onPlayerChangedEvent"],
  ): void => {};

  return {
    onInCombatChangedEvent,
    onChangePrimaryPlayer,
    onPartyChanged,
    onChangeZone,
    onPlayerChangedEvent,
    onCombatData,
  };
};
