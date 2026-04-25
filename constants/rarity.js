import COLORS from './colors';

export const RARITIES = ['Consumer', 'Industrial', 'Restricted', 'Classified', 'Covert', 'Legendary'];

export const RARITY_COLORS = {
  Consumer: COLORS.consumer,
  Industrial: COLORS.industrial,
  Restricted: COLORS.restricted,
  Classified: COLORS.classified,
  Covert: COLORS.covert,
  Legendary: COLORS.legendary,
};

export const RARITY_PRICE_RANGE = {
  Consumer:   [100, 300],
  Industrial: [200, 600],
  Restricted: [600, 1500],
  Classified: [1200, 3000],
  Covert:     [2500, 5000],
  Legendary:  [4000, 10000],
};

export const DEFAULT_DISTRIBUTION = {
  Consumer:   0.7900,
  Industrial: 0.1500,
  Restricted: 0.0450,
  Classified: 0.0100,
  Covert:     0.0049,
  Legendary:  0.0001,
};
