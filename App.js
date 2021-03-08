import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppScreen from './screens/AppScreen';
import { StatusBar, Text } from 'react-native';

const App = () => (
  <SafeAreaProvider>
    <StatusBar barStyle={'light-content'} backgroundColor={'black'} ></StatusBar>
    <Text testID="hello">Hello World</Text>
    <AppScreen />
  </SafeAreaProvider>
);

export default App;
