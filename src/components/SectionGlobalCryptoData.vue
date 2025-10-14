<script setup lang="ts">
import type { GlobalCryptoData } from '@/types/GlobalCryptoData';
import { formatLargeNumber } from '@/utils/formatLargeNumber';
import { formatNumber } from '@/utils/formatNumber';

defineProps<{
  globalCrypto: GlobalCryptoData;
}>()


</script>

<template>
  <div class="max-w-7xl  mx-auto grid grid-cols-1 my-8 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50">
      <div class="flex items-center justify-between pa-4">
        <div>
          <p class="text-gray-600 text-sm font-medium">Total Market Cap</p>
          <p class="text-2xl font-bold text-gray-900">
            {{ formatLargeNumber(globalCrypto.data.total_market_cap.usd || 0) }}
          </p>
        </div>
        <div
          class="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
          <v-icon class="text-white">mdi-trending-up</v-icon>
        </div>
      </div>
    </div>

    <div class="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50">
      <div class="flex items-center justify-between pa-4">
        <div>
          <p class="text-gray-600 text-sm font-medium">24h Volume</p>
          <p class="text-2xl font-bold text-gray-900">
            {{ formatLargeNumber(globalCrypto.data.total_volume.usd || 0) }}
          </p>
        </div>
        <div class="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
          <v-icon class="text-white">mdi-chart-bar</v-icon>
        </div>
      </div>
    </div>

    <div class="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50">
      <div class="flex items-center justify-between pa-4">
        <div>
          <p class="text-gray-600 text-sm font-medium">Active Coins</p>
          <p class="text-2xl font-bold text-gray-900">
            {{ formatNumber(globalCrypto.data.active_cryptocurrencies || 0) }}
          </p>
        </div>
        <div class="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
          <v-icon class="text-white">mdi-finance</v-icon>
        </div>
      </div>
    </div>

    <div class="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50">
      <div class="flex items-center justify-between pa-4">
        <div>
          <p class="text-gray-600 text-sm font-medium">BTC Dominance</p>
          <p class="text-2xl font-bold text-gray-900">
            {{ (globalCrypto.data.market_cap_percentage.btc || 0).toFixed(1) }}%
          </p>
        </div>
        <div class="w-12 h-12 bg-gradient-to-r from-orange-400 to-amber-500 rounded-xl flex items-center justify-center">
          <v-icon class="text-white">mdi-bitcoin</v-icon>
        </div>
      </div>
    </div>
  </div>
</template>
