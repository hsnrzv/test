import {v1 as uuid} from 'uuid';
import {State} from "../store/reducers";

export function generateUuid(prefix?: string) {
  return prefix ? `${prefix}-${uuid()}` : `${uuid()}`;
}

export function deepMergeObjects(...objects: any[]) {
  const isObject = (obj: any) => obj && typeof obj === 'object' && !Array.isArray(obj);

  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach((key) => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (isObject(pVal) && isObject(oVal)) {
        prev[key] = deepMergeObjects(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {});
}

export function prepareIndexedDbData(state: State) {
  const backupData = <State>{
    ...state,
    appSetting: { ...state.appSetting },
  };
  delete backupData.appSetting.hydrated;
  return backupData;
}
