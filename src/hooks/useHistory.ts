import {useEffect} from 'react';
import {useStore} from '@store/store';
import {DetailGeometry} from '@slices/placesAPI';
import {PERSIST_KEY} from '@store/PersistKey';
import {setPersistentStore} from '@store/persist';

export const useHistory = () => {
  const history: DetailGeometry[] = useStore(PERSIST_KEY.PLACES_DETAILS) || [];

  const addHistory = (value: DetailGeometry) => {
    const removed: DetailGeometry[] = history.filter(
      item => item.place_id !== value.place_id,
    );
    const updated: DetailGeometry[] = [value, ...removed];
    setPersistentStore(PERSIST_KEY.PLACES_DETAILS, updated);
  };

  const removeHistory = (place_id: string) => {
    const updated: DetailGeometry[] = history.filter(
      item => item.place_id !== place_id,
    );
    setPersistentStore(PERSIST_KEY.PLACES_DETAILS, updated);
  };

  const getHistory = () => history;

  useEffect(() => {
    console.log('[useHistory] Updated history:', history);
  }, [history]);

  return {
    history,
    getHistory,
    addHistory,
    removeHistory,
  };
};
