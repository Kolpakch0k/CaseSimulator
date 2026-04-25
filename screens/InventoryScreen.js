import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import COLORS from '../constants/colors';
import ItemCard from '../components/inventory/ItemCard';
import BalanceDisplay from '../components/common/BalanceDisplay';
import GlowButton from '../components/common/GlowButton';
import { useProfileStore } from '../store/profileStore';
import { formatTenge } from '../utils/random';

export default function InventoryScreen() {
  const { inventory, sellItem } = useProfileStore();
  const [selected, setSelected] = useState(null);

  const handlePress = (item) => {
    setSelected(item.uuid === selected?.uuid ? null : item);
  };

  const doSell = () => {
    if (!selected) return;
    const price = sellItem(selected.uuid);
    Alert.alert('Продано', `+${formatTenge(price)}`);
    setSelected(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.header}>🎒 Инвентарь ({inventory.length})</Text>
        <BalanceDisplay />
      </View>

      {selected && (
        <View style={styles.actions}>
          <Text style={styles.selectedText}>{selected.name} — {formatTenge(selected.price)}</Text>
          <GlowButton 
            title={`Продать за ${formatTenge(selected.price)}`} 
            color={COLORS.red} 
            onPress={doSell} 
          />
        </View>
      )}

      {inventory.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyText}>Инвентарь пуст</Text>
          <Text style={styles.emptyHint}>Открывай кейсы чтобы получить скины!</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.grid}>
          {inventory.map((item) => (
            <ItemCard
              key={item.uuid}  // ✅ Уникальный key
              item={item}
              onPress={() => handlePress(item)}
              selected={selected?.uuid === item.uuid}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.darkBg },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12 },
  header: { color: COLORS.white, fontSize: 18, fontWeight: '900' },
  actions: { padding: 12, backgroundColor: COLORS.cardBg, marginHorizontal: 10, borderRadius: 10, marginBottom: 6 },
  selectedText: { color: COLORS.white, textAlign: 'center', marginBottom: 6, fontWeight: '700' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 6, paddingBottom: 30 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyIcon: { fontSize: 80 },
  emptyText: { color: COLORS.white, fontSize: 20, fontWeight: '900', marginTop: 12 },
  emptyHint: { color: COLORS.gray, textAlign: 'center', marginTop: 8 },
});