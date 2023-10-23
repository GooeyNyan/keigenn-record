export interface Keigenn {
  id: number;
  icon: number;
  type: "multiplier" | "absorbed";
  multiplier: { physics: number; magic: number; darkness: number };
  isFriendly: boolean;
  name?: string;
  description?: string;
}

export const keigennData: Keigenn[] = [
  {
    name: "铁壁",
    description: "减轻所受到的伤害",
    id: 1191,
    icon: 13911,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "盾阵",
    description: "受到攻击时必定发动格挡",
    id: 1856,
    icon: 12510,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "干预",
    description: "减轻所受到的伤害",
    id: 1174,
    icon: 12511,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "预警",
    description: "减轻所受到的伤害",
    id: 74,
    icon: 10151,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "武装",
    description: "减轻所受到的伤害",
    id: 1176,
    icon: 12513,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "神圣领域",
    description: "除特定攻击之外其他所有攻击均无效化",
    id: 82,
    icon: 12504,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "圣光幕帘",
    description: "抵消一定伤害",
    id: 727,
    icon: 12509,
    type: "absorbed",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "圣盾阵",
    description: "受到攻击时必定发动格挡",
    id: 2674,
    icon: 12515,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "骑士的坚守",
    description: "减轻所受到的伤害",
    id: 2675,
    icon: 12516,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "原初的直觉",
    description: "自身发动战技命中时可以恢复体力，同时减轻所受到的伤害",
    id: 735,
    icon: 12555,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "战栗",
    description:
      "体力最大值提高\n习得战栗效果提高后追加效果：自身所受的治疗效果提高",
    id: 87,
    icon: 10254,
    type: "absorbed",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "复仇",
    description: "受到物理攻击时会发动反击",
    id: 89,
    icon: 10256,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "摆脱",
    description: "抵消一定伤害",
    id: 1457,
    icon: 12557,
    type: "absorbed",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "死斗",
    description:
      "除特定攻击之外其他所有对自身发动的攻击均无法令体力减少到1以下",
    id: 409,
    icon: 10266,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "原初的血气",
    description: "自身发动战技命中时可以恢复体力，同时减轻所受到的伤害",
    id: 2678,
    icon: 12562,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "原初的血潮",
    description: "减轻所受到的伤害",
    id: 2679,
    icon: 12563,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "原初的血烟",
    description: "抵消一定伤害",
    id: 2680,
    icon: 12564,
    type: "absorbed",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "至黑之夜",
    description: "抵消一定伤害",
    id: 1178,
    icon: 13118,
    type: "absorbed",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "弃明投暗",
    description: "减轻所受到的魔法伤害",
    id: 746,
    icon: 13114,
    type: "multiplier",
    multiplier: { physics: 0, magic: 1, darkness: 0 },
    isFriendly: true,
  },
  {
    name: "暗影墙",
    description: "减轻所受到的伤害",
    id: 747,
    icon: 13113,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "暗黑布道",
    description: "减轻所受到的魔法伤害",
    id: 1894,
    icon: 13122,
    type: "multiplier",
    multiplier: { physics: 0, magic: 1, darkness: 0 },
    isFriendly: true,
  },
  {
    name: "行尸走肉",
    description:
      "受到致命伤害时体力减为1，并附加死而不僵状态\n但是对部分攻击无效",
    id: 810,
    icon: 13115,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "献奉",
    description: "减轻所受到的伤害",
    id: 2682,
    icon: 13123,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "石之心",
    description: "减轻所受到的伤害",
    id: 1840,
    icon: 13610,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "残暴弹",
    description: "抵消一定伤害",
    id: 1898,
    icon: 13614,
    type: "absorbed",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "伪装",
    description: "招架发动率提高，减轻所受到的伤害",
    id: 1832,
    icon: 13602,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "星云",
    description: "减轻所受到的伤害",
    id: 1834,
    icon: 13604,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "光之心",
    description: "减轻所受到的魔法伤害",
    id: 1839,
    icon: 13609,
    type: "multiplier",
    multiplier: { physics: 0, magic: 1, darkness: 0 },
    isFriendly: true,
  },
  {
    name: "超火流星",
    description: "除特定攻击之外其他所有攻击均无效化",
    id: 1836,
    icon: 13606,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "刚玉之心",
    description: "减轻所受到的伤害",
    id: 2683,
    icon: 13615,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "刚玉之清",
    description: "减轻所受到的伤害",
    id: 2684,
    icon: 13616,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "神祝祷",
    description: "抵消一定伤害",
    id: 1218,
    icon: 12632,
    type: "absorbed",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "节制",
    description: "减轻所受到的伤害",
    id: 1873,
    icon: 12633,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "水流幕",
    description: "减轻所受到的伤害",
    id: 2708,
    icon: 12638,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "鼓舞",
    description: "抵消一定伤害",
    id: 297,
    icon: 12801,
    type: "absorbed",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "激励",
    description: "抵消一定伤害",
    id: 1918,
    icon: 12814,
    type: "absorbed",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "炽天的幕帘",
    description: "抵消一定伤害",
    id: 1917,
    icon: 12848,
    type: "absorbed",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "野战治疗阵",
    description: "减轻所受到的伤害",
    id: 299,
    icon: 12803,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "异想的幻光",
    description: "发动治疗魔法的治疗量提高，且受到魔法攻击的伤害减少",
    id: 317,
    icon: 12828,
    type: "multiplier",
    multiplier: { physics: 0, magic: 1, darkness: 0 },
    isFriendly: true,
  },
  {
    name: "炽天的幻光",
    description: "发动治疗魔法的治疗量提高，且受到魔法攻击的伤害减少",
    id: 1875,
    icon: 12847,
    type: "multiplier",
    multiplier: { physics: 0, magic: 1, darkness: 0 },
    isFriendly: true,
  },
  {
    name: "生命回生法",
    description: "体力最大值提高，同时自身所受体力恢复效果提高",
    id: 2710,
    icon: 12815,
    type: "absorbed",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "怒涛之计",
    description: "减轻所受到的伤害",
    id: 2711,
    icon: 12816,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "命运之轮",
    description: "减轻所受到的伤害",
    id: 849,
    icon: 13226,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "天星交错",
    description: "抵消一定伤害",
    id: 1889,
    icon: 13250,
    type: "absorbed",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "擢升",
    description: "减轻所受到的伤害",
    id: 2717,
    icon: 13262,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "中间学派",
    description: "抵消一定伤害",
    id: 1921,
    icon: 13255,
    type: "absorbed",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "均衡诊断",
    description: "抵消一定伤害",
    id: 2607,
    icon: 12954,
    type: "absorbed",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "齐衡诊断",
    description: "抵消一定伤害",
    id: 2608,
    icon: 12955,
    type: "absorbed",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "均衡预后",
    description: "抵消一定伤害",
    id: 2609,
    icon: 12954,
    type: "absorbed",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "坚角清汁",
    description: "减轻所受到的伤害",
    id: 2618,
    icon: 12964,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "白牛清汁",
    description: "减轻所受到的伤害",
    id: 2619,
    icon: 12965,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "整体论",
    description: "减轻所受到的伤害",
    id: 3003,
    icon: 12971,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "整体盾",
    description: "抵消一定伤害",
    id: 3365,
    icon: 12972,
    type: "absorbed",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "血印",
    description:
      "输血状态消失后消耗血印档数重新附加输血状态，持续时间结束后根据血印剩余档数恢复自身体力",
    id: 2642,
    icon: 17585,
    type: "absorbed",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "泛血印",
    description:
      "泛输血状态消失后消耗血印档数重新附加泛输血状态，持续时间结束后根据泛血印剩余档数恢复自身体力",
    id: 2643,
    icon: 17355,
    type: "absorbed",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "心眼",
    description: "下次受到攻击时所受到的伤害减轻",
    id: 1232,
    icon: 13307,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "金刚极意",
    description: "减轻所受到的一部分伤害",
    id: 1179,
    icon: 12527,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "行吟",
    description: "减轻所受到的伤害",
    id: 1934,
    icon: 12615,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "策动",
    description: "减轻所受到的伤害",
    id: 1951,
    icon: 13021,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "防守之桑巴",
    description: "减轻所受到的伤害",
    id: 1826,
    icon: 13715,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "即兴表演结束",
    description: "抵消一定伤害",
    id: 2697,
    icon: 13721,
    type: "absorbed",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "残影",
    description: "抵消一定伤害",
    id: 488,
    icon: 10605,
    type: "absorbed",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "魔罩",
    description: "抵消一定伤害",
    id: 168,
    icon: 10456,
    type: "absorbed",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "守护之光",
    description: "抵消一定伤害",
    id: 2702,
    icon: 12691,
    type: "absorbed",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "守护纹",
    description: "抵消一定伤害",
    id: 2597,
    icon: 12934,
    type: "absorbed",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "抗死",
    description: "减轻所受到的魔法伤害，同时自身所受体力恢复效果提高",
    id: 2707,
    icon: 13408,
    type: "multiplier",
    multiplier: { physics: 0, magic: 1, darkness: 0 },
    isFriendly: true,
  },
  {
    name: "雪仇",
    description: "攻击所造成的伤害降低",
    id: 1193,
    icon: 13901,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: false,
  },
  {
    name: "牵制",
    description: "物理攻击和魔法攻击所造成的伤害降低",
    id: 1195,
    icon: 13904,
    type: "multiplier",
    multiplier: { physics: 1, magic: 0.5, darkness: 0 },
    isFriendly: false,
  },
  {
    name: "昏乱",
    description: "物理攻击和魔法攻击所造成的伤害降低",
    id: 1203,
    icon: 13917,
    type: "multiplier",
    multiplier: { physics: 0.5, magic: 1, darkness: 0 },
    isFriendly: false,
  },
  {
    name: "体力增加",
    description: "体力最大值提高",
    id: 2120,
    icon: 13523,
    type: "absorbed",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "腐臭",
    description: "造成的伤害降低",
    id: 1715,
    icon: 13502,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: false,
  },
  {
    name: "智力精神降低",
    description: "智力与精神有所降低",
    id: 2115,
    icon: 13518,
    type: "multiplier",
    multiplier: { physics: 0, magic: 1, darkness: 0 },
    isFriendly: false,
  },
  {
    name: "龙之力",
    description: "受到的伤害降低",
    id: 2500,
    icon: 13539,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "超硬化",
    description: "无法自由活动，但受到攻击的伤害减少",
    id: 1722,
    icon: 13509,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "玄结界",
    description: "减轻所受到的伤害，受到一定伤害后将附加玄天武水壁状态",
    id: 2496,
    icon: 13535,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "仙人盾",
    description: "受到的伤害降低",
    id: 2119,
    icon: 13522,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "强力守护",
    description: "令自身所受到的伤害减少，同时会以攻击力降低为代价提高自身仇恨",
    id: 1719,
    icon: 13506,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "哥布防御",
    description: "抵消一定伤害",
    id: 2114,
    icon: 13517,
    type: "absorbed",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "铜墙铁盾",
    description: "减轻所受到的伤害",
    id: 194,
    icon: 16306,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "坚守要塞",
    description: "减轻所受到的伤害",
    id: 195,
    icon: 16306,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "终极堡垒",
    description: "减轻所受到的伤害",
    id: 196,
    icon: 16306,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "原初大地",
    description: "减轻所受到的伤害",
    id: 863,
    icon: 16306,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "暗黑之力",
    description: "减轻所受到的伤害",
    id: 864,
    icon: 16306,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
  {
    name: "灵魂之青",
    description: "减轻所受到的伤害",
    id: 1931,
    icon: 16306,
    type: "multiplier",
    multiplier: { physics: 1, magic: 1, darkness: 1 },
    isFriendly: true,
  },
];
const keigennMap = new Map(keigennData.map((v) => [v.id, v]));
export function getKeigennById(id: number): Keigenn | undefined {
  const res = keigennMap.get(id);
  if (!res) return res;
  return res;
}
export function createIconUrl(icon: number): string {
  if (typeof icon === "number") {
    let head = [..."000000"];
    let iconStr = icon.toString();
    if (iconStr.length > 3) {
      const temp = [...iconStr].slice(0, iconStr.length - 3).concat(..."000");
      head = [...head.slice(0, 6 - temp.length), ...temp];
    }
    let foot = [..."000000"];
    foot = [...foot.slice(0, 6 - iconStr.length), ...iconStr];
    return `${head.join("")}/${foot.join("")}.png`;
  } else {
    return icon;
  }
}

export const keigenns = {
  "4a7": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 铁壁
  "740": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 盾阵
  "496": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 干预
  "4a": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 预警
  "498": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 武装
  "52": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 神圣领域
  "552": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 6.3新圣光幕帘
  a72: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 圣盾阵
  a73: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 骑士的坚守
  "4d": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 6.4壁垒
  "2df": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 原初的直觉
  "8b3": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 原初的勇猛
  "57": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 战栗
  "5b1": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 摆脱
  "199": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 死斗
  a76: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 原初的血气
  a77: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 原初的血潮
  a78: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 原初的血烟
  "59": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 复仇
  "49a": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 至黑之夜
  "2ea": { dodge: 0, physics: 0, magic: 1, darkness: 0, condition: "player" }, // 弃明投暗
  "2eb": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 暗影墙
  "766": { dodge: 0, physics: 0, magic: 1, darkness: 0, condition: "player" }, // 暗黑布道
  "32a": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 行尸走肉
  "32b": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 死而不僵
  cb7: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 出死入生
  "811": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 极光
  a7a: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 献奉
  "730": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 石之心
  "76a": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 残暴弹
  "728": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 伪装
  "72a": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 星云
  "72f": { dodge: 0, physics: 0, magic: 1, darkness: 0, condition: "player" }, // 光之心
  "72c": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 超火流星
  a7b: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 刚玉之心
  a7c: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 刚玉之清
  "4c2": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 神祝祷
  "751": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 节制
  a94: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 水流幕
  "129": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 鼓舞
  "77e": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 激励
  "77d": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 炽天的幕帘
  "12b": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 野战治疗阵
  "13d": { dodge: 0, physics: 0, magic: 1, darkness: 0, condition: "player" }, // 异想的幻光
  "753": { dodge: 0, physics: 0, magic: 1, darkness: 0, condition: "player" }, // 炽天的幻光
  a96: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 生命回生法
  a97: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 怒涛之计
  "351": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 命运之轮
  "761": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 天星交错
  a9d: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 擢升
  "781": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 中间学派
  a2f: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 均衡诊断
  a30: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 齐衡诊断
  a31: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 均衡预后
  a3a: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 坚角清汁
  a3b: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 白牛清汁
  bbb: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 整体论
  d25: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 整体盾
  a34: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 输血
  a35: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 泛输血
  "4d0": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 心眼
  "49b": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 金刚极意
  "78e": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 行吟
  "79f": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 策动
  "722": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 防守之桑巴
  a89: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 即兴表演结束
  "1e8": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 残影
  a8: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 魔罩
  a8e: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 守护之光
  a25: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 守护纹
  a93: { dodge: 0, physics: 0, magic: 1, darkness: 0, condition: "player" }, // 抗死
  "4b9": { dodge: 1, physics: 1, magic: 0, darkness: 0, condition: "player" }, // 亲疏自行
  "4a9": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "enemy" }, // 雪仇
  "4ab": { dodge: 1, physics: 1, magic: 0.5, darkness: 0, condition: "enemy" }, // 牵制
  "4b3": { dodge: 1, physics: 0.5, magic: 1, darkness: 0, condition: "enemy" }, // 昏乱
  "35c": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "enemy" }, // 武装解除
  "848": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 体力增加
  "6b3": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "enemy" }, // 腐臭（臭气）
  "843": { dodge: 0, physics: 0, magic: 1, darkness: 0, condition: "enemy" }, // 智力精神降低（魔法锤）
  "9c4": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 龙之力
  "6ba": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 超硬化
  "9c0": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 玄结界
  "847": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 仙人盾
  "6b7": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 强力守护
  "842": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 哥布防御
  c2: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 铜墙铁盾
  c3: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 坚守要塞
  c4: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 终极堡垒
  "35f": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 原初大地
  "360": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 暗黑之力
  "78b": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 灵魂之青
};
