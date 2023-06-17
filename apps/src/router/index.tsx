import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import Home from '../screen/Home/Home';
import ChatRoom from '../screen/ChatRoom/ChatRoom';

export type RootStackParamList = {
  Home: undefined;
  ChatRoom?: {
    roomName?: string;
    id: number;
  };
};

export type ScreenNavigationType =
  NativeStackScreenProps<RootStackParamList>['navigation'];

function Router() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
    </Stack.Navigator>
  );
}

export default Router;
