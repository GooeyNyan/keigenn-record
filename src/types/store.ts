import { Party as BaseParty } from "../../cactbot/types/event";

export enum StoreAction {
  AddList = 1,
  StartCombat,
  EndCombat,
  UpdateDuration,
  ChangePlayer,
  PartyChange,
}

export interface Party extends BaseParty {
  jobName: string;
  jobIconPath: string;
  jobIconUrl: string;
  jobIconFallbackUrl: string;
}
