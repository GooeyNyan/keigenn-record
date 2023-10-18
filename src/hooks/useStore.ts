import { useReducer } from "react";
import { StoreAction } from "../types/store";

const initialState = { list: [] };

const reducer = (state: { list: any[] }, action: any) => {
  if (action.type === StoreAction.AddList) {
    return {
      ...state,
      list: [action.payload, ...state.list],
    };
  }
  throw Error("Unknown action: " + action.type);
};

export const useStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};
