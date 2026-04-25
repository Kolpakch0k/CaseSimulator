import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import COLORS from '../constants/colors';
import ItemCard from '../components/inventory/ItemCard';
import GlowButton from '../components/common/GlowButton';
import BalanceDisplay from '../components/common/BalanceDisplay';
import { useProfileStore } from '../store/profileStore';
import { ITEMS } from '../constants/items';
import { formatTenge } from '../utils/random';

const CHANCES = [20, 40, 60, 80];

export default function UpgradeScreen() {
  const { inventory, removeInventoryItems, addItemToInventory } = useProfileStore();
  const [selected, setSelected] = useState(null);
  const [chance, setChance] = useState(40);

  const multiplier = (100 / chance) * 0.85;
  const targetPrice = selected ? Math.floor(selected.price * multiplier) : 0;

  const upgrade = () => {
    if (!selected) {
      Alert.alert('Ошибка', 'Выберите предмет');
      return;
    }

    const roll = Math.random() * 100;
    const success = roll < chance;

    removeInventoryItems([selected.uuid]);

    if (success) {
      const candidates = ITEMS.filter((i) => i.price >= targetPrice * 0.85 && i.price <= targetPrice * 1.25);
      const pool = candidates.length > 0 ? candidates : ITEMS.filter((i) => i.price >= targetPrice);
      const newItem = pool[Math.floor(Math.random() * pool.length)] || ITEMS[ITEMS.length - 1];
      
      addItemToInventory(newItem);
      Alert.alert('🎉 Успех!', `Получен: ${newItem.name}`);
    } else {
      Alert.alert('💥 Неудача', 'Предмет уничтожен');
    }
    
    setSelected(null);
  };

  const handleItemPress = (item) => {
    if (selected?.uuid === item.uuid) {
      setSelected(null);
    } else {
      setSelected(item);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.header}>⬆️ Апгрейд</Text>
        <BalanceDisplay />
      </View>

      {selected && (
        <View style={styles.upgradeBox}>
          <Text style={styles.upgradeTitle}>{selected.name}</Text>
          <Text style={styles.upgradePrice}>
            {formatTenge(selected.price)} → ~{formatTenge(targetPrice)}
          </Text>
          
          <View style={styles.chances}>
            {CHANCES.map((c) => (
              <TouchableOpacity
                key={c}  // ✅ Уникальный key
                onPress={() => setChance(c)}
                style={[styles.chanceBtn, chance === c && styles.chanceBtnActive]}
              >
                <Text style={[styles.chanceText, chance === c && styles.chanceTextActive]}>
                  {c}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <Text style={styles.currentChance}>Шанс: {chance}%</Text>
          
          <GlowButton title="АПНУТЬ" color={COLORS.purple} onPress={upgrade} />
        </View>
      )}

      {!selected && (
        <View style={styles.hintBox}>
          <Text style={styles.hintText}>👆 Нажмите на предмет чтобы выбрать</Text>
        </View>
      )}

      {(!inventory || inventory.length === 0) ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Нужны предметы в инвентаре</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.grid}>
          {inventory.map((item) => (
            <ItemCard
              key={item.uuid}  // ✅ Уникальный key
              item={item}
              onPress={() => handleItemPress(item)}
              selected={selected?.uuid === item.uuid}
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
  upgradeBox: { 
    backgroundColor: COLORS.cardBg, 
    padding: 16, 
    margin: 10, 
    borderRadius: 12, 
    borderWidth: 2, 
    borderColor: COLORS.purple 
  },
  upgradeTitle: { 
    color: COLORS.white, 
    fontSize: 16, 
    fontWeight: '800', 
    textAlign: 'center',
    marginBottom: 4
  },
  upgradePrice: {
    color: COLORS.gold,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12
  },
  chances: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 8
  },
  chanceBtn: { 
    flex: 1,
    paddingVertical: 10, 
    borderRadius: 8, 
    borderWidth: 2, 
    borderColor: COLORS.orange,
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  chanceBtnActive: {
    backgroundColor: COLORS.orange,
  },
  chanceText: { 
    color: COLORS.white, 
    fontWeight: '900',
    fontSize: 14
  },
  chanceTextActive: {
    color: COLORS.black,
  },
  currentChance: {
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 13
  },
  hintBox: {
    padding: 12,
    alignItems: 'center'
  },
  hintText: {
    color: COLORS.gray,
    fontSize: 14
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 6, paddingBottom: 30 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: COLORS.gray, fontSize: 16 },
});