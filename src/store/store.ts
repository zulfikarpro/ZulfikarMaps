import { useSyncExternalStore } from 'react';

type Listener = () => void;
type State = Record<string, any>;
type Store = {
  state: State;
  listeners: Record<string, Set<Listener>>;
  get: <T = any>(key: string) => T;
  set: (key: string, value: any) => void;
  subscribe: (key: string, callback: Listener) => () => void;
};

const store: Store = {
  state: {},
  listeners: {},

  get(key) {
    return store.state[key];
  },

  set(key, value) {
    store.state[key] = value;
    store.listeners[key]?.forEach(cb => cb());
  },

  subscribe(key, callback) {
    if (!store.listeners[key]) store.listeners[key] = new Set();
    store.listeners[key].add(callback);
    return () => store.listeners[key].delete(callback);
  },
};

export const useStore = <T = any>(key: string): T =>
  useSyncExternalStore(
    cb => store.subscribe(key, cb),
    () => store.get<T>(key),
  );

export const setStore = store.set;
export const getStore = store.get;
