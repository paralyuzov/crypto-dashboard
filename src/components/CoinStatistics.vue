<script setup lang="ts">
import { computed } from 'vue'
import type { CoinDetail } from '@/types/CoinDetail'
import { formatDate } from '@/utils/formatDate';
import { formatNumber } from '@/utils/formatNumber';

interface Props {
  coinData: CoinDetail
}

const props = defineProps<Props>()


const generalStats = computed(() => [
  {
    label: 'Genesis Date',
    value: props.coinData.genesis_date ? formatDate(props.coinData.genesis_date) : 'N/A',
    icon: 'mdi-calendar',
  },
  {
    label: 'Hashing Algorithm',
    value: props.coinData.hashing_algorithm || 'N/A',
    icon: 'mdi-lock-outline',
  },
  {
    label: 'Block Time',
    value: props.coinData.block_time_in_minutes
      ? `${props.coinData.block_time_in_minutes} minutes`
      : 'N/A',
    icon: 'mdi-clock-outline',
  },
  {
    label: 'Country of Origin',
    value: props.coinData.country_origin || 'N/A',
    icon: 'mdi-earth',
  },
])

const communityStats = computed(() => [
  {
    label: 'Watchlist Users',
    value: formatNumber(props.coinData.watchlist_portfolio_users),
    icon: 'mdi-eye-outline',
  },
  {
    label: 'Reddit Subscribers',
    value: formatNumber(props.coinData.community_data.reddit_subscribers),
    icon: 'mdi-reddit',
  },
  {
    label: 'Facebook Likes',
    value: formatNumber(props.coinData.community_data.facebook_likes),
    icon: 'mdi-facebook',
  },
  {
    label: 'Telegram Users',
    value: formatNumber(props.coinData.community_data.telegram_channel_user_count),
    icon: 'mdi-telegram',
  },
])

const developerStats = computed(() => [
  {
    label: 'GitHub Stars',
    value: formatNumber(props.coinData.developer_data.stars),
    icon: 'mdi-star-outline',
  },
  {
    label: 'GitHub Forks',
    value: formatNumber(props.coinData.developer_data.forks),
    icon: 'mdi-source-fork',
  },
  {
    label: 'Contributors',
    value: formatNumber(props.coinData.developer_data.pull_request_contributors),
    icon: 'mdi-account-group-outline',
  },
  {
    label: '4-Week Commits',
    value: formatNumber(props.coinData.developer_data.commit_count_4_weeks),
    icon: 'mdi-source-commit',
  },
])

const sentimentScore = computed(() => {
  if (!props.coinData.sentiment_votes_up_percentage) return null
  return {
    up: props.coinData.sentiment_votes_up_percentage,
    down: props.coinData.sentiment_votes_down_percentage || 0,
  }
})
</script>

<template>
  <v-card elevation="2" rounded="xl">
    <v-card-title class="d-flex align-center gap-2">
      <v-icon>mdi-chart-box-outline</v-icon>
      Statistics
    </v-card-title>

    <v-card-text>
      <div v-if="sentimentScore" class="mb-6">
        <div class="text-subtitle-2 mb-3 text-medium-emphasis">Community Sentiment</div>
        <div class="mb-3">
          <div class="d-flex justify-space-between align-center mb-2">
            <span class="text-body-2">Bullish</span>
            <span class="text-body-2 font-weight-medium text-success">
              {{ sentimentScore.up.toFixed(1) }}%
            </span>
          </div>
          <v-progress-linear
            :model-value="sentimentScore.up"
            color="success"
            height="6"
            rounded
            class="mb-2"
          />

          <div class="d-flex justify-space-between align-center mb-2">
            <span class="text-body-2">Bearish</span>
            <span class="text-body-2 font-weight-medium text-error">
              {{ sentimentScore.down.toFixed(1) }}%
            </span>
          </div>
          <v-progress-linear
            :model-value="sentimentScore.down"
            color="error"
            height="6"
            rounded
          />
        </div>
      </div>

      <v-divider v-if="sentimentScore" class="my-4" />

      <div class="mb-6">
        <div class="text-subtitle-2 mb-3 text-medium-emphasis">General Information</div>
        <div class="space-y-3">
          <div
            v-for="stat in generalStats"
            :key="stat.label"
            class="d-flex align-center justify-space-between pa-2"
          >
            <div class="d-flex align-center gap-2">
              <v-icon size="small" color="primary">{{ stat.icon }}</v-icon>
              <span class="text-body-2">{{ stat.label }}</span>
            </div>
            <span class="text-body-2 font-weight-medium">{{ stat.value }}</span>
          </div>
        </div>
      </div>

      <v-divider class="my-4" />

      <!-- Community Stats -->
      <div class="mb-6">
        <div class="text-subtitle-2 mb-3 text-medium-emphasis">Community</div>
        <div class="space-y-3">
          <div
            v-for="stat in communityStats"
            :key="stat.label"
            class="d-flex align-center justify-space-between pa-2"
          >
            <div class="d-flex align-center gap-2">
              <v-icon size="small" color="primary">{{ stat.icon }}</v-icon>
              <span class="text-body-2">{{ stat.label }}</span>
            </div>
            <span class="text-body-2 font-weight-medium">{{ stat.value }}</span>
          </div>
        </div>
      </div>

      <v-divider class="my-4" />

      <div>
        <div class="text-subtitle-2 mb-3 text-medium-emphasis">Developer Activity</div>
        <div class="space-y-3">
          <div
            v-for="stat in developerStats"
            :key="stat.label"
            class="d-flex align-center justify-space-between pa-2"
          >
            <div class="d-flex align-center gap-2">
              <v-icon size="small" color="primary">{{ stat.icon }}</v-icon>
              <span class="text-body-2">{{ stat.label }}</span>
            </div>
            <span class="text-body-2 font-weight-medium">{{ stat.value }}</span>
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
