import { getDataObjectEffects } from "../hooks/useLogLine";
import { initialState } from "../hooks/useStore";
import { Effect } from "../types/dataObject";

type Keigenn = {
  dodge: number;
  physics: number;
  magic: number;
  darkness: number;
  condition: "player" | "enemy";
  mutation?: {
    physics: number;
    magic: number;
  };
  getMutation?: (
    effect: Effect,
    state?: typeof initialState,
  ) => { physics: number; magic: number };
};

// https://ff14.huijiwiki.com/index.php?title=%E7%89%B9%E6%AE%8A:%E6%90%9C%E7%B4%A2&limit=500&offset=0&ns224=1&sort=just_match&search=%E4%BC%A4%E5%AE%B3%E5%87%8F%E8%BD%BB
export const keigenns: Record<string, Keigenn> = {
  // 铁壁
  "4A7": {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 20, magic: 20 },
  },
  // 盾阵
  "740": {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 15, magic: 15 },
  },
  // 干预
  "496": {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 10, magic: 10 },
    // source 处于铁壁、预警时，效果提高10%
    // TODO: 确认下干预的效果提升是快照还是即时判定的，比如铁壁只剩1s给干预，fflogs 会怎么说
    // 目前看 fflogs 上算的是快照
    getMutation(effect, state) {
      if (state) {
        const effects = Array.from(getDataObjectEffects(state, effect.source));
        // 处于铁壁、预警时
        if (effects.some((i) => ["4A7", "4A"].includes(i.effectId))) {
          return { physics: 20, magic: 20 };
        }
      }
      return { physics: 10, magic: 10 };
    },
  },
  // 预警
  "4A": {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 30, magic: 30 },
  },
  // 大预警
  EF5: {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 40, magic: 40 },
  },
  // 大预警[护盾]
  EF6: {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
  },
  // 武装戍卫 效果时间内自身的格挡发动率变为100%
  "497": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 武装戍卫
  // 武装
  "498": {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 15, magic: 15 },
  },
  "52": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 神圣领域
  "552": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 6.3新圣光幕帘
  A72: {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 15, magic: 15 },
  }, // 圣盾阵
  A73: {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 10, magic: 10 },
    getMutation(effect) {
      // 自己给自己放
      if (effect.sourceId === effect.targetId) {
        return { physics: 15, magic: 15 };
      }
      return { physics: 10, magic: 10 };
    },
  }, // 骑士的坚守
  "4D": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 6.4壁垒
  "2DF": {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 10, magic: 10 },
  }, // 原初的直觉
  "741": {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 10, magic: 10 },
  }, // 原初的勇猛
  "742": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 原初的武猛
  "57": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 战栗
  "5B1": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 摆脱
  "199": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 死斗
  A76: {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 10, magic: 10 },
  }, // 原初的血气
  A77: {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 10, magic: 10 },
  }, // 原初的血潮
  A78: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 原初的血烟
  "59": {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 30, magic: 30 },
  }, // 复仇
  EF8: {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 40, magic: 40 },
  }, // 大复仇
  "49A": {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
  }, // 至黑之夜
  "2EA": {
    dodge: 1,
    physics: 0,
    magic: 1,
    darkness: 0,
    condition: "player",
    mutation: { physics: 0, magic: 20 },
  }, // 弃明投暗
  "2EB": {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 30, magic: 30 },
  }, // 暗影墙
  EFB: {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 40, magic: 40 },
  }, // 大暗影墙
  "766": {
    dodge: 1,
    physics: 0,
    magic: 1,
    darkness: 0,
    condition: "player",
    mutation: { physics: 0, magic: 10 },
  }, // 暗黑布道
  "32A": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 行尸走肉
  "32B": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 死而不僵
  CB7: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 出死入生
  A7A: {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 10, magic: 10 },
  }, // 献奉
  "730": {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 15, magic: 15 },
  }, // 石之心
  "76A": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 残暴弹
  "728": {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 10, magic: 10 },
  }, // 伪装
  "72A": {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 30, magic: 30 },
  }, // 星云
  EFE: {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 40, magic: 40 },
  }, // 大星云
  "72F": {
    dodge: 1,
    physics: 0,
    magic: 1,
    darkness: 0,
    condition: "player",
    mutation: { physics: 0, magic: 10 },
  }, // 光之心
  "72C": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 超火流星
  A7B: {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 15, magic: 15 },
  }, // 刚玉之心
  A7C: {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 15, magic: 15 },
  }, // 刚玉之清
  "4C2": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 神祝祷
  "751": {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 10, magic: 10 },
  }, // 节制
  A94: {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 15, magic: 15 },
  }, // 水流幕
  "129": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 鼓舞
  "77E": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 激励
  "77D": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 炽天的幕帘
  "12B": {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 10, magic: 10 },
  }, // 野战治疗阵
  "13D": {
    dodge: 1,
    physics: 0,
    magic: 1,
    darkness: 0,
    condition: "player",
    mutation: { physics: 0, magic: 5 },
  }, // 异想的幻光
  "753": {
    dodge: 1,
    physics: 0,
    magic: 1,
    darkness: 0,
    condition: "player",
    mutation: { physics: 0, magic: 5 },
  }, // 炽天的幻光
  A96: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 生命回生法
  A97: {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 10, magic: 10 },
  }, // 怒涛之计
  "351": {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 10, magic: 10 },
  }, // 命运之轮
  "761": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 天星交错
  A9D: {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 10, magic: 10 },
  }, // 擢升
  F32: {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 10, magic: 10 },
  }, // 世界树之干
  F34: {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
  }, // 建筑神之塔
  "781": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 中间学派
  A2F: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 均衡诊断
  A30: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 齐衡诊断
  A31: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 均衡预后
  A3A: {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 10, magic: 10 },
  }, // 坚角清汁
  A3B: {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 10, magic: 10 },
  }, // 白牛清汁
  BBB: {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 10, magic: 10 },
  }, // 整体论
  D25: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 整体盾
  A34: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 输血
  A35: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 泛输血
  "4D0": {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 10, magic: 10 },
  }, // 心眼
  "49B": {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 20, magic: 20 },
  }, // 金刚极意
  "78E": {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 10, magic: 10 },
  }, // 行吟
  "79F": {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 10, magic: 10 },
  }, // 策动
  "722": {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 10, magic: 10 },
  }, // 防守之桑巴
  A89: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 即兴表演结束
  "1E8": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 残影
  A8: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 魔罩
  A8E: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 守护之光
  A24: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 守护纹（低等级）
  A25: { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 守护纹
  A93: {
    dodge: 1,
    physics: 0,
    magic: 1,
    darkness: 0,
    condition: "player",
    mutation: { physics: 0, magic: 10 },
  }, // 抗死
  // "4B9": { dodge: 1, physics: 1, magic: 0, darkness: 0, condition: "player" }, // 亲疏自行
  "4A9": {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "enemy",
    mutation: { physics: 10, magic: 10 },
  }, // 雪仇
  "4AB": {
    dodge: 1,
    physics: 1,
    magic: 0.5,
    darkness: 0,
    condition: "enemy",
    mutation: { physics: 10, magic: 5 },
  }, // 牵制
  "4B3": {
    dodge: 1,
    physics: 0.5,
    magic: 1,
    darkness: 0,
    condition: "enemy",
    mutation: { physics: 5, magic: 10 },
  }, // 昏乱
  "35C": {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "enemy",
    mutation: { physics: 10, magic: 10 },
  }, // 武装解除
  "09": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "enemy" }, // 减速
  "848": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 体力增加
  "6B3": {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "enemy",
    mutation: { physics: 10, magic: 10 },
  }, // 腐臭（臭气）
  "843": { dodge: 1, physics: 0, magic: 1, darkness: 0, condition: "enemy" }, // 智力精神降低（魔法锤）
  "9C4": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 龙之力
  "6BA": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 超硬化
  "9C0": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 玄结界
  "847": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 仙人盾
  "6B7": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 强力守护
  "842": { dodge: 1, physics: 1, magic: 1, darkness: 1, condition: "player" }, // 哥布防御
  C2: {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 20, magic: 20 },
  }, // 铜墙铁盾
  C3: {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 40, magic: 40 },
  }, // 坚守要塞
  C4: {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 80, magic: 80 },
  }, // 终极堡垒
  "35F": {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 80, magic: 80 },
  }, // 原初大地
  "360": {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 80, magic: 80 },
  }, // 暗黑之力
  "78B": {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
    mutation: { physics: 80, magic: 80 },
  }, // 灵魂之青
  E66: {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
  }, // 坦培拉涂层
  E67: {
    dodge: 1,
    physics: 1,
    magic: 1,
    darkness: 1,
    condition: "player",
  }, // 油性坦培拉
};
