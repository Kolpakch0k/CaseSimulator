// Пул предметов (скины / ножи / перчатки / стикеры / брелоки)
// image — emoji-заглушка, легко заменить на require('../assets/images/xxx.png')

export const ITEMS = [
  // Consumer
  { id: 'p250_sand',       name: 'P250 | Песок Суны',         rarity: 'Consumer',   price: 150,  type: 'Skin',    image: '🔫' },
  { id: 'mp9_leaf',        name: 'MP9 | Лист Конохи',         rarity: 'Consumer',   price: 200,  type: 'Skin',    image: '🔫' },
  { id: 'nova_stone',      name: 'Nova | Камень',             rarity: 'Consumer',   price: 130,  type: 'Skin',    image: '🔫' },
  { id: 'glock_genin',     name: 'Glock-18 | Генин',          rarity: 'Consumer',   price: 180,  type: 'Skin',    image: '🔫' },
  { id: 'sticker_leaf',    name: 'Стикер | Коноха',           rarity: 'Consumer',   price: 120,  type: 'Sticker', image: '🍃' },

  // Industrial
  { id: 'mac10_neon',      name: 'MAC-10 | Неоновый Чакра',   rarity: 'Industrial', price: 350,  type: 'Skin',    image: '🔫' },
  { id: 'famas_chunin',    name: 'FAMAS | Чунин',             rarity: 'Industrial', price: 450,  type: 'Skin',    image: '🔫' },
  { id: 'galil_sharingan', name: 'Galil AR | Шаринган',       rarity: 'Industrial', price: 500,  type: 'Skin',    image: '🔫' },
  { id: 'charm_kunai',     name: 'Брелок | Кунай',            rarity: 'Industrial', price: 400,  type: 'Charm',   image: '🗡️' },

  // Restricted
  { id: 'ak47_redline',    name: 'AK-47 | Красная Линия',     rarity: 'Restricted', price: 1200, type: 'Skin',    image: '🔫' },
  { id: 'm4a4_sakura',     name: 'M4A4 | Сакура',             rarity: 'Restricted', price: 1100, type: 'Skin',    image: '🔫' },
  { id: 'awp_kyuubi',      name: 'AWP | Кьюби',               rarity: 'Restricted', price: 1400, type: 'Skin',    image: '🔫' },
  { id: 'sticker_akatsuki',name: 'Стикер | Акацуки',          rarity: 'Restricted', price: 900,  type: 'Sticker', image: '☁️' },

  // Classified
  { id: 'ak47_rasengan',   name: 'AK-47 | Расенган',          rarity: 'Classified', price: 2500, type: 'Skin',    image: '🔫' },
  { id: 'deagle_amaterasu',name: 'Desert Eagle | Аматэрасу',  rarity: 'Classified', price: 2800, type: 'Skin',    image: '🔫' },
  { id: 'm4a1s_rinnegan',  name: 'M4A1-S | Риннеган',         rarity: 'Classified', price: 2700, type: 'Skin',    image: '🔫' },

  // Covert
  { id: 'awp_bijuu',       name: 'AWP | Биджу',               rarity: 'Covert',     price: 4500, type: 'Skin',    image: '🔫' },
  { id: 'ak47_susanoo',    name: 'AK-47 | Сусаноо',           rarity: 'Covert',     price: 4800, type: 'Skin',    image: '🔫' },
  { id: 'gloves_sage',     name: 'Перчатки | Режим Отшельника',rarity:'Covert',     price: 4700, type: 'Gloves',  image: '🧤' },

  // Legendary
  { id: 'knife_kubikiri',  name: '★ Нож Кубикирибочо',        rarity: 'Legendary',  price: 8500, type: 'Knife',   image: '⚔️' },
  { id: 'knife_samehada',  name: '★ Самехада',                rarity: 'Legendary',  price: 9000, type: 'Knife',   image: '⚔️' },
  { id: 'knife_kusanagi',  name: '★ Кусанаги',                rarity: 'Legendary',  price: 9500, type: 'Knife',   image: '⚔️' },
];

export const getItemById = (id) => ITEMS.find((i) => i.id === id);
export const getItemsByRarity = (rarity) => ITEMS.filter((i) => i.rarity === rarity);
