import assets from '@assets';
import {useState, forwardRef} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {noop} from 'lodash';
import usePlacesApiSlices from '@slices/usePlacesSlice';
interface SearchBarProps {
  setIsFocus?: (e: boolean) => void;
  setSearchText?: (text: string) => void;
  searchText?: string;
}

const SearchBar = forwardRef<TextInput, SearchBarProps>(
  (
    {
      setIsFocus = noop,
      setSearchText = noop,
      searchText = undefined,
    }: SearchBarProps,
    ref,
  ) => {
    const {fetchPlacesAutocomplete} = usePlacesApiSlices();
    // const [searchText, setSearchText] = useState('');
    const handleTextChange = (e: string) => {
      setSearchText(e);
      fetchPlacesAutocomplete(e);
    };

    const search = (e: string) => {
      fetchPlacesAutocomplete(e);
    };
    const handleSearch = () => {
      searchText && search(searchText);
    };

    return (
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <TextInput
            style={styles.input}
            placeholder="testSearch..."
            value={searchText}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChangeText={(e: string) => {
              handleTextChange(e);
            }}
            ref={ref}
          />
        </View>
        <TouchableOpacity onPress={handleSearch}>
          <View style={styles.rightContainer}>
            <Image source={assets.searchIcon} style={{height: 20, width: 20}} />
          </View>
        </TouchableOpacity>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginHorizontal: 16,
    borderRadius: 16,
    height: 40,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    paddingHorizontal: 8,
    borderRadius: 24,
    fontWeight: '500',
    fontSize: 14,
    borderWidth: 0,
    maxWidth: '85%',
  },
  leftContainer: {flex: 1},
  rightContainer: {},
});
export default SearchBar;
