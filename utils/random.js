import { ITEMS } from '../constants/items';

// Взвешенный случайный выбор редкости
export function rollRarity(distribution) {
  const r = Math.random();
  let acc = 0;
  const entries = Object.entries(distribution);
  for (const [rarity, prob] of entries) {
    acc += prob;
    if (r <= acc) return rarity;
  }
  return entries[0][0];
}

// Случайный предмет из пула указанной редкости (с учётом типа кейса при желании)
export function rollItem(caseDef) {
  const rarity = rollRarity(caseDef.rarityDistribution);
  let pool = ITEMS.filter((i) => i.rarity === rarity);
  if (pool.length === 0) {
    // fallback на ближайшую редкость
    pool = ITEMS.filter((i) => i.rarity === 'Consumer');
  }
  const item = pool[Math.floor(Math.random() * pool.length)];
  return item;
}

export function formatTenge(amount) {
  return `${Math.round(amount).toLocaleString('ru-RU')} ₸`;
}

export function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
