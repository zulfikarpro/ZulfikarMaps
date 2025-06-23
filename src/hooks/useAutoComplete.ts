import {useStore, setStore} from '@store/store';
import {Prediction} from '@slices/placesAPI';

export function useAutoComplete() {
  return useStore('places_autocomplete') || [];
}

export function setAutoComplete(text: Prediction[]) {
  return setStore('places_autocomplete', text);
}
