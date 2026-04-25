import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';
import { formatTenge } from '../../utils/random';
import { useProfileStore } from '../../store/profileStore';

export default function BalanceDisplay() {
  const balance = useProfileStore((s) => s.balance);
  return (
    <View style={styles.box}>
      <Text style={styles.label}>Баланс</Text>
      <Text style={styles.amount}>{formatTenge(balance)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1.5,
    borderColor: COLORS.orange,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  label: { color: COLORS.gray, fontSize: 11, letterSpacing: 1 },
  amount: { color: COLORS.gold, fontSize: 18, fontWeight: '900' },
});
