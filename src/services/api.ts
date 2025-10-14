import http from '@/config/axios'
import type { CoinDetail } from '@/types/CoinDetail'
import type { CoinListWithMarketData } from '@/types/CoinListWithMarketData'
import type { GlobalCryptoData } from '@/types/GlobalCryptoData'
import type { TrendingCoinsResponse } from '@/types/TrendingCoin'
import type { SearchResult } from '@/types/Search'
import type { AxiosPromise } from 'axios'

export const apiService = {
  getCoinsListWithMarketData: (
    vs_currency: string = 'usd',
    order: string = 'market_cap_desc',
  ): AxiosPromise<CoinListWithMarketData[]> => {
    return http.get('/coins/markets', {
      params: {
        vs_currency,
        order,
      },
    })
  },

  getTrendingCoins: (): AxiosPromise<TrendingCoinsResponse> => {
    return http.get('/search/trending')
  },

  getGlobalCryptoData: (): AxiosPromise<GlobalCryptoData> => {
    return http.get('/global')
  },

  getCoinById: (id: string): AxiosPromise<CoinDetail> => {
    return http.get(`/coins/${id}`)
  },

  searchCoins: (query: string): AxiosPromise<SearchResult> => {
    return http.get('/search', { params: { query } })
  },
}
