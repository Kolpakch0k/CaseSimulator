import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions, Alert, ScrollView } from 'react-native';
import COLORS from '../constants/colors';
import { getCaseById } from '../constants/cases';
import { ITEMS } from '../constants/items';
import { RARITY_COLORS } from '../constants/rarity';
import { rollItem, formatTenge } from '../utils/random';
import { useProfileStore } from '../store/profileStore';
import GlowButton from '../components/common/GlowButton';

const ITEM_WIDTH = 120;
const { width: SCREEN_W } = Dimensions.get('window');

export default function CaseOpenScreen({ route, navigation }) {
  const { caseId } = route.params;
  const caseDef = getCaseById(caseId);

  const { balance, spendBalance, addBalance, addItemToInventory, addHistory } = useProfileStore();

  const [spinning, setSpinning] = useState(false);
  const [wonItem, setWonItem] = useState(null);
  const [reelItems, setReelItems] = useState([]);
  const translateX = useRef(new Animated.Value(0)).current;

  const buildReel = (winning) => {
    const reel = [];
    for (let i = 0; i < 60; i++) {
      reel.push(ITEMS[Math.floor(Math.random() * ITEMS.length)]);
    }
    reel[55] = winning; // позиция выигрыша
    return reel;
  };

  const openCase = async () => {
    if (spinning) return;
    if (balance < caseDef.price) {
      Alert.alert('Недостаточно средств', 'Пополни баланс, продавая скины!');
      return;
    }
    try {
      spendBalance(caseDef.price);
    } catch (e) {
      Alert.alert('Ошибка', e.message);
      return;
    }

    const winning = rollItem(caseDef);
    const reel = buildReel(winning);
    setReelItems(reel);
    setWonItem(null);
    setSpinning(true);
    translateX.setValue(0);

    const target = -(55 * ITEM_WIDTH) + SCREEN_W / 2 - ITEM_WIDTH / 2;

    Animated.timing(translateX, {
      toValue: target,
      duration: 4500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setSpinning(false);
      setWonItem(winning);
    });
  };

  const sell = () => {
    if (!wonItem) return;
    addBalance(wonItem.price);
    addHistory({
      caseId: caseDef.id,
      caseName: caseDef.name,
      itemId: wonItem.id,
      itemName: wonItem.name,
      itemRarity: wonItem.rarity,
      itemPrice: wonItem.price,
      action: 'sell',
    });
    Alert.alert('Продано', `+${formatTenge(wonItem.price)}`);
    setWonItem(null);
  };

  const keep = () => {
    if (!wonItem) return;
    addItemToInventory(wonItem);
    addHistory({
      caseId: caseDef.id,
      caseName: caseDef.name,
      itemId: wonItem.id,
      itemName: wonItem.name,
      itemRarity: wonItem.rarity,
      itemPrice: wonItem.price,
      action: 'keep',
    });
    Alert.alert('В инвентаре!', wonItem.name);
    setWonItem(null);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.darkBg }} contentContainerStyle={styles.container}>
      <Text style={styles.caseIcon}>{caseDef.image}</Text>
      <Text style={styles.caseName}>{caseDef.name}</Text>
      <Text style={styles.casePrice}>{formatTenge(caseDef.price)}</Text>

      <View style={styles.reelContainer}>
        <View style={styles.pointer} />
        <Animated.View style={[styles.reel, { transform: [{ translateX }] }]}>
          {reelItems.map((it, idx) => (
            <View key={idx} style={[styles.reelItem, { borderColor: RARITY_COLORS[it.rarity] }]}>
              <Text style={{ fontSize: 36 }}>{it.image}</Text>
              <Text style={styles.reelName} numberOfLines={1}>{it.name}</Text>
            </View>
          ))}
        </Animated.View>
      </View>

      {wonItem && (
        <View style={[styles.wonBox, { borderColor: RARITY_COLORS[wonItem.rarity], shadowColor: RARITY_COLORS[wonItem.rarity] }]}>
          <Text style={{ fontSize: 64 }}>{wonItem.image}</Text>
          <Text style={styles.wonName}>{wonItem.name}</Text>
          <Text style={[styles.wonRarity, { color: RARITY_COLORS[wonItem.rarity] }]}>{wonItem.rarity}</Text>
          <Text style={styles.wonPrice}>{formatTenge(wonItem.price)}</Text>

          <View style={{ flexDirection: 'row', gap: 8, marginTop: 10 }}>
            <GlowButton title="Продать" color={COLORS.red} onPress={sell} style={{ flex: 1 }} />
            <GlowButton title="Забрать" color={COLORS.neonGreen} onPress={keep} style={{ flex: 1 }} />
          </View>
        </View>
      )}

      {!wonItem && (
        <GlowButton
          title={spinning ? 'Открываем...' : `ОТКРЫТЬ за ${formatTenge(caseDef.price)}`}
          onPress={openCase}
          disabled={spinning}
          color={COLORS.orange}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: 'center' },
  caseIcon: { fontSize: 80, marginTop: 10 },
  caseName: { color: COLORS.white, fontSize: 24, fontWeight: '900' },
  casePrice: { color: COLORS.gold, fontSize: 18, fontWeight: '800', marginBottom: 16 },
  reelContainer: {
    width: '100%',
    height: 140,
    marginVertical: 20,
    overflow: 'hidden',
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.purple,
    justifyContent: 'center',
  },
  pointer: {
    position: 'absolute',
    top: 0, bottom: 0,
    left: '50%',
    width: 3,
    backgroundColor: COLORS.orange,
    zIndex: 2,
    shadowColor: COLORS.orange,
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  reel: { flexDirection: 'row', alignItems: 'center' },
  reelItem: {
    width: ITEM_WIDTH - 10,
    height: 110,
    marginHorizontal: 5,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  reelName: { color: COLORS.white, fontSize: 10, textAlign: 'center', marginTop: 4 },
  wonBox: {
    backgroundColor: COLORS.cardBg,
    padding: 20,
    borderRadius: 16,
    borderWidth: 3,
    alignItems: 'center',
    marginVertical: 16,
    width: '100%',
    shadowOpacity: 0.9,
    shadowRadius: 20,
  },
  wonName: { color: COLORS.white, fontSize: 20, fontWeight: '900', marginTop: 8, textAlign: 'center' },
  wonRarity: { fontSize: 14, fontWeight: '900', letterSpacing: 2, marginTop: 4 },
  wonPrice: { color: COLORS.gold, fontSize: 22, fontWeight: '900', marginTop: 6 },
});
