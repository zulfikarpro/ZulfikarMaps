import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ListRenderItemInfo,
} from 'react-native';
import React, {useEffect} from 'react';
import assets from '@assets';
import {useAutoComplete} from '@hooks/useAutoComplete';
import usePlacesApiSlices from '@slices/usePlacesSlice';
import {DetailGeometry, Prediction} from '@slices/placesAPI';
import {useHistory} from '@hooks/useHistory';
import {noop} from 'lodash';
// import { useAutoComplete } from 'src/store/useAutoComplete';

interface TestItem {
  place_id: number;
  description: string;
}

const testItem: TestItem[] = [
  {description: 'test1', place_id: 1},
  {description: 'test2', place_id: 2},
  {description: 'test3', place_id: 3},
  {description: 'test4', place_id: 4},
  {description: 'test5', place_id: 5},
  {description: 'test6', place_id: 6},
];

const {width, height} = Dimensions.get('window');
interface SearchListContainer {
  onSelectedList?: (text: string) => void;
}
const SearchListContainer = ({onSelectedList = noop}: SearchListContainer) => {
  const {getHistory, removeHistory} = useHistory();
  const searchHistoryList: DetailGeometry[] = getHistory();
  const autoCompleteList: Prediction[] = useAutoComplete();
  const {fetchPlaceDetails} = usePlacesApiSlices();

  const searchList =
    autoCompleteList.length === 0 ? searchHistoryList : autoCompleteList;

  const onSelect = (value: Prediction) => {
    onSelectedList(value?.description);
    fetchPlaceDetails(value);
  };

  const renderSearchItem = ({item, index}: ListRenderItemInfo<Prediction>) => {
    return (
      <TouchableOpacity
        onPress={() => onSelect(item)}
        testID={`result-item-${index}`}>
        <View style={styles.searchItemWrapperStyle}>
          <Text style={styles.textContainer}>{item.description}</Text>
          {autoCompleteList.length === 0 && (
            <TouchableOpacity
              style={styles.deleteButtonContainer}
              onPress={() => removeHistory(item.place_id)}>
              <Image
                source={assets.deleteIcon}
                style={{height: 16, width: 16}}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.searchListContainer}>
      <FlatList
        data={searchList}
        keyExtractor={(item: Prediction, index) => `${item.place_id}`}
        renderItem={renderSearchItem}
        style={styles.searchSuggestionContainer}
        ListEmptyComponent={() => <></>}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  deleteButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 9,
  },
  searchListContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    position: 'absolute',
    top: 40,
    zIndex: 10,
    maxHeight: height * 0.5,
    width: 0.893 * width,
  },
  searchSuggestionContainer: {},
  searchItemWrapperStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 4,
    padding: 8,
    borderBottomColor: 'black',
  },
  countryTextItemWrapper: {backgroundColor: 'purple'},
});

export default SearchListContainer;
