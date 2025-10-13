import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { type CoinListWithMarketData } from '@/types/CoinListWithMarketData'
import { useApiState } from '@/composables/useApiState'
import { apiService } from '@/services/api'

export const useCryptoStore = defineStore('crypto', () => {
  const coins = ref<CoinListWithMarketData[]>([])
  const showAllCoins = ref(false)

  const top15Coins = computed(() => coins.value.slice(0, 15))

  const displayCoins = computed(() => {
    return showAllCoins.value ? coins.value : top15Coins.value
  })

  const { loading, error, run } = useApiState()

  const fetchCoins = async () => {
    const response = await run(() => apiService.getCoinsListWithMarketData())
    coins.value = response.data
  }

  const toggleShowAllCoins = () => {
    showAllCoins.value = !showAllCoins.value
  }

  return { coins, top15Coins, displayCoins, showAllCoins, loading, error, fetchCoins, toggleShowAllCoins }
})
