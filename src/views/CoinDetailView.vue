<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCryptoStore } from '@/stores/crypto'
import CoinPriceChart from '@/components/CoinPriceChart.vue'
import CoinStatistics from '@/components/CoinStatistics.vue'
import CoinDescription from '@/components/CoinDescription.vue'
import CoinMarketData from '@/components/CoinMarketData.vue'
import CoinSocialLinks from '@/components/CoinSocialLinks.vue'
import { formatPercentage } from '@/utils/formatPercentage'
import { formatPrice } from '@/utils/formatPrice'


interface Props {
  id: string
}

const props = defineProps<Props>()
const route = useRoute()
const router = useRouter()
const cryptoStore = useCryptoStore()

const coinId = computed(() => props.id || route.params.id as string)


watch(coinId, (newId) => {
  if (newId) {
    cryptoStore.fetchCoinDetails(newId)
  }
}, { immediate: true })

onMounted(() => {
  if (coinId.value) {
    cryptoStore.fetchCoinDetails(coinId.value)
  }
})

const coinData = computed(() => cryptoStore.coinDetails)
const loading = computed(() => cryptoStore.loading)
const error = computed(() => cryptoStore.error)

const priceChange24h = computed(() => {
  if (!coinData.value?.market_data?.price_change_percentage_24h) return null
  return formatPercentage(coinData.value.market_data.price_change_percentage_24h)
})

const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <v-container class="pa-4">
    <div v-if="loading" class="d-flex justify-center align-center" style="min-height: 400px;">
      <v-progress-circular indeterminate color="primary" size="64" />
    </div>

    <v-alert v-else-if="error" type="error" variant="tonal" class="mb-4">
      <div class="d-flex align-center justify-space-between">
        <span>Failed to load coin details: {{ error }}</span>
        <v-btn @click="goBack" variant="outlined" size="small">
          Go Back
        </v-btn>
      </div>
    </v-alert>

    <div v-else-if="coinData">
      <v-card class="mb-6" elevation="8" rounded="xl">
        <v-card-text class="pa-6">
          <v-btn @click="goBack" variant="text" prepend-icon="mdi-arrow-left" class="mb-4">
            Back
          </v-btn>

          <div class="d-flex align-center mb-4">
            <v-avatar size="64" class="mr-4">
              <v-img :src="coinData.image.large" :alt="coinData.name" />
            </v-avatar>

            <div class="flex-grow-1">
              <div class="d-flex align-center gap-2 mb-2">
                <h1 class="text-h4 font-weight-bold">{{ coinData.name }}</h1>
                <v-chip size="small" variant="outlined">
                  {{ coinData.symbol.toUpperCase() }}
                </v-chip>
                <v-chip v-if="coinData.market_cap_rank" size="small" color="primary" variant="flat">
                  Rank #{{ coinData.market_cap_rank }}
                </v-chip>
              </div>

              <div class="d-flex align-center gap-4">
                <div>
                  <div class="text-h5 font-weight-bold">
                    {{ formatPrice(coinData.market_data.current_price.usd) }}
                  </div>
                  <div v-if="priceChange24h" class="text-body-1 font-weight-medium"
                    :class="`text-${priceChange24h.color}`">
                    {{ priceChange24h.value }} (24h)
                  </div>
                </div>

                <div class="">
                  <v-chip v-if="coinData.sentiment_votes_up_percentage"
                    :color="coinData.sentiment_votes_up_percentage > 50 ? 'success' : 'error'" variant="flat"
                    size="small"
                    density="default"
                    >
                    {{ coinData.sentiment_votes_up_percentage.toFixed(1) }}% Bullish
                  </v-chip>
                </div>
              </div>
            </div>
          </div>

          <div v-if="coinData.categories.length" class="mb-4">
            <div class="text-subtitle-2 mb-2 text-medium-emphasis">Categories</div>
            <div class="d-flex flex-wrap gap-2">
              <v-chip v-for="category in coinData.categories.slice(0, 5)" :key="category" size="small"
                variant="outlined" color="primary">
                {{ category }}
              </v-chip>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <v-row>
        <v-col cols="12" lg="8">
          <CoinPriceChart v-if="coinData" :coin-id="coinData.id" class="mb-6" />

          <CoinDescription v-if="coinData.description.en" :description="coinData.description.en" :name="coinData.name"
            class="mb-6" />
        </v-col>

        <v-col cols="12" lg="4">
          <CoinMarketData :market-data="coinData.market_data" :name="coinData.name" class="mb-6" />

          <CoinStatistics :coin-data="coinData" class="mb-6" />

          <CoinSocialLinks :links="coinData.links" :name="coinData.name" />
        </v-col>
      </v-row>
    </div>

    <div v-else class="text-center pa-8">
      <v-icon size="64" color="grey" class="mb-4">mdi-currency-btc</v-icon>
      <h3 class="text-h6 mb-2">No coin data available</h3>
      <p class="text-body-2 text-medium-emphasis mb-4">
        The requested cryptocurrency could not be found.
      </p>
      <v-btn @click="goBack" color="primary" variant="outlined">
        Go Back
      </v-btn>
    </div>
  </v-container>
</template>
