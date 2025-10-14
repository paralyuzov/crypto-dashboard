<script setup lang="ts">
  import { computed, onMounted } from 'vue'
  import { useCryptoStore } from '@/stores/crypto'

  const cryptoStore = useCryptoStore()

  const legendConfig = { position: 'right' as const }

  const colors = [
    '#F7931A',
    '#627EEA',
    '#26A17B',
    '#F3BA2F',
    '#9945FF',
    '#2775CA',
    '#23292F',
    '#00D4AA',
    '#C2A633',
    '#0033AD',
  ]

  const items = computed(() => {
    if (!cryptoStore.globalCryptoData?.data?.market_cap_percentage) {
      return []
    }

    const marketCapPercentages = cryptoStore.globalCryptoData.data.market_cap_percentage

    return Object.entries(marketCapPercentages)
      .filter(([, percentage]) => percentage > 0.5)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([symbol, percentage], index) => ({
        key: index + 1,
        title: symbol.toUpperCase(),
        value: percentage,
        color: colors[index] || `hsl(${(index * 137.508) % 360}, 70%, 50%)`,
      }))
  })

  onMounted(() => {
    if (!cryptoStore.globalCryptoData) {
      cryptoStore.fetchGlobalCryptoData()
    }
  })
</script>

<template>
  <v-container class="flex-fill flex-column align-start justify-center">
    <div class="mb-6">
      <h3 class="text-h5 text-center mb-2">Cryptocurrency Market Cap Distribution</h3>
      <p class="text-body-2 text-center text-medium-emphasis">
        Market dominance by cryptocurrency (%)
      </p>
    </div>

    <v-sheet class="rounded-xl elevation-2" elevation="6" rounded="xl">
      <v-progress-circular
        v-if="cryptoStore.loading"
        indeterminate
        color="primary"
        size="64"
        class="d-block mx-auto"
      ></v-progress-circular>

      <v-alert
        v-else-if="cryptoStore.error"
        type="error"
        variant="tonal"
        class="mb-4"
      >
        Failed to load market data: {{ cryptoStore.error }}
      </v-alert>

      <v-pie
        v-else-if="items.length > 0"
        :items="items"
        :legend="legendConfig"
        :tooltip="{
          subtitleFormat: (s) => `${s.value.toFixed(2)}% market dominance`
        }"
        inner-cut="60"
        size="400"
        :animation="{ duration: 300, easing: 'easeInCubic' }"
        hide-slice
        density="comfortable"
        :reveal="{duration: 3000}"
        class=" rounded-xl pa-6"
      >
        <template v-slot:legend-text="{ item }">
          <div class="d-flex ga-2 align-center">
            <div class="font-weight-medium">{{ item.title }}</div>
            <div class="ml-auto font-weight-bold">
              {{ item.value.toFixed(2) }}%
            </div>
          </div>
        </template>
      </v-pie>

      <div v-else class="text-center pa-8">
        <v-icon size="48" color="grey" class="mb-2">mdi-chart-pie</v-icon>
        <p class="text-body-1 text-medium-emphasis">No market data available</p>
      </div>
    </v-sheet>
  </v-container>
</template>
