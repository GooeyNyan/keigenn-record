import { StoreAction } from "../types/store";
import { initialState } from "./useStore";

export const useTimer = (
  state: typeof initialState,
  dispatch: React.Dispatch<any>,
) => {
  const startTimer = (time: number) => {
    const timer = setInterval(() => {
      dispatch({
        type: StoreAction.UpdateDuration,
      });
    }, 1000);

    dispatch({
      type: StoreAction.StartCombat,
      startTime: time,
      timer: timer,
      endTime: undefined,
      inCombat: true,
      combatDuration: "00:00",
    });
  };

  const stopTimer = (time: number) => {
    dispatch({
      type: StoreAction.EndCombat,
      startTime: undefined,
      endTime: time,
      timer: undefined,
      inCombat: false,
    });
  };

  return { startTimer, stopTimer };
};
