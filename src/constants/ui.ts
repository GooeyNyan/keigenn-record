import { Config, YesOrNo, TargetType } from "../types/ui";

export const TableHeaderHeight = 28;

export const localStorageConfigKey = "your_keigenn_record_config";

export const defaultConfig: Config = {
  targetType: TargetType.JobIconV2,
  showTargetName: YesOrNo.No,
  showDotDamage: YesOrNo.No,
  fontSize: 12,
  opacity: 45,
  durationWidth: 40,
  abilityWidth: 76,
  targetWidth: 58,
  damageWidth: 72,
  mutationWidth: 50,
};
