import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageKeys = {
  USERS: 'users_db',
  CURRENT_USER: 'current_user',
  PROFILE: (userId) => `profile_${userId}`,
};

export async function getItem(key) {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function setItem(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function removeItem(key) {
  await AsyncStorage.removeItem(key);
}
