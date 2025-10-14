import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { type CoinListWithMarketData } from '@/types/CoinListWithMarketData'
import { useApiState } from '@/composables/useApiState'
import { apiService } from '@/services/api'
import type { TrendingCoin } from '@/types/TrendingCoin'
import type { GlobalCryptoData } from '@/types/GlobalCryptoData'
import type { CoinDetail } from '@/types/CoinDetail'

export const useCryptoStore = defineStore('crypto', () => {
  const coins = ref<CoinListWithMarketData[]>([])
  const showAllCoins = ref(false)
  const trendingCoins = ref<TrendingCoin[]>([])
  const globalCryptoData = ref<GlobalCryptoData | null>(null)
  const coinDetails = ref<CoinDetail | null>(null)
  const { loading, error, run } = useApiState()

  const top15Coins = computed(() => coins.value.slice(0, 15))

  const displayCoins = computed(() => {
    return showAllCoins.value ? coins.value : top15Coins.value
  })

  const fetchCoins = async () => {
    const response = await run(() => apiService.getCoinsListWithMarketData())
    coins.value = response.data
  }

  const fetchTrendingCoins = async () => {
    const response = await run(() => apiService.getTrendingCoins())
    trendingCoins.value = response.data.coins
  }

  const fetchGlobalCryptoData = async () => {
    const response = await run(() => apiService.getGlobalCryptoData())
    globalCryptoData.value = response.data
  }

  const fetchCoinDetails = async (id: string) => {
    const response = await run(() => apiService.getCoinById(id))
    coinDetails.value = response.data
  }

  const toggleShowAllCoins = () => {
    showAllCoins.value = !showAllCoins.value
  }

  return {
    coins,
    top15Coins,
    displayCoins,
    showAllCoins,
    loading,
    error,
    trendingCoins,
    globalCryptoData,
    coinDetails,
    fetchCoins,
    toggleShowAllCoins,
    fetchTrendingCoins,
    fetchGlobalCryptoData,
    fetchCoinDetails,
  }
})
