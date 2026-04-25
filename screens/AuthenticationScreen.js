import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
import GlowButton from '../components/common/GlowButton';
import { useAuthStore } from '../store/authStore';

export default function AuthenticationScreen() {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuthStore();

  const submit = async () => {
    if (!email || !password || (mode === 'register' && !username)) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }
    setLoading(true);
    try {
      if (mode === 'login') await login(email.trim(), password);
      else await register(email.trim(), username.trim(), password);
    } catch (e) {
      Alert.alert('Ошибка', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={[COLORS.black, '#1a0d2e', COLORS.black]} style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.emoji}>🍥</Text>
          <Text style={styles.title}>CS2 <Text style={{ color: COLORS.orange }}>NARUTO</Text></Text>
          <Text style={styles.subtitle}>Симулятор кейсов</Text>

          {mode === 'register' && (
            <TextInput
              placeholder="Имя шиноби"
              placeholderTextColor={COLORS.gray}
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          )}
          <TextInput
            placeholder="Email"
            placeholderTextColor={COLORS.gray}
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Пароль"
            placeholderTextColor={COLORS.gray}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <GlowButton
            title={mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
            onPress={submit}
            loading={loading}
            color={COLORS.orange}
          />
          <GlowButton
            title={mode === 'login' ? 'Создать аккаунт' : 'У меня есть аккаунт'}
            onPress={() => setMode(mode === 'login' ? 'register' : 'login')}
            color={COLORS.purple}
          />

          <Text style={styles.hint}>💎 Новичкам — 5 000 ₸ стартовый баланс</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, flexGrow: 1, justifyContent: 'center' },
  emoji: { fontSize: 72, textAlign: 'center', marginBottom: 8 },
  title: { color: COLORS.white, fontSize: 36, fontWeight: '900', textAlign: 'center', letterSpacing: 2 },
  subtitle: { color: COLORS.purple, fontSize: 16, textAlign: 'center', marginBottom: 32, letterSpacing: 3 },
  input: {
    backgroundColor: COLORS.cardBg,
    borderColor: COLORS.purple,
    borderWidth: 1.5,
    color: COLORS.white,
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  hint: { color: COLORS.gold, textAlign: 'center', marginTop: 20, fontStyle: 'italic' },
});
