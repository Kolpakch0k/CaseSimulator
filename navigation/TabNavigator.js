import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CasesScreen from '../screens/CasesScreen';
import InventoryScreen from '../screens/InventoryScreen';
import UpgradeScreen from '../screens/UpgradeScreen';
import ContractsScreen from '../screens/ContractsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import COLORS from '../constants/colors';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: COLORS.black },
        headerTitleStyle: { color: COLORS.orange, fontWeight: '900' },
        tabBarStyle: {
          backgroundColor: COLORS.black,
          borderTopColor: COLORS.purple,
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: COLORS.orange,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Cases: 'cube',
            Inventory: 'briefcase',
            Upgrade: 'arrow-up-circle',
            Contracts: 'git-merge',
            Profile: 'person-circle',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Cases" component={CasesScreen} options={{ title: 'Кейсы' }} />
      <Tab.Screen name="Inventory" component={InventoryScreen} options={{ title: 'Инвентарь' }} />
      <Tab.Screen name="Upgrade" component={UpgradeScreen} options={{ title: 'Апгрейд' }} />
      <Tab.Screen name="Contracts" component={ContractsScreen} options={{ title: 'Контракт' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Профиль' }} />
    </Tab.Navigator>
  );
}
