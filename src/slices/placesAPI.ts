import {setAutoComplete} from '@hooks/useAutoComplete';
import {setStore} from '@store/store';
import reactotron from 'reactotron-react-native';
import Config from 'react-native-config';

const GOOGLE_API_KEY = Config.GOOGLE_MAPS_API_KEY;
const GOOGLE_BASE_API = Config.GOOGLE_MAPS_BASE_API;

interface AutoCompleteResponse {
  predictions: Prediction[];
}
export interface Prediction {
  description: string;
  place_id: string;
}
interface Location {
  lat: number;
  lng: number;
}
interface Geometry {
  location: Location;
}
export interface DetailGeometry extends Prediction {
  geometry?: Geometry;
}

export interface DetailResponse {
  name: string;
  geometry: Geometry;
  place_id: string;
}

export async function fetchPlacesAutocomplete(input: string) {
  if (!input) {
    setStore('places_autocomplete', []);
    return;
  }

  const url = `${GOOGLE_BASE_API}autocomplete/json?input=${encodeURIComponent(
    input,
  )}&key=${GOOGLE_API_KEY}&components=country:my`;
  reactotron.log('HTTP Request', url);

  try {
    const res: Response = await fetch(url);
    const json: AutoCompleteResponse = await res.json();
    reactotron.log('HTTP Response', json);
    setAutoComplete(json.predictions || []);
  } catch (err) {
    console.error('Places autocomplete error', err);
    setStore('places_autocomplete', []);
  }
}

export async function fetchPlaceDetails(prediction: Prediction) {
  const url = `${GOOGLE_BASE_API}details/json?place_id=${prediction.place_id}&key=${GOOGLE_API_KEY}`;
  reactotron.log('HTTP Request', url);
  try {
    const res: Response = await fetch(url);
    const json = await res.json();
    reactotron.log('HTTP Request', json.result);
    return json.result;
  } catch (err) {
    console.error('Place details error', err);
  }
}
