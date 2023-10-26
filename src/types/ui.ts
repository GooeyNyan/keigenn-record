export enum TargetType {
  JobName = 1,
  JobIcon,
  JobIconV2,
  JobIconV3,
}

export enum YesOrNo {
  Yes = 1,
  No,
}

export type Config = {
  targetType?: TargetType; // 目标列展示方式
  showTargetName?: YesOrNo; // 展示名称缩写
  showDotDamage?: YesOrNo; // 展示名称缩写
  isCompact?: YesOrNo;
  fontSize?: number; // 字体大小
  opacity?: number; // 背景透明度
  durationWidth?: number; // 时间列宽
  abilityWidth?: number; // 技能列宽
  targetWidth?: number; // 目标列宽
  damageWidth?: number; // 伤害列宽
  mutationWidth?: number; // 减伤列宽
};
