<script setup lang="ts">
import CoinTable from '@/components/CoinTable.vue';
import MarketCapDistribution from '@/components/MarketCapDistribution.vue';
import SectionGlobalCryptoData from '@/components/SectionGlobalCryptoData.vue';
import TrendingTable from '@/components/TrendingTable.vue';
import { useCryptoStore } from '@/stores/crypto';
import { onMounted } from 'vue';

const cryptoStore = useCryptoStore();

onMounted(() => {
  cryptoStore.fetchCoins();
  cryptoStore.fetchTrendingCoins();
  cryptoStore.fetchGlobalCryptoData();
})

</script>

<template>
  <div class="">

    <SectionGlobalCryptoData v-if="cryptoStore.globalCryptoData" :globalCrypto="cryptoStore.globalCryptoData" />
    <MarketCapDistribution/>

    <div class="w-full mx-auto px-4">
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div class="xl:col-span-2">
          <CoinTable :coins="cryptoStore.displayCoins" />
        </div>

        <div class="xl:col-span-1">
          <div class="sticky top-8">
            <TrendingTable :coins="cryptoStore.trendingCoins" />
          </div>
        </div>
      </div>


      <div v-if="cryptoStore.loading"
        class="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center">
          <v-progress-circular indeterminate color="primary" size="48" class="mb-4"></v-progress-circular>
          <p class="text-gray-600 font-medium">Loading cryptocurrency data...</p>
        </div>
      </div>

      <div v-if="cryptoStore.error" class="mt-8 bg-red-50 border border-red-200 rounded-2xl p-6">
        <div class="flex items-center">
          <v-icon class="text-red-500 mr-3">mdi-alert-circle</v-icon>
          <div>
            <h3 class="text-red-800 font-semibold">Error Loading Data</h3>
            <p class="text-red-600 text-sm mt-1">{{ cryptoStore.error }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
