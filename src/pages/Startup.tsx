import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { RootStackParamList, RouteName } from '@navigation/RootStackParamList';
import { initiateStore } from '@store/initiate';

const Startup = () => {
  const { reset } = useNavigation<NavigationProp<RootStackParamList>>();
  const init = async () => {
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
    initiateStore();
    await sleep(100);

    reset({
      index: 0,
      routes: [{ name: RouteName.DASHBOARD }],
    });
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Startup Screen</Text>
    </View>
  );
};

export default Startup;
