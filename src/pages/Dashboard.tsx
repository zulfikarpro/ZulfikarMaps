import {StyleSheet, TouchableWithoutFeedback, Keyboard} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchComponent from '@components/SearchComponent';
import MapComponent from '@components/MapComponent';

const Dashboard = () => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <SearchComponent />
        <MapComponent />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Dashboard;
