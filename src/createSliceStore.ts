import { useSyncExternalStore } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Listener = () => void;
type Action = { type: string; payload?: any };

export function createSliceStore<State>(
  key: string,
  reducer: (state: State, action: Action) => State,
  initialState: State,
) {
  let state: State = initialState;
  const listeners = new Set<Listener>();

  const notify = () => listeners.forEach(listener => listener());

  const subscribe = (callback: Listener) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
  };

  const useSelector = <T>(selector: (s: State) => T): T =>
    useSyncExternalStore(
      subscribe,
      () => selector(state),
      () => selector(state),
    );

  const dispatch = (action: Action) => {
    const nextState = reducer(state, action);
    if (nextState !== state) {
      state = nextState;
      AsyncStorage.setItem(key, JSON.stringify(state));
      notify();
    }
  };

  const init = async () => {
    const data = await AsyncStorage.getItem(key);
    if (data) {
      state = reducer(initialState, {
        type: '__INIT__',
        payload: JSON.parse(data),
      });
      notify();
    }
  };

  return { useSelector, dispatch, init };
}
