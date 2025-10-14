<script setup lang="ts">
import { type TrendingCoin } from '@/types/TrendingCoin';

const props = defineProps<{
  coins: Array<TrendingCoin>;
}>();

const th = ['Rank', 'Coin', '24h'];

const getPrice24hChange = (coin: TrendingCoin): number => {
  const changes = coin.item.data.price_change_percentage_24h;
  return changes?.usd || changes?.btc || 0;
};

</script>

<template>
  <div class="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
    <div class="bg-gradient-to-r from-purple-50 to-pink-50  border-b border-gray-200/50">
      <h2 class="text-lg font-semibold text-gray-800 flex items-center px-4">
        Trending Cryptocurrencies
      </h2>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50/80 backdrop-blur-sm ">
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
            :key="coin.item.id"
            class="group hover:bg-gradient-to-r hover:from-purple-50/30 hover:-translate-y-0.5 transition-all duration-300 ease-in-out hover:shadow-lg shadow-black/8"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 first:pl-8">
              <div class="flex items-center">
                <span class="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
                  {{ coin.item.market_cap_rank || 'N/A' }}
                </span>
              </div>
            </td>

            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center space-x-3">
                <div class="flex-shrink-0 mr-2 relative">
                  <img
                    :src="coin.item.small"
                    :alt="coin.item.name"
                    class="w-8 h-8 rounded-full shadow-sm"
                  />
                  <div class="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <v-icon size="8" class="text-white">mdi-fire</v-icon>
                  </div>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-xs text-gray-500 uppercase">
                    {{ coin.item.symbol }}
                  </span>
                </div>
              </div>
            </td>

            <td class="px-6 py-4 flex items-center justify-evenly whitespace-nowrap text-sm font-semibold">
              <span
                :class="[
                  'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                  getPrice24hChange(coin) >= 0
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-red-100 text-red-800'
                ]"
              >
                <span class="mr-1">{{ getPrice24hChange(coin) >= 0 ? '↗' : '↘' }}</span>
                {{ Math.abs(getPrice24hChange(coin)).toFixed(1) }}%
              </span>
              <div class="w-16 h-8 flex items-center justify-center rounded-lg border shadow-md shadow-black/20">
                <img
                  v-if="coin.item.data.sparkline"
                  :src="coin.item.data.sparkline"
                  :alt="`${coin.item.name} price chart`"
                  class="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                />
                <span v-else class="text-xs text-gray-400">—</span>
              </div>
            </td>

          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="!props.coins.length" class="text-center py-12">
      <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
        <v-icon class="text-purple-500" size="32">mdi-trending-up</v-icon>
      </div>
      <h3 class="text-sm font-medium text-gray-900 mb-1">No trending data</h3>
      <p class="text-sm text-gray-500">Trending cryptocurrency data will appear here when loaded.</p>
    </div>
  </div>
</template>
