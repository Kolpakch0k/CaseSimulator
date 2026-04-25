// app.js
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import AuthNavigator from './navigation/AuthNavigator';
import { useAuthStore } from './store/authStore';
import { useProfileStore } from './store/profileStore';
import COLORS from './constants/colors';
import './firebase/config';

export default function App() {
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((s) => s.user);
  
  // ✅ ИСПРАВЛЕНО: используем initAuth, как объявлено в authStore.js
  const initAuth = useAuthStore((s) => s.initAuth);
  const hydrateProfile = useProfileStore((s) => s.hydrate);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        console.log('🚀 App initializing...');
        await initAuth(); // ✅ Вызываем правильный метод
        await hydrateProfile();
        console.log('✅ App initialized. User:', useAuthStore.getState().user?.uid || 'guest');
      } catch (error) {
        console.error('❌ App initialization error:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    
    return () => {
      isMounted = false;
      useAuthStore.getState().unsubscribeAuth?.();
    };
  }, [initAuth, hydrateProfile]);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.black, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.orange} />
      </View>
    );
  }

  return (
    <NavigationContainer theme={{ dark: true, colors: { primary: COLORS.orange, background: COLORS.black, card: COLORS.black, text: COLORS.white, border: COLORS.purple, notification: COLORS.red } }}>
      <StatusBar style="light" />
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}