import {
  DetailGeometry,
  DetailResponse,
  fetchPlaceDetails,
  fetchPlacesAutocomplete,
  Prediction,
} from '@slices/placesAPI';
import {useHistory} from '@hooks/useHistory';

const usePlacesApiSlices = () => {
  const {addHistory} = useHistory();

  const wrappedFetchAutocomplete = async (input: string) => {
    const predictions = await fetchPlacesAutocomplete(input);
    return predictions;
  };

  const wrappedFetchPlaceDetails = async (prediction: Prediction) => {
    const result: DetailResponse = await fetchPlaceDetails(prediction);
    const {geometry, place_id} = result || {};
    if (result) {
      addHistory({description: prediction.description, geometry, place_id});
    }
    return result;
  };

  return {
    fetchPlacesAutocomplete: wrappedFetchAutocomplete,
    fetchPlaceDetails: wrappedFetchPlaceDetails,
  };
};

export default usePlacesApiSlices;
