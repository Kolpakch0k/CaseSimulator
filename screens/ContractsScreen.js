import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import COLORS from '../constants/colors';
import ItemCard from '../components/inventory/ItemCard';
import GlowButton from '../components/common/GlowButton';
import BalanceDisplay from '../components/common/BalanceDisplay';
import { useProfileStore } from '../store/profileStore';
import { ITEMS } from '../constants/items';
import { formatTenge } from '../utils/random';

export default function ContractsScreen() {
  const { inventory, removeInventoryItems, addItemToInventory } = useProfileStore();
  const [selectedUuids, setSelectedUuids] = useState([]);

  const selectedItems = inventory.filter(item => selectedUuids.includes(item.uuid));
  const totalValue = selectedItems.reduce((sum, item) => sum + (item.price || 0), 0);

  const toggle = (uuid) => {
    setSelectedUuids((prev) =>
      prev.includes(uuid) 
        ? prev.filter((u) => u !== uuid) 
        : prev.length < 10 
          ? [...prev, uuid] 
          : prev
    );
  };

  const execute = () => {
    if (selectedUuids.length < 3) {
      Alert.alert('Мало предметов', 'Нужно от 3 до 10 предметов');
      return;
    }

    const target = totalValue * (0.6 + Math.random() * 0.5);
    const candidates = ITEMS.filter((i) => i.price >= target * 0.8 && i.price <= target * 1.3);
    const pool = candidates.length > 0 ? candidates : ITEMS;
    const newItem = pool[Math.floor(Math.random() * pool.length)];

    removeInventoryItems(selectedUuids);
    addItemToInventory(newItem);
    setSelectedUuids([]);
    Alert.alert('🔗 Контракт завершён', `Получен: ${newItem.name} (${formatTenge(newItem.price)})`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.header}>🔗 Контракт ({selectedUuids.length}/10)</Text>
        <BalanceDisplay />
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.info}>Выбрано: {selectedUuids.length}</Text>
        <Text style={styles.info}>Сумма: {formatTenge(totalValue)}</Text>
        <GlowButton
          title="Заключить контракт"
          color={COLORS.red}
          onPress={execute}
          disabled={selectedUuids.length < 3}
        />
      </View>

      {inventory.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Нужны предметы в инвентаре</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.grid}>
          {inventory.map((item) => (
            <ItemCard
              key={item.uuid}  // ✅ Уникальный key
              item={item}
              onPress={() => toggle(item.uuid)}
              selected={selectedUuids.includes(item.uuid)}
              small
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
  infoBox: { backgroundColor: COLORS.cardBg, padding: 12, margin: 10, borderRadius: 12, borderWidth: 1, borderColor: COLORS.red },
  info: { color: COLORS.white, marginBottom: 4, fontWeight: '700' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 6, paddingBottom: 30 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: COLORS.gray, fontSize: 16 },
});