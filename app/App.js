import * as React from 'react';

import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from './views/LoginScreen'
import HomeScreenNav from './views/HomeScreen'
import SubredditScreen from './views/SubredditScreen'
import ProfileSettingsScreen from './views/ProfileSettingsScreen'

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{backgroundColor: '#130f40'}} />
      <Stack.Screen name="Home" Title="TekSocial" component={HomeScreenNav} options={{headerLeft: null, headerTitle: "TekSocial", backgroundColor: '#130f40'}}  />
      <Stack.Screen name="Subreddit" Title="Subreddit" component={SubredditScreen}/>
      <Stack.Screen name="Profile Settings" Title="Profile Settings" component={ProfileSettingsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" hidden={false} backgroundColor="#130f40" translucent={true}/>
      <MyStack />
    </NavigationContainer>
  );
}