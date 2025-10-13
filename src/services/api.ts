import http from '@/config/axios'
import type { CoinListWithMarketData } from '@/types/CoinListWithMarketData'
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
}
