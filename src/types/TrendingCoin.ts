export interface TrendingCoinsResponse {
  coins: TrendingCoin[];
}

export interface TrendingCoin {
  item: TrendingCoinItem;
}

export interface TrendingCoinItem {
  id: string;
  coin_id: number;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  small: string;
  large: string;
  slug: string;
  price_btc: number;
  score: number;
  data: TrendingCoinData;
}

export interface TrendingCoinData {
  price: number;
  price_btc: string;
  price_change_percentage_24h: Record<string, number>;
  market_cap: string;
  market_cap_btc: string;
  total_volume: string;
  total_volume_btc: string;
  sparkline: string;
  content: string | null;
}
