import AsyncStorage from '@react-native-async-storage/async-storage';
import { setStore } from '@store/store';
export async function setPersistentStore(key: string, value: any) {
  setStore(key, value);
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function loadPersistentStore(key: string) {
  const value = await AsyncStorage.getItem(key);
  if (value !== null) {
    setStore(key, JSON.parse(value));
  }
}
