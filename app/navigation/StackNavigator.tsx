import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipeResults from '../screens/RecipeDetails';
import SearchResults from '../screens/SearchResults'
import { RootStackParamList } from '../types';
import AppNavigator from './AppNavigator';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import { useSelector } from 'react-redux';
import Welcome from '../screens/Welcome';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
  console.log("STATUS: ", isLoggedIn)
  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? "Main" : "Welcome"}>
      <Stack.Screen name='Main' component={AppNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="SearchResults" component={SearchResults} options={{ headerShown: false }} />
      <Stack.Screen name="RecipeDetail" component={RecipeResults} options={{ headerShown: false }} />
      <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
