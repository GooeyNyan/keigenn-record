import { Config, ShowTargetName, TargetType } from "../types/ui";

export const TableHeaderHeight = 28;

export const localStorageConfigKey = "your_keigenn_record_config";

export const defaultConfig: Config = {
  targetType: TargetType.JobIconV2,
  showTargetName: ShowTargetName.No,
  fontSize: 12,
  opacity: 45,
  durationWidth: 40,
  abilityWidth: 90,
  targetWidth: 60,
  damageWidth: 65,
  mutationWidth: 50,
};
