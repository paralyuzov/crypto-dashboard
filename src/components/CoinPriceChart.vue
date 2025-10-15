<script setup lang="ts">
import { computed } from 'vue'
import { useCryptoStore } from '@/stores/crypto'
import { formatDate } from '@/utils/formatDate'
import { formatPrice } from '@/utils/formatPrice'
import { useDisplay } from 'vuetify'

interface Props {
  coinId: string
}
const { mobile } = useDisplay()
const props = defineProps<Props>()
const cryptoStore = useCryptoStore()
const coinData = computed(() => cryptoStore.coinDetails)
const legendConfig = computed(() => ({
  position: mobile.value ? ('bottom' as const) : ('right' as const),
}))

const chartSize = computed(() => {
  if (mobile.value) return 250
  return 280
})
const chartData = computed(() => {
  if (!coinData.value?.market_data) return []

  const marketData = coinData.value.market_data
  const currentPrice = marketData.current_price?.usd || 0
  const ath = marketData.ath?.usd || 0
  const atl = marketData.atl?.usd || 0

  if (!currentPrice || !ath || !atl) return []

  const totalRange = ath - atl
  const currentFromATL = currentPrice - atl
  const remainingToATH = ath - currentPrice

  const currentPercentage = (currentFromATL / totalRange) * 100
  const potentialPercentage = (remainingToATH / totalRange) * 100

  return [
    {
      key: 1,
      title: 'Distance from ATL',
      value: currentPercentage,
      color: '#4CAF50',
    },
    {
      key: 2,
      title: 'Distance to ATH',
      value: potentialPercentage,
      color: '#FF9800',
    },
  ]
})

const priceMetrics = computed(() => {
  if (!coinData.value?.market_data) return null

  const marketData = coinData.value.market_data
  return {
    current: formatPrice(marketData.current_price?.usd),
    ath: formatPrice(marketData.ath?.usd),
    atl: formatPrice(marketData.atl?.usd),
    athDate: marketData.ath_date?.usd ? formatDate(marketData.ath_date.usd) : 'N/A',
    atlDate: marketData.atl_date?.usd ? formatDate(marketData.atl_date.usd) : 'N/A',
    athChange: marketData.ath_change_percentage?.usd
      ? marketData.ath_change_percentage.usd.toFixed(2)
      : 'N/A',
    atlChange: marketData.atl_change_percentage?.usd
      ? marketData.atl_change_percentage.usd.toFixed(2)
      : 'N/A',
  }
})
</script>

<template>
  <v-card elevation="2" rounded="xl" class="pa-2">
    <v-card-title class="flex align-center gap-2">
      <v-icon>mdi-chart-pie</v-icon>
      Price Analysis
    </v-card-title>

    <v-card-text class="d-flex flex-column align-center">
      <div v-if="chartData.length > 0 && priceMetrics">
        <div class="d-flex justify-center mb-6">
          <v-pie
            :items="chartData"
            :legend="legendConfig"
            :tooltip="{
              subtitleFormat: (s) => `${s.value.toFixed(1)}% of total range`,
            }"
            inner-cut="60"
            :size="chartSize"
            :animation="{ duration: 1000, easing: 'easeInOutQuad' }"
            hide-slice
          >
            <template v-slot:legend-text="{ item }">
              <div class="d-flex align-center justify-space-between w-100">
                <span class="text-body-2">{{ item.title }}</span>
                <span class="text-body-2 font-weight-bold"> {{ item.value.toFixed(1) }}% </span>
              </div>
            </template>
          </v-pie>
        </div>

        <v-row dense>
          <v-col cols="12" md="4">
            <v-card variant="outlined" class="pa-3 text-center">
              <div class="text-caption text-medium-emphasis mb-1">All-Time Low</div>
              <div class="text-h6 font-weight-bold text-success">{{ priceMetrics.atl }}</div>
              <div class="text-caption text-medium-emphasis">{{ priceMetrics.atlDate }}</div>
              <div class="text-caption text-success">+{{ priceMetrics.atlChange }}% from ATL</div>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card variant="outlined" class="pa-3 text-center bg-primary-lighten-5">
              <div class="text-caption text-medium-emphasis mb-1">Current Price</div>
              <div class="text-h6 font-weight-bold text-primary">{{ priceMetrics.current }}</div>
              <div class="text-caption text-medium-emphasis">Right Now</div>
              <v-chip size="small" color="primary" variant="flat">
                {{ props.coinId.toUpperCase() }}
              </v-chip>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card variant="outlined" class="pa-3 text-center">
              <div class="text-caption text-medium-emphasis mb-1">All-Time High</div>
              <div class="text-h6 font-weight-bold text-warning">{{ priceMetrics.ath }}</div>
              <div class="text-caption text-medium-emphasis">{{ priceMetrics.athDate }}</div>
              <div class="text-caption text-error">{{ priceMetrics.athChange }}% from ATH</div>
            </v-card>
          </v-col>
        </v-row>

        <div class="mt-4 pa-3 bg-grey-lighten-5 rounded">
          <div class="text-subtitle-2 mb-2">Chart Explanation</div>
          <p class="text-body-2 text-medium-emphasis mb-0">
            This chart shows the current price position relative to the all-time high (ATH) and
            all-time low (ATL). The green section represents how far the price has moved from its
            lowest point, while the orange section shows the remaining distance to reach its highest
            point.
          </p>
        </div>
      </div>

      <div v-else-if="!coinData" class="d-flex align-center justify-center" style="height: 300px">
        <div class="text-center">
          <v-progress-circular indeterminate color="primary" size="48" class="mb-4" />
          <p class="text-body-2 text-medium-emphasis">Loading price data...</p>
        </div>
      </div>

      <div v-else class="d-flex align-center justify-center" style="height: 300px">
        <div class="text-center">
          <v-icon size="64" color="grey-lighten-1" class="mb-4"> mdi-chart-pie </v-icon>
          <h4 class="text-h6 mb-2 text-medium-emphasis">No Price Data Available</h4>
          <p class="text-body-2 text-medium-emphasis">
            Unable to generate price analysis for this cryptocurrency.
          </p>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
