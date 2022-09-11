import isPrimitive from "../helpers/isPrimitive";

export default function useSessionStorage() {
  const saveDataToSessionStorage = (key: string, value: any) => {
    if (isPrimitive(value)) {
      sessionStorage.setItem(key, value);
      return;
    }
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  const getItemFromSessionStorage = (key: string) => {
    return sessionStorage.getItem(key) ?? null;
  };
  const removeItemFromSessionStorage = (key: string) => {
    sessionStorage.removeItem(key);
  };
  return {
    saveDataToSessionStorage,
    getItemFromSessionStorage,
    removeItemFromSessionStorage,
  };
}
