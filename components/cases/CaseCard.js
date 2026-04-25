import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import COLORS from '../../constants/colors';
import { formatTenge } from '../../utils/random';

export default function CaseCard({ caseDef, onPress }) {
  return (
    <TouchableOpacity style={[styles.card, { borderColor: caseDef.color, shadowColor: caseDef.color }]} onPress={onPress} activeOpacity={0.85}>
      <View style={[styles.glow, { backgroundColor: caseDef.color + '22' }]} />
      <Text style={styles.icon}>{caseDef.image}</Text>
      <Text style={styles.name} numberOfLines={2}>{caseDef.name}</Text>
      <View style={[styles.priceTag, { backgroundColor: caseDef.color }]}>
        <Text style={styles.price}>{formatTenge(caseDef.price)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    backgroundColor: COLORS.cardBg,
    borderWidth: 2,
    borderRadius: 14,
    padding: 14,
    margin: '1.5%',
    alignItems: 'center',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
    overflow: 'hidden',
  },
  glow: { position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: 50 },
  icon: { fontSize: 64, marginBottom: 8 },
  name: { color: COLORS.white, fontWeight: '800', textAlign: 'center', minHeight: 36 },
  priceTag: { marginTop: 8, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  price: { color: COLORS.black, fontWeight: '900' },
});
