import { defaultConfig, localStorageConfigKey } from "../constants/ui";
import { Job, Role, FFIcon } from "../types/job";
import { TargetType } from "../types/ui";
import { getIconPath } from "./icon";

const iconToJobEnum: Record<FFIcon, number> = {
  NONE: 0,
  Gladiator: 1,
  Pugilist: 2,
  Marauder: 3,
  Lancer: 4,
  Archer: 5,
  Conjurer: 6,
  Thaumaturge: 7,
  Carpenter: 8,
  Blacksmith: 9,
  Armorer: 10,
  Goldsmith: 11,
  Leatherworker: 12,
  Weaver: 13,
  Alchemist: 14,
  Culinarian: 15,
  Miner: 16,
  Botanist: 17,
  Fisher: 18,
  Paladin: 19,
  Monk: 20,
  Warrior: 21,
  Dragoon: 22,
  Bard: 23,
  WhiteMage: 24,
  BlackMage: 25,
  Arcanist: 26,
  Summoner: 27,
  Scholar: 28,
  Rogue: 29,
  Ninja: 30,
  Machinist: 31,
  DarkKnight: 32,
  Astrologian: 33,
  Samurai: 34,
  RedMage: 35,
  BlueMage: 36,
  Gunbreaker: 37,
  Dancer: 38,
  Reaper: 39,
  Sage: 40,
  Viper: 41,
  Pictomancer: 42,
};

export const nameToJobEnum: Record<Job, number> = {
  NONE: 0,
  GLA: 1,
  PGL: 2,
  MRD: 3,
  LNC: 4,
  ARC: 5,
  CNJ: 6,
  THM: 7,
  CRP: 8,
  BSM: 9,
  ARM: 10,
  GSM: 11,
  LTW: 12,
  WVR: 13,
  ALC: 14,
  CUL: 15,
  MIN: 16,
  BTN: 17,
  FSH: 18,
  PLD: 19,
  MNK: 20,
  WAR: 21,
  DRG: 22,
  BRD: 23,
  WHM: 24,
  BLM: 25,
  ACN: 26,
  SMN: 27,
  SCH: 28,
  ROG: 29,
  NIN: 30,
  MCH: 31,
  DRK: 32,
  AST: 33,
  SAM: 34,
  RDM: 35,
  BLU: 36,
  GNB: 37,
  DNC: 38,
  RPR: 39,
  SGE: 40,
  VPR: 41,
  PCT: 42,
};

const nameToFullName: Record<
  Job,
  {
    en: string;
    ja: string;
    cn: string;
    simple1: string;
    simple2: string;
    icon: string;
    iconFramed: string;
    iconV3: string;
  }
