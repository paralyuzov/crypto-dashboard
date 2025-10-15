<script setup lang="ts">
import type { CoinListWithMarketData } from '@/types/CoinListWithMarketData'
import { useCryptoStore } from '@/stores/crypto'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { formatLargeNumber } from '@/utils/formatLargeNumber'
import { formatPrice } from '@/utils/formatPrice'
import { formatPercentageValue } from '@/utils/formatPercentage'

const props = defineProps<{
  coins: Array<CoinListWithMarketData>
}>()

const cryptoStore = useCryptoStore()
const router = useRouter()

const th = ['#', 'Coin', 'Price', '24h', 'Market Cap', 'Volume(24h)', 'Circulating Supply']

const buttonText = computed(() => {
  return cryptoStore.showAllCoins ? 'Show Top 15' : 'Show Top 100 Coins'
})

const buttonIcon = computed(() => {
  return cryptoStore.showAllCoins ? 'mdi-chevron-up' : 'mdi-chevron-down'
})

const toggleCoinsView = () => {
  cryptoStore.toggleShowAllCoins()
}

const navigateToCoin = (coinId: string) => {
  router.push({ name: 'coin-detail', params: { id: coinId } })
}
</script>

<template>
  <div
    class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-gray-200/50 overflow-hidden"
  >
    <div class="flex justify-between items-center bg-gray-200/60 p-2">
      <h2 class="text-lg font-semibold text-gray-800 flex items-center px-4">Market Overview</h2>
      <v-btn
        @click="toggleCoinsView"
        :prepend-icon="buttonIcon"
        density="compact"
        :text="buttonText"
        color="blue-lighten-1"
        outlined
      >
      </v-btn>
    </div>
    <div class="hidden lg:block overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50/80 backdrop-blur-sm">
          <tr>
            <th
              v-for="(item, index) in th"
              :key="index"
              class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200/50 first:pl-8 last:pr-8"
            >
              {{ item }}
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-100/50">
          <tr
            v-for="coin in props.coins"
            :key="coin.id"
            @click="navigateToCoin(coin.id)"
            class="group hover:bg-gray-50/50 transition-all hover:-translate-y-0.5 duration-500 ease-in-out hover:shadow-lg shadow-black/8 cursor-pointer"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 first:pl-8">
              {{ coin.market_cap_rank }}
            </td>

            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0 relative">
                  <img
                    :src="coin.image"
                    :alt="coin.name"
                    class="w-10 h-10 mr-2 rounded-full ring-2 ring-white shadow-md group-hover:ring-sky-200 transition-all duration-200"
                  />
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-900">{{ coin.name }}</span>
                  <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {{ coin.symbol }}
                  </span>
                </div>
              </div>
            </td>

            <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
              ${{ formatPrice(coin.current_price) }}
            </td>

            <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold">
              <span
                :class="[
                  'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                  coin.price_change_percentage_24h >= 0
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-red-100 text-red-800',
                ]"
              >
                <span class="mr-1">{{ coin.price_change_percentage_24h >= 0 ? '↗' : '↘' }}</span>
                {{ Math.abs(formatPercentageValue(coin.price_change_percentage_24h)) }}%
              </span>
            </td>

            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
              ${{ formatLargeNumber(coin.market_cap) }}
            </td>

            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
              ${{ formatLargeNumber(coin.total_volume) }}
            </td>

            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
              {{ formatLargeNumber(coin.circulating_supply) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile view with Vuetify classes -->
    <div class="d-lg-none pa-4">
      <v-card
        v-for="coin in props.coins"
        :key="coin.id"
        @click="navigateToCoin(coin.id)"
        class="mb-4 cursor-pointer"
        elevation="2"
        rounded="lg"
        hover
      >
        <v-card-text class="pa-4">
          <!-- Top row: Coin info and price -->
          <div class="d-flex align-center justify-space-between mb-4">
            <div class="d-flex align-center">
              <div class="position-relative mr-3">
                <v-avatar size="40">
                  <v-img :src="coin.image" :alt="coin.name" />
                </v-avatar>
                <v-chip
                  size="x-small"
                  color="primary"
                  class="position-absolute"
                  style="top: -4px; right: -4px; min-width: 20px; height: 20px"
                >
                  {{ coin.market_cap_rank }}
                </v-chip>
              </div>
              <div>
                <h3 class="text-subtitle-1 font-weight-medium">{{ coin.name }}</h3>
                <p class="text-caption text-medium-emphasis text-uppercase">{{ coin.symbol }}</p>
              </div>
            </div>

            <div class="text-right">
              <p class="text-h6 font-weight-bold">${{ formatPrice(coin.current_price) }}</p>
              <v-chip
                size="small"
                :color="coin.price_change_percentage_24h >= 0 ? 'success' : 'error'"
                variant="tonal"
                class="mt-1"
              >
                {{ coin.price_change_percentage_24h >= 0 ? '+' : ''
                }}{{
                  Math.abs(formatPercentageValue(coin.price_change_percentage_24h)).toFixed(2)
                }}%
              </v-chip>
            </div>
          </div>

          <!-- Bottom row: Key metrics -->
          <v-divider class="mb-3"></v-divider>
          <v-row dense>
            <v-col cols="6">
              <div>
                <p class="text-caption text-medium-emphasis mb-1">Market Cap</p>
                <p class="text-body-2 font-weight-medium">
                  ${{ formatLargeNumber(coin.market_cap) }}
                </p>
              </div>
            </v-col>
            <v-col cols="6">
              <div>
                <p class="text-caption text-medium-emphasis mb-1">Volume (24h)</p>
                <p class="text-body-2 font-weight-medium">
                  ${{ formatLargeNumber(coin.total_volume) }}
                </p>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>

    <div v-if="!props.coins.length" class="text-center py-12">
      <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      </div>
      <h3 class="text-sm font-medium text-gray-900 mb-1">No data available</h3>
      <p class="text-sm text-gray-500">Cryptocurrency data will appear here when loaded.</p>
    </div>
  </div>
</template>
