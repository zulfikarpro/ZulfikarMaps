import {View, TextInput} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';
import SearchBar from '@components/SearchBar';
import SearchListContainer from '@components/SearchListContainer';

interface SearchComponentProps {
  onSearch?: (text: string) => void;
}

const SearchComponent = ({onSearch}: SearchComponentProps) => {
  const [searchDescription, setSearchDescription] = useState<
    string | undefined
  >();
  const [onFocus, setOnFocus] = useState<boolean>(false);
  const searchRef = useRef<TextInput>(null);

  const listContainer = useMemo(() => {
    return (
      <>
        {onFocus && (
          <SearchListContainer
            onSelectedList={(text: string) => {
              setOnFocus(false);
              setSearchDescription(text.split(',')[0]);
            }}
          />
        )}
      </>
    );
  }, [onFocus]);

  return (
    <View>
      <SearchBar
        ref={searchRef}
        setIsFocus={setOnFocus}
        setSearchText={text => setSearchDescription(text)}
        searchText={searchDescription}
      />
      {listContainer}
    </View>
  );
};

export default SearchComponent;