> = {
  NONE: {
    en: "Adventurer",
    ja: "すっぴん士",
    cn: "冒险者",
    simple1: "冒",
    simple2: "冒险",
    icon: "062043",
    iconFramed: "062143",
    iconV3: "062043",
  },
  GLA: {
    en: "Gladiator",
    ja: "剣術士",
    cn: "剑术师",
    simple1: "剑",
    simple2: "剑术",
    icon: "062001",
    iconFramed: "062101",
    iconV3: "062301",
  },
  PGL: {
    en: "Pugilist",
    ja: "格闘士",
    cn: "格斗家",
    simple1: "斗",
    simple2: "格斗",
    icon: "062002",
    iconFramed: "062102",
    iconV3: "062302",
  },
  MRD: {
    en: "Marauder",
    ja: "斧術士",
    cn: "斧术师",
    simple1: "斧",
    simple2: "斧术",
    icon: "062003",
    iconFramed: "062103",
    iconV3: "062303",
  },
  LNC: {
    en: "Lancer",
    ja: "槍術士",
    cn: "枪术师",
    simple1: "枪",
    simple2: "枪术",
    icon: "062004",
    iconFramed: "062104",
    iconV3: "062304",
  },
  ARC: {
    en: "Archer",
    ja: "弓術士",
    cn: "弓箭手",
    simple1: "弓",
    simple2: "弓箭",
    icon: "062005",
    iconFramed: "062105",
    iconV3: "062305",
  },
  CNJ: {
    en: "Conjurer",
    ja: "幻術士",
    cn: "幻术师",
    simple1: "幻",
    simple2: "幻术",
    icon: "062006",
    iconFramed: "062106",
    iconV3: "062306",
  },
  THM: {
    en: "Thaumaturge",
    ja: "呪術士",
    cn: "咒术师",
    simple1: "咒",
    simple2: "咒术",
    icon: "062007",
    iconFramed: "062107",
    iconV3: "062307",
  },
  CRP: {
    en: "Carpenter",
    ja: "木工師",
    cn: "刻木匠",
    simple1: "刻",
    simple2: "刻木",
    icon: "062008",
    iconFramed: "062108",
    iconV3: "062310",
  },
  BSM: {
    en: "Blacksmith",
    ja: "鍛冶師",
    cn: "锻铁匠",
    simple1: "锻",
    simple2: "锻铁",
    icon: "062009",
    iconFramed: "062109",
    iconV3: "062311",
  },
  ARM: {
    en: "Armorer",
    ja: "甲冑師",
    cn: "铸甲匠",
    simple1: "铸",
    simple2: "铸甲",
    icon: "062010",
    iconFramed: "062110",
    iconV3: "062312",
  },
  GSM: {
    en: "Goldsmith",
    ja: "彫金師",
    cn: "雕金匠",
    simple1: "雕",
    simple2: "雕金",
    icon: "062011",
    iconFramed: "062111",
    iconV3: "062313",
  },
  LTW: {
    en: "Leatherworker",
    ja: "革細工師",
    cn: "制革匠",
    simple1: "革",
    simple2: "制革",
    icon: "062012",
    iconFramed: "062112",
    iconV3: "062314",
  },
  WVR: {
    en: "Weaver",
    ja: "裁縫師",
    cn: "裁衣匠",
    simple1: "裁",
    simple2: "裁衣",
    icon: "062013",
    iconFramed: "062113",
    iconV3: "062315",
  },
  ALC: {
    en: "Alchemist",
    ja: "錬金術師",
    cn: "炼金术士",
    simple1: "炼",
    simple2: "炼金",
    icon: "062014",
    iconFramed: "062114",
    iconV3: "062316",
  },
  CUL: {
    en: "Culinarian",
    ja: "調理師",
    cn: "烹调师",
    simple1: "烹",
    simple2: "烹调",
    icon: "062015",
    iconFramed: "062115",
    iconV3: "062317",
  },
  MIN: {
    en: "Miner",
    ja: "採掘師",
    cn: "采矿工",
    simple1: "采",
    simple2: "采矿",
    icon: "062016",
    iconFramed: "062116",
    iconV3: "062318",
  },
  BTN: {
    en: "Botanist",
    ja: "園芸師",
    cn: "园艺工",
    simple1: "园",
    simple2: "园艺",
    icon: "062017",
    iconFramed: "062117",
    iconV3: "062319",
  },
  FSH: {
    en: "Fisher",
    ja: "漁師",
    cn: "捕鱼人",
    simple1: "捕",
    simple2: "捕鱼",
    icon: "062018",
    iconFramed: "062118",
    iconV3: "062320",
  },
  PLD: {
    en: "Paladin",
    ja: "ナイト",
    cn: "骑士",
    simple1: "骑",
    simple2: "骑士",
    icon: "062019",
    iconFramed: "062119",
    iconV3: "062401",
  },
  MNK: {
    en: "Monk",
    ja: "モンク",
    cn: "武僧",
    simple1: "僧",
    simple2: "武僧",
    icon: "062020",
    iconFramed: "062120",
    iconV3: "062402",
  },
  WAR: {
    en: "Warrior",
    ja: "戦士",
    cn: "战士",
    simple1: "战",
    simple2: "战士",
    icon: "062021",
    iconFramed: "062121",
    iconV3: "062403",
  },
  DRG: {
    en: "Dragoon",
    ja: "竜騎士",
    cn: "龙骑士",
    simple1: "龙",
    simple2: "龙骑",
    icon: "062022",
    iconFramed: "062122",
    iconV3: "062404",
  },
  BRD: {
    en: "Bard",
    ja: "吟遊詩人",
    cn: "吟游诗人",
    simple1: "诗",
    simple2: "诗人",
    icon: "062023",
    iconFramed: "062123",
    iconV3: "062405",
  },
  WHM: {
    en: "White Mage",
    ja: "白魔道士",
    cn: "白魔法师",
    simple1: "白",
    simple2: "白魔",
    icon: "062024",
    iconFramed: "062124",
    iconV3: "062406",
  },
  BLM: {
    en: "Black Mage",
    ja: "黒魔道士",
    cn: "黑魔法师",
    simple1: "黑",
    simple2: "黑魔",
    icon: "062025",
    iconFramed: "062125",
    iconV3: "062407",
  },
  ACN: {
    en: "Arcanist",
    ja: "巴術士",
    cn: "秘术师",
    simple1: "秘",
    simple2: "秘术",
    icon: "062026",
    iconFramed: "062126",
    iconV3: "062308",
  },
  SMN: {
    en: "Summoner",
    ja: "召喚士",
    cn: "召唤师",
    simple1: "召",
    simple2: "召唤",
    icon: "062027",
    iconFramed: "062127",
    iconV3: "062408",
  },
  SCH: {
    en: "Scholar",
    ja: "学者",
    cn: "学者",
    simple1: "学",
    simple2: "学者",
    icon: "062028",
    iconFramed: "062128",
    iconV3: "062409",
  },
  ROG: {
    en: "Rogue",
    ja: "双剣士",
    cn: "双剑师",
    simple1: "双",
    simple2: "双剑",
    icon: "062029",
    iconFramed: "062129",
    iconV3: "062309",
  },
  NIN: {
    en: "Ninja",
    ja: "忍者",
    cn: "忍者",
    simple1: "忍",
    simple2: "忍者",
    icon: "062030",
    iconFramed: "062130",
    iconV3: "062410",
  },
  MCH: {
    en: "Machinist",
    ja: "機工士",
    cn: "机工士",
    simple1: "机",
    simple2: "机工",
    icon: "062031",
    iconFramed: "062131",
    iconV3: "062411",
  },
  DRK: {
    en: "Dark Knight",
    ja: "暗黒騎士",
    cn: "暗黑骑士",
    simple1: "暗",
    simple2: "暗骑",
    icon: "062032",
    iconFramed: "062132",
    iconV3: "062412",
  },
  AST: {
    en: "Astrologian",
    ja: "占星術師",
    cn: "占星术士",
    simple1: "占",
    simple2: "占星",
    icon: "062033",
    iconFramed: "062133",
    iconV3: "062413",
  },
  SAM: {
    en: "Samurai",
    ja: "侍",
    cn: "武士",
    simple1: "武",
    simple2: "武士",
    icon: "062034",
    iconFramed: "062134",
    iconV3: "062414",
  },
  RDM: {
    en: "Red Mage",
    ja: "赤魔道士",
    cn: "赤魔法师",
    simple1: "赤",
    simple2: "赤魔",
    icon: "062035",
    iconFramed: "062135",
    iconV3: "062415",
  },
  BLU: {
    en: "Blue Mage",
    ja: "青魔道士",
    cn: "青魔法师",
    simple1: "青",
    simple2: "青魔",
    icon: "062036",
    iconFramed: "062136",
    iconV3: "062416",
  },
  GNB: {
    en: "Gunbreaker",
    ja: "ガンブレイカー",
    cn: "绝枪战士",
    simple1: "绝",
    simple2: "绝枪",
    icon: "062037",
    iconFramed: "062137",
    iconV3: "062417",
  },
  DNC: {
    en: "Dancer",
    ja: "踊り子",
    cn: "舞者",
    simple1: "舞",
    simple2: "舞者",
    icon: "062038",
    iconFramed: "062138",
    iconV3: "062418",
  },
  RPR: {
    en: "Reaper",
    ja: "リーパー",
    cn: "钐镰客",
    simple1: "镰",
    simple2: "钐镰",
    icon: "062039",
    iconFramed: "062139",
    iconV3: "062419",
  },
  SGE: {
    en: "Sage",
    ja: "賢者",
    cn: "贤者",
    simple1: "贤",
    simple2: "贤者",
    icon: "062040",
    iconFramed: "062140",
    iconV3: "062420",
  },
  VPR: {
    en: "Viper",
    ja: "ヴァイパー",
    cn: "蝰蛇剑士",
    simple1: "蛇",
    simple2: "蝰蛇",
    icon: "062041",
    iconFramed: "062141",
    iconV3: "062421",
  },
  PCT: {
    en: "Pictomancer",
    ja: "ピクトマンサー",
    cn: "绘灵法师",
    simple1: "绘",
    simple2: "绘灵",
    icon: "062042",
    iconFramed: "062142",
    iconV3: "062422",
  },
};
const allJobs = Object.keys(nameToJobEnum) as Job[];
const allRoles = [
  "tank",
  "healer",
  "dps",
  "crafter",
  "gatherer",
  "none",
] as Role[];

