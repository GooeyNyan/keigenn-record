import { effectIdToStatus } from "../constants/status";

enum API_HOST {
  XIV_API = "https://xivapi.com",
  CAFE_API = "https://cafemaker.wakingsands.com",
}

export const getEffectIconPath = (effectId: string) => {
  const index = Number.parseInt(effectId, 16);
  if (index in effectIdToStatus) {
    const statusId = effectIdToStatus[index];
    return getIconPath(String(statusId));
  }
  return "";
};

export const getEffectIconUrlFromXivApi = (path: string) =>
  `${API_HOST.XIV_API}/i/${path}`;

export const getEffectIconUrlFromCafeApi = (path: string) =>
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
