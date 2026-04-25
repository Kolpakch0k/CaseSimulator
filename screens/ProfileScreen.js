import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import COLORS from '../constants/colors';
import GlowButton from '../components/common/GlowButton';
import BalanceDisplay from '../components/common/BalanceDisplay';
import { useAuthStore } from '../store/authStore';
import { useProfileStore } from '../store/profileStore';
import { RARITY_COLORS } from '../constants/rarity';
import { formatTenge } from '../utils/random';

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const { stats, history, inventory, loading } = useProfileStore();

  if (loading && !stats) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.darkBg }}>
        <ActivityIndicator size="large" color={COLORS.orange} />
      </View>
    );
  }
  const safeStats = stats || { totalOpened: 0, totalSpent: 0, totalEarned: 0, bestItem: null };
  const safeHistory = history || [];
  const safeInventory = inventory || [];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.darkBg }} contentContainerStyle={{ padding: 14 }}>
      <View style={styles.headerBox}>
        <Text style={styles.avatar}>🥷</Text>

        <Text style={styles.username}>{user?.username || user?.displayName || 'Shinobi'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <BalanceDisplay />
      </View>

      <View style={styles.statsRow}>
        <Stat label="Открыто" value={safeStats.totalOpened} />
        <Stat label="Потрачено" value={formatTenge(safeStats.totalSpent)} />
        <Stat label="Заработано" value={formatTenge(safeStats.totalEarned)} />
      </View>

      <View style={styles.statsRow}>
        <Stat label="Инвентарь" value={safeInventory.length} />
        <Stat 
          label="Лучший дроп" 
          value={safeStats.bestItem ? safeStats.bestItem.name : '—'} 
          small 
        />
      </View>

      <Text style={styles.sectionTitle}>📜 История открытий</Text>
      {safeHistory.length === 0 ? (
        <Text style={styles.empty}>Пока пусто</Text>
      ) : (
        safeHistory.slice(0, 30).map((h, idx) => (
          <View key={idx} style={styles.historyRow}>
            <View style={[styles.dot, { backgroundColor: RARITY_COLORS[h.itemRarity] || COLORS.gray }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.hItem}>{h.itemName}</Text>
              <Text style={styles.hMeta}>{h.caseName} · {h.action === 'sell' ? 'продано' : 'оставлено'}</Text>
            </View>
            <Text style={styles.hPrice}>{formatTenge(h.itemPrice)}</Text>
          </View>
        ))
      )}

      <View style={{ marginTop: 24 }}>
        <GlowButton title="Выйти" color={COLORS.red} onPress={logout} />
      </View>
    </ScrollView>
  );
}

function Stat({ label, value, small }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, small && { fontSize: 12 }]} numberOfLines={2}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBox: { alignItems: 'center', padding: 20, backgroundColor: COLORS.cardBg, borderRadius: 16, borderWidth: 1, borderColor: COLORS.orange },
  avatar: { fontSize: 72 },
  username: { color: COLORS.white, fontSize: 22, fontWeight: '900', marginTop: 4 },
  email: { color: COLORS.gray, marginBottom: 10 },
  statsRow: { flexDirection: 'row', marginTop: 12 },
  stat: { flex: 1, backgroundColor: COLORS.cardBg, margin: 4, padding: 12, borderRadius: 10, borderWidth: 1, borderColor: COLORS.purple, alignItems: 'center' },
  statLabel: { color: COLORS.gray, fontSize: 11, letterSpacing: 1 },
  statValue: { color: COLORS.gold, fontWeight: '900', fontSize: 16, marginTop: 4, textAlign: 'center' },
  sectionTitle: { color: COLORS.white, fontSize: 18, fontWeight: '900', marginTop: 20, marginBottom: 8 },
  empty: { color: COLORS.gray, textAlign: 'center', padding: 20 },
  historyRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.cardBg, padding: 10, borderRadius: 10, marginBottom: 6 },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 10 },
  hItem: { color: COLORS.white, fontWeight: '700' },
  hMeta: { color: COLORS.gray, fontSize: 11 },
  hPrice: { color: COLORS.gold, fontWeight: '900' },
});