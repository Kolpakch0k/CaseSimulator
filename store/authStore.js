// store/authStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebase/config';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';

if (!auth) throw new Error('❌ CRITICAL: auth is undefined! Check firebase/config.js path & exports.');

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,
      unsubscribeAuth: null,

      initAuth: () => {
        return new Promise((resolve) => {
          const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
              set({ user: firebaseUser, error: null });
            } else {
              set({ user: null });
            }
            resolve();
          });
          set({ unsubscribeAuth: unsubscribe });
        });
      },

      login: async (email, password) => {
        try {
          set({ loading: true, error: null });
          const result = await signInWithEmailAndPassword(auth, email, password);
          set({ loading: false });
          return result.user;
        } catch (error) {
          console.error('Login error:', error);
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      register: async (email, password, displayName = '') => {
        try {
          set({ loading: true, error: null });
          const result = await createUserWithEmailAndPassword(auth, email, password);
          
          if (displayName && result.user) {
            await updateProfile(result.user, { displayName });
          }
          
          set({ loading: false });
          return result.user;
        } catch (error) {
          console.error('Register error:', error);
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          await signOut(auth);
          set({ user: null, error: null });
        } catch (error) {
          console.error('Logout error:', error);
          set({ error: error.message });
        }
      },
      
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        error: state.error,
      }),
    }
  )
);