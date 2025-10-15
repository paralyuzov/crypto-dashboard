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
  <v-card class="overflow-hidden" elevation="4" rounded="xl">
    <v-card-title class="d-flex justify-space-between align-center pa-4 bg-grey-lighten-4">
      <h2 class="text-h6 font-weight-medium">Market Overview</h2>
      <v-btn
        @click="toggleCoinsView"
        :prepend-icon="buttonIcon"
        density="compact"
        :text="buttonText"
        color="primary"
        variant="outlined"
        size="small"
      >
      </v-btn>
    </v-card-title>

    <div class="d-none d-lg-block" style="overflow-x: auto;">
      <table style="width: 100%; min-width: 800px;">
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

    <v-card-text v-if="!props.coins.length" class="text-center py-12">
      <div class="d-flex justify-center mb-4">
        <v-icon size="64" color="grey-lighten-1">mdi-chart-line</v-icon>
      </div>
      <h3 class="text-subtitle-1 font-weight-medium mb-2">No data available</h3>
      <p class="text-body-2 text-medium-emphasis">Cryptocurrency data will appear here when loaded.</p>
    </v-card-text>
  </v-card>
</template>
