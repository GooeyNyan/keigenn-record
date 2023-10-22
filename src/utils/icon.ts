import { effectIdToStatus } from "../constants/status";
import { DamageType } from "../types/dataObject";

enum API_HOST {
  XIV_API = "https://xivapi.com",
  CAFE_API = "https://cafemaker.wakingsands.com",
}

export const getEffectIconPath = (effectId: string, count?: number) => {
  const index = Number.parseInt(effectId, 16);
  if (index in effectIdToStatus) {
    let statusId = effectIdToStatus[index];
    if (count && count > 1 && count <= 16) {
      statusId += count - 1;
    }
    return getIconPath(String(statusId));
  }
  return "";
};

export const getIconUrlFromXivApi = (path: string) =>
  `${API_HOST.XIV_API}/i/${path}`;

export const getIconUrlFromCafeApi = (path: string) =>
  `${API_HOST.CAFE_API}/i/${path}`;

export const getIconPath = (iconId: string) => {
  // https://xivapi.com/docs/Icons
  // first we need to add padding to the iconId
  if (iconId.length >= 6) {
    iconId = iconId.padStart(5, "0");
  } else {
    iconId = "0" + iconId.padStart(5, "0");
  }

  let folder_id: string;

  // Now we can build the folder from the padded iconId
  if (iconId.length >= 6) {
    folder_id = iconId[0] + iconId[1] + iconId[2] + "000";
  } else {
    folder_id = "0" + iconId[1] + iconId[2] + "000";
  }

  let path: string = `${folder_id}/${iconId}.png`;

  return path;
};

export const DamageIcon: Record<
  DamageType,
  { url: string; fallbackUrl: string }
> = {
  [DamageType.Physics]: {
    url: getIconUrlFromCafeApi(getIconPath("060011")),
    fallbackUrl: getIconUrlFromXivApi(getIconPath("060011")),
  },
  [DamageType.Magic]: {
    url: getIconUrlFromCafeApi(getIconPath("060012")),
    fallbackUrl: getIconUrlFromXivApi(getIconPath("060012")),
  },
  [DamageType.Darkness]: {
    url: getIconUrlFromCafeApi(getIconPath("060013")),
    fallbackUrl: getIconUrlFromXivApi(getIconPath("060013")),
  },
  [DamageType.Death]: {
    url: getIconUrlFromCafeApi(getIconPath("060013")),
    fallbackUrl: getIconUrlFromXivApi(getIconPath("060013")),
  },
  [DamageType.Dodge]: {
    url: "",
    fallbackUrl: "",
  },
  [DamageType.Unknown]: {
    url: "",
    fallbackUrl: "",
  },
};
