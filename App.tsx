import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {store} from './app/Store';
import StackNavigator from './app/navigation/StackNavigator';
import Login from './app/screens/Login';
import SignUp from './app/screens/SignUp';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}> 
        <NavigationContainer>
          <StackNavigator/>
        </NavigationContainer>
      </Provider> 
    </SafeAreaProvider>
  );
}
