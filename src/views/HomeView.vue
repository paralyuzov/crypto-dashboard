<script setup lang="ts">
import CoinTable from '@/components/CoinTable.vue'
import MarketCapDistribution from '@/components/MarketCapDistribution.vue'
import SectionGlobalCryptoData from '@/components/SectionGlobalCryptoData.vue'
import TrendingTable from '@/components/TrendingTable.vue'
import { useCryptoStore } from '@/stores/crypto'
import { onMounted } from 'vue'

const cryptoStore = useCryptoStore()

onMounted(() => {
  cryptoStore.fetchCoins()
  cryptoStore.fetchTrendingCoins()
  cryptoStore.fetchGlobalCryptoData()
})
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12">
        <SectionGlobalCryptoData
          v-if="cryptoStore.globalCryptoData"
          :globalCrypto="cryptoStore.globalCryptoData"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <MarketCapDistribution />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" lg="8">
        <CoinTable :coins="cryptoStore.displayCoins" />
      </v-col>

      <v-col cols="12" lg="4">
        <TrendingTable :coins="cryptoStore.trendingCoins" />
      </v-col>
    </v-row>

    <v-overlay
      v-if="cryptoStore.loading"
      :model-value="cryptoStore.loading"
      class="d-flex align-center justify-center"
      style="z-index: 9999"
    >
      <v-card class="pa-8 text-center" elevation="8" rounded="xl">
        <v-progress-circular
          indeterminate
          color="primary"
          size="48"
          class="mb-4"
        ></v-progress-circular>
        <p class="text-medium-emphasis">Loading cryptocurrency data...</p>
      </v-card>
    </v-overlay>

    <v-alert
      v-if="cryptoStore.error"
      type="error"
      variant="tonal"
      class="ma-4"
      icon="mdi-alert-circle"
    >
      <v-alert-title>Error Loading Data</v-alert-title>
      {{ cryptoStore.error }}
    </v-alert>
  </div>
</template>
