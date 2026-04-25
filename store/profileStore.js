// store/profileStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { uid } from '../utils/random';

const DEFAULT_PROFILE = {
  userId: null,
  balance: 5000,
  inventory: [],
  history: [],
  stats: {
    totalOpened: 0,
    totalSpent: 0,
    totalEarned: 0,
    bestItem: null,
  },
};

export const useProfileStore = create(
  persist(
    (set, get) => ({
      ...DEFAULT_PROFILE,

      reset: () => set({ ...DEFAULT_PROFILE }),

      initProfile: async (userId) => {
        const profile = { ...DEFAULT_PROFILE, userId };
        set(profile);
      },

      loadProfile: async (userId) => {
        if (userId) {
          set({ userId });
        }
      },

      hydrate: async () => {
        console.log('👤 Profile hydrated');
      },

      persist: async () => {
        console.log('💾 Profile saved');
      },

      addBalance: (amount) => {
        set((s) => ({ balance: s.balance + amount }));
      },

      spendBalance: (amount) => {
        const { balance } = get();
        if (balance < amount) throw new Error('Недостаточно средств');
        set((s) => ({
          balance: s.balance - amount,
          stats: { ...s.stats, totalSpent: s.stats.totalSpent + amount },
        }));
      },

      // ✅ ДОБАВЬТЕ ЭТОТ МЕТОД
      addItemToInventory: (item) => {
        const entry = { uuid: uid(), ...item };
        set((s) => ({
          inventory: [entry, ...s.inventory],
          stats: {
            ...s.stats,
            bestItem:
              !s.stats.bestItem || item.price > s.stats.bestItem.price
                ? item
                : s.stats.bestItem,
          },
        }));
        return entry;
      },

      // ✅ ДОБАВЬТЕ ЭТОТ МЕТОД (главная проблема!)
      removeInventoryItems: (uuids) => {
        set((s) => ({
          inventory: s.inventory.filter((i) => !uuids.includes(i.uuid)),
        }));
      },

      sellItem: (uuid) => {
        const { inventory } = get();
        const item = inventory.find((i) => i.uuid === uuid);
        if (!item) return 0;
        
        set((s) => ({
          inventory: s.inventory.filter((i) => i.uuid !== uuid),
          balance: s.balance + item.price,
          stats: { ...s.stats, totalEarned: s.stats.totalEarned + item.price },
        }));
        
        return item.price;
      },

      addHistory: (entry) => {
        set((s) => ({
          history: [
            { ...entry, date: new Date().toISOString() },
            ...s.history,
          ].slice(0, 200),
          stats: { ...s.stats, totalOpened: s.stats.totalOpened + 1 },
        }));
      },
    }),
    {
      name: 'profile-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        userId: state.userId,
        balance: state.balance,
        inventory: state.inventory,
        history: state.history,
        stats: state.stats,
      }),
    }
  )
);