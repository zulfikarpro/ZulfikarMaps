import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAutoComplete } from '@hooks/useAutoComplete';
import { setStore } from '@store/store';
export async function initiateStore() {
  setAutoComplete([]);
  const keys = await AsyncStorage.getAllKeys();
  loadMultiplePersistentKeys([...keys]);
}

export async function loadMultiplePersistentKeys(keys: string[]) {
  const items = await AsyncStorage.multiGet(keys);
  items.forEach(([key, value]) => {
    if (value !== null) {
      setStore(key, JSON.parse(value));
    }
  });
}
