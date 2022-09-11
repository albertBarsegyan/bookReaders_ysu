import isPrimitive from "../helpers/isPrimitive";

export default function useStorage(storageType: Storage = sessionStorage) {
  const saveDataToStorage = (key: string, value: any) => {
    if (isPrimitive(value)) {
      storageType.setItem(key, value);
      return;
    }
    storageType.setItem(key, JSON.stringify(value));
  };

  const getDataFromStorage = (key: string) => {
    const storageData = storageType.getItem(key);
    let parsedData;
    try {
      parsedData = JSON.parse(storageData as string);
      return parsedData;
    } catch (e) {
      return storageData ?? null;
    }
  };

  const removeDataFromStorage = (key: string) => {
    storageType.removeItem(key);
  };

  return {
    saveDataToStorage,
    getDataFromStorage,
    removeDataFromStorage,
  };
}
