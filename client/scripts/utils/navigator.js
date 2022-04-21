import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../views/Home';
import Detail from '../views/Detail';
import Post from '../views/Post';
import Tags from '../views/Tags';



const Stack = createStackNavigator();

const StackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}  />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Post" component={Post} />
      <Stack.Screen name="Tags" component={Tags} />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;