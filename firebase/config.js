import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD3XACYHnMZXmrqy41UBCTjazNTgqVrwDY",
  authDomain: "case-e7589.firebaseapp.com",
  projectId: "case-e7589",
  storageBucket: "case-e7589.firebasestorage.app",
  messagingSenderId: "743810491851",
  appId: "1:743810491851:web:760b7db45bbc7bb29e824e"
};

console.log('🔥 [FIREBASE] Инициализация...');
const app = initializeApp(firebaseConfig);

// ✅ Используем getAuth вместо initializeAuth для стабильности
export const auth = getAuth(app);

console.log('✅ [FIREBASE] Auth готов:', auth.app ? 'ДА' : 'НЕТ');
export default app;