const tankJobs: Job[] = ["GLA", "PLD", "MRD", "WAR", "DRK", "GNB"];
const healerJobs: Job[] = ["CNJ", "WHM", "SCH", "AST", "SGE"];
const meleeDpsJobs: Job[] = [
  "PGL",
  "MNK",
  "LNC",
  "DRG",
  "ROG",
  "NIN",
  "SAM",
  "RPR",
  "VPR",
];
const rangedDpsJobs: Job[] = ["ARC", "BRD", "DNC", "MCH"];
const casterDpsJobs: Job[] = ["BLU", "RDM", "BLM", "SMN", "ACN", "THM", "PCT"];
const dpsJobs: Job[] = [...meleeDpsJobs, ...rangedDpsJobs, ...casterDpsJobs];
const battleJobs: Job[] = [
  ...tankJobs,
  ...healerJobs,
  ...meleeDpsJobs,
  ...rangedDpsJobs,
  ...casterDpsJobs,
];
const battleJobs2: Job[] = [
  ...tankJobs,
  ...healerJobs,
  ...meleeDpsJobs,
  ...rangedDpsJobs,
  ...casterDpsJobs,
  "NONE",
];

const craftingJobs: Job[] = [
  "CRP",
  "BSM",
  "ARM",
  "GSM",
  "LTW",
  "WVR",
  "ALC",
  "CUL",
];
const gatheringJobs: Job[] = ["MIN", "BTN", "FSH"];

