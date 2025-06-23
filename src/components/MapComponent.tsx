import {useHistory} from '@hooks/useHistory';
import React, {useEffect, useMemo} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

interface LongLat {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
const MapComponent = () => {
  const {getHistory} = useHistory();
  const savedHistory = getHistory();
  const defaultMapSize = {
    latitudeDelta: 0.09,
    longitudeDelta: 0.04,
  };
  const initialRegion = {
    latitude: 3.155,
    longitude: 101.712,
    latitudeDelta: defaultMapSize.latitudeDelta,
    longitudeDelta: defaultMapSize.longitudeDelta,
  };

  const currentLonglat: LongLat = useMemo(() => {
    if (savedHistory.length === 0) {
      return initialRegion;
    }
    const current: LongLat = {
      ...initialRegion,
      latitude: savedHistory[0].geometry?.location?.lat as number,
      longitude: savedHistory[0].geometry?.location?.lng as number,
    };
    return current;
  }, [savedHistory[0]]);

  const OS = Platform.OS;

  useEffect(() => {
    console.log('currentLonglat', currentLonglat);
  }, [currentLonglat]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        provider={OS === 'android' ? PROVIDER_GOOGLE : undefined}
        region={currentLonglat ?? initialRegion}>
        <Marker coordinate={currentLonglat} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapComponent;
