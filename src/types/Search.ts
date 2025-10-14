export interface SearchCoin {
  id: string
  name: string
  symbol: string
  market_cap_rank: number | null
  thumb: string
  large: string
}

export interface SearchExchange {
  id: string
  name: string
  market_type: string
  thumb: string
  large: string
}

export interface SearchCategory {
  id: number
  name: string
}

export interface SearchNft {
  id: string
  name: string
  symbol: string
  thumb: string
}

export interface SearchIco {
  id: string
  name: string
  symbol: string
  thumb: string
}

export interface SearchResult {
  coins: SearchCoin[]
  exchanges: SearchExchange[]
  icos: SearchIco[]
  categories: SearchCategory[]
  nfts: SearchNft[]
}
