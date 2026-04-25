import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import CaseOpenScreen from '../screens/CaseOpenScreen';
import COLORS from '../constants/colors';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.black },
        headerTintColor: COLORS.orange,
        headerTitleStyle: { fontWeight: '900' },
      }}
    >
      <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="CaseOpen"
        component={CaseOpenScreen}
        options={({ route }) => ({ title: route.params?.caseName || 'Открытие' })}
      />
    </Stack.Navigator>
  );
}