const stunJobs: Job[] = ["BLU", ...tankJobs, ...meleeDpsJobs];
const silenceJobs: Job[] = ["BLU", ...tankJobs, ...rangedDpsJobs];
const sleepJobs: Job[] = ["BLM", "BLU", ...healerJobs];
const feintJobs: Job[] = [...meleeDpsJobs];
const addleJobs: Job[] = [...casterDpsJobs];
const cleanseJobs: Job[] = ["BLU", "BRD", ...healerJobs];

const jobToRoleMap: Map<Job, Role> = (() => {
  const addToMap = (map: Map<Job, Role>, jobs: Job[], role: Role) => {
    jobs.forEach((job) => map.set(job, role));
  };

  const map: Map<Job, Role> = new Map([["NONE", "none"]]);
  addToMap(map, tankJobs, "tank");
  addToMap(map, healerJobs, "healer");
  addToMap(map, dpsJobs, "dps");
  addToMap(map, craftingJobs, "crafter");
  addToMap(map, gatheringJobs, "gatherer");

  return map;
})();

let config = defaultConfig;
try {
  const localConfig = localStorage.getItem(localStorageConfigKey);
  if (localConfig) {
    config = JSON.parse(localConfig);
  }
} catch (e) {
  console.error("JSON.parse localConfig error", e);
}

const Util = {
  jobEnumToJob: (id: number) => {
    const job = allJobs.find((job: Job) => nameToJobEnum[job] === id);
    return job ?? "NONE";
  },
  jobEnumToJobIconPath: (job: number) => {
    const noneJobEnum = 43;
    const jobEnum = job ?? noneJobEnum;
    if (config.targetType === TargetType.JobName) {
      return "";
    }
    if (config.targetType === TargetType.JobIcon) {
      return getIconPath(`0620${jobEnum.toString().padStart(2, "0")}`);
    } else if (config.targetType === TargetType.JobIconV2) {
      return getIconPath(`0621${jobEnum.toString().padStart(2, "0")}`);
    } else if (config.targetType === TargetType.JobIconV3) {
      const jobObj = nameToFullName[Util.jobEnumToJob(job)];
      return getIconPath(jobObj.iconV3);
    }
    return "";
  },
  jobToJobEnum: (job: Job) => nameToJobEnum[job],
  jobToRole: (job: Job) => {
    const role = jobToRoleMap.get(job);
    return role ?? "none";
  },
  getAllRoles: (): readonly Role[] => allRoles,
  isTankJob: (job: Job) => tankJobs.includes(job),
  isHealerJob: (job: Job) => healerJobs.includes(job),
  isMeleeDpsJob: (job: Job) => meleeDpsJobs.includes(job),
  isRangedDpsJob: (job: Job) => rangedDpsJobs.includes(job),
  isCasterDpsJob: (job: Job) => casterDpsJobs.includes(job),
  isDpsJob: (job: Job) => dpsJobs.includes(job),
  isCraftingJob: (job: Job) => craftingJobs.includes(job),
  isGatheringJob: (job: Job) => gatheringJobs.includes(job),
  isCombatJob: (job: Job) => {
    return !craftingJobs.includes(job) && !gatheringJobs.includes(job);
  },
  canStun: (job: Job) => stunJobs.includes(job),
  canSilence: (job: Job) => silenceJobs.includes(job),
  canSleep: (job: Job) => sleepJobs.includes(job),
  canCleanse: (job: Job) => cleanseJobs.includes(job),
  canFeint: (job: Job) => feintJobs.includes(job),
  canAddle: (job: Job) => addleJobs.includes(job),
  getAllJobs: (): readonly Job[] => allJobs,
  getBattleJobs: (): readonly Job[] => battleJobs,
  getBattleJobs2: (): readonly Job[] => battleJobs2,
  nameToFullName: (job: Job) => {
    return nameToFullName[job];
  },
  iconToJobEnum: (icon: FFIcon) => {
    return iconToJobEnum[icon] ?? 0;
  },
  nameToJobEnum: (job: Job) => {
    return nameToJobEnum[job] ?? 0;
  },
} as const;

export default Util;
