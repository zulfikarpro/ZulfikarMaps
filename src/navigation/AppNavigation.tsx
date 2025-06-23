import { View, Text } from 'react-native';
import React from 'react';
import { RootStackParamList, RouteName } from './RootStackParamList';
import { screenOptions } from './screenOptions';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Startup from '@pages/Startup';
import Dashboard from '@pages/Dashboard';
const Stack = createNativeStackNavigator<RootStackParamList>();
export default function AppNavigation() {
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName={RouteName.STARTUP}
    >
      <Stack.Screen name={RouteName.STARTUP} getComponent={() => Startup} />
      <Stack.Screen name={RouteName.DASHBOARD} getComponent={() => Dashboard} />
    </Stack.Navigator>
  );
}
