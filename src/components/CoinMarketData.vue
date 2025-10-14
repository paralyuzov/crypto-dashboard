<script setup lang="ts">
import { computed } from 'vue'
import type { MarketData } from '@/types/CoinDetail'
import { formatNumber } from '@/utils/formatNumber';
import { formatPrice } from '@/utils/formatPrice';
import { formatSupply } from '@/utils/formatSupply';
import { formatPercentage } from '@/utils/formatPercentage';

interface Props {
  marketData: MarketData
  name: string
}

const props = defineProps<Props>()

const marketMetrics = computed(() => [
  {
    label: 'Market Cap',
    value: formatNumber(props.marketData.market_cap?.usd),
    icon: 'mdi-chart-line',
  },
  {
    label: 'Fully Diluted Valuation',
    value: formatNumber(props.marketData.fully_diluted_valuation?.usd),
    icon: 'mdi-chart-box-outline',
  },
  {
    label: '24h Trading Volume',
    value: formatNumber(props.marketData.total_volume?.usd),
    icon: 'mdi-swap-horizontal',
  },
  {
    label: 'Volume/Market Cap',
    value: props.marketData.total_volume?.usd && props.marketData.market_cap?.usd
      ? (props.marketData.total_volume.usd / props.marketData.market_cap.usd).toFixed(4)
      : 'N/A',
    icon: 'mdi-percent',
  },
])

const priceMetrics = computed(() => [
  {
    label: '24h High',
    value: formatPrice(props.marketData.high_24h?.usd),
    icon: 'mdi-trending-up',
    color: 'success',
  },
  {
    label: '24h Low',
    value: formatPrice(props.marketData.low_24h?.usd),
    icon: 'mdi-trending-down',
    color: 'error',
  },
  {
    label: 'All-Time High',
    value: formatPrice(props.marketData.ath?.usd),
    icon: 'mdi-crown',
    color: 'warning',
  },
  {
    label: 'All-Time Low',
    value: formatPrice(props.marketData.atl?.usd),
    icon: 'mdi-arrow-down-bold',
    color: 'info',
  },
])

const supplyMetrics = computed(() => [
  {
    label: 'Circulating Supply',
    value: formatSupply(props.marketData.circulating_supply),
    icon: 'mdi-circle-outline',
  },
  {
    label: 'Total Supply',
    value: formatSupply(props.marketData.total_supply),
    icon: 'mdi-circle',
  },
  {
    label: 'Max Supply',
    value: formatSupply(props.marketData.max_supply),
    icon: 'mdi-circle-double',
  },
])

const priceChanges = computed(() => [
  {
    label: '1h',
    data: formatPercentage(props.marketData.price_change_percentage_1h_in_currency?.usd),
  },
  {
    label: '24h',
    data: formatPercentage(props.marketData.price_change_percentage_24h),
  },
  {
    label: '7d',
    data: formatPercentage(props.marketData.price_change_percentage_7d),
  },
  {
    label: '30d',
    data: formatPercentage(props.marketData.price_change_percentage_30d),
  },
  {
    label: '1y',
    data: formatPercentage(props.marketData.price_change_percentage_1y),
  },
])
</script>

<template>
  <v-card elevation="2" rounded="xl" class="pa-2">
    <v-card-title class="d-flex align-center gap-2">
      <v-icon>mdi-chart-timeline-variant</v-icon>
      Market Data
    </v-card-title>

    <v-card-text>
      <div class="mb-6">
        <div class="text-subtitle-2 mb-3 text-medium-emphasis">Price Changes</div>
        <v-row dense>
          <v-col
            v-for="change in priceChanges"
            :key="change.label"
            cols="6"
            sm="4"
            md="6"
            lg="4"
          >
            <div class="text-center pa-2">
              <div class="text-caption text-medium-emphasis">{{ change.label }}</div>
              <div
                class="text-body-2 font-weight-medium"
                :class="`text-${change.data.color}`"
              >
                {{ change.data.value }}
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <v-divider class="my-4" />

      <div class="mb-6">
        <div class="text-subtitle-2 mb-3 text-medium-emphasis">Market Metrics</div>
        <div class="space-y-3">
          <div
            v-for="metric in marketMetrics"
            :key="metric.label"
            class="d-flex align-center justify-space-between pa-2"
          >
            <div class="d-flex align-center gap-2">
              <v-icon size="small" color="primary">{{ metric.icon }}</v-icon>
              <span class="text-body-2">{{ metric.label }}</span>
            </div>
            <span class="text-body-2 font-weight-medium">{{ metric.value }}</span>
          </div>
        </div>
      </div>

      <v-divider class="my-4" />

      <div class="mb-6">
        <div class="text-subtitle-2 mb-3 text-medium-emphasis">Price Extremes</div>
        <div class="space-y-3">
          <div
            v-for="price in priceMetrics"
            :key="price.label"
            class="d-flex align-center justify-space-between pa-2"
          >
            <div class="d-flex align-center gap-2">
              <v-icon size="small" :color="price.color">{{ price.icon }}</v-icon>
              <span class="text-body-2">{{ price.label }}</span>
            </div>
            <span class="text-body-2 font-weight-medium">{{ price.value }}</span>
          </div>
        </div>
      </div>

      <v-divider class="my-4" />

      <div>
        <div class="text-subtitle-2 mb-3 text-medium-emphasis">Supply Information</div>
        <div class="space-y-3">
          <div
            v-for="supply in supplyMetrics"
            :key="supply.label"
            class="d-flex align-center justify-space-between pa-2"
          >
            <div class="d-flex align-center gap-2">
              <v-icon size="small" color="primary">{{ supply.icon }}</v-icon>
              <span class="text-body-2">{{ supply.label }}</span>
            </div>
            <span class="text-body-2 font-weight-medium">{{ supply.value }}</span>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.space-y-3 > * + * {
  margin-top: 0.75rem;
}
</style>
