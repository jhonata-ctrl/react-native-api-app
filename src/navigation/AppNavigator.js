import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import UserScreen from '../screens/UserScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Posts' }}
        />
        <Stack.Screen 
          name="PostDetail" 
          component={PostDetailScreen} 
          options={{ title: 'Detalhes do Post' }}
        />
        <Stack.Screen 
          name="User" 
          component={UserScreen} 
          options={{ title: 'Perfil do Usuário' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}