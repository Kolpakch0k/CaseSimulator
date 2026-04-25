import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import COLORS from '../constants/colors';
import { CASES } from '../constants/cases';
import CaseCard from '../components/cases/CaseCard';
import BalanceDisplay from '../components/common/BalanceDisplay';

const FILTERS = ['Все', 'Skin', 'Knife'];

export default function CasesScreen({ navigation }) {
  const [filter, setFilter] = useState('Все');

  const list = useMemo(() => {
    if (filter === 'Все') return CASES;
    return CASES.filter((c) => c.type === filter);
  }, [filter]);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.header}>🍥 Выбери кейс</Text>
        <BalanceDisplay />
      </View>

      <View style={styles.filters}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {list.map((c) => (
          <CaseCard
            key={c.id}
            caseDef={c}
            onPress={() => navigation.navigate('CaseOpen', { caseId: c.id, caseName: c.name })}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.darkBg },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12 },
  header: { color: COLORS.white, fontSize: 20, fontWeight: '900' },
  filters: { flexDirection: 'row', paddingHorizontal: 12, marginBottom: 8 },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.purple,
    marginRight: 8,
  },
  filterBtnActive: { backgroundColor: COLORS.orange, borderColor: COLORS.orange },
  filterText: { color: COLORS.white, fontWeight: '700' },
  filterTextActive: { color: COLORS.black },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 6, paddingBottom: 30 },
});
