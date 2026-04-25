import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import COLORS from '../../constants/colors';
import { RARITY_COLORS } from '../../constants/rarity';
import { formatTenge } from '../../utils/random';

export default function ItemCard({ item, onPress, selected, small }) {
  const color = RARITY_COLORS[item.rarity] || COLORS.gray;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.card,
        small && styles.small,
        { borderColor: color, shadowColor: color },
        selected && { borderWidth: 3, backgroundColor: color + '22' },
      ]}
    >
      <Text style={[styles.icon, small && { fontSize: 32 }]}>{item.image}</Text>
      <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
      <Text style={[styles.rarity, { color }]}>{item.rarity}</Text>
      <Text style={styles.price}>{formatTenge(item.price)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    backgroundColor: COLORS.cardBg,
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 10,
    margin: '1.5%',
    alignItems: 'center',
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  small: { width: '31%' },
  icon: { fontSize: 48, marginBottom: 4 },
  name: { color: COLORS.white, fontSize: 12, fontWeight: '700', textAlign: 'center', minHeight: 32 },
  rarity: { fontSize: 10, fontWeight: '900', letterSpacing: 1, marginTop: 2 },
  price: { color: COLORS.gold, fontWeight: '800', marginTop: 2 },
});
