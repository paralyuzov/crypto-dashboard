<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { apiService } from '@/services/api'
import { useApiState } from '@/composables/useApiState'
import type { SearchResult, SearchCoin } from '@/types/Search'

const router = useRouter()
const searchQuery = ref('')
const searchResults = ref<SearchResult | null>(null)
const isSearchActive = ref(false)
const searchTimeout = ref<ReturnType<typeof setTimeout>>()

const { loading: searchLoading, error: searchError, run } = useApiState()

const performSearch = async (query: string) => {
  if (query.trim().length < 2) {
    searchResults.value = null
    isSearchActive.value = false
    return
  }

  try {
    isSearchActive.value = true
    const response = await run(() => apiService.searchCoins(query.trim()))
    searchResults.value = response.data
  } catch (error) {
    console.error('Search error:', error)
    searchResults.value = null
  }
}

watch(searchQuery, (newQuery) => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }

  if (newQuery.trim().length < 2) {
    searchResults.value = null
    isSearchActive.value = false
    return
  }

  searchTimeout.value = setTimeout(() => {
    performSearch(newQuery)
  }, 300)
})

const searchSuggestions = computed(() => {
  if (!searchResults.value?.coins) return []

  return searchResults.value.coins
    .filter((coin: SearchCoin) => coin.market_cap_rank !== null)
    .sort((a: SearchCoin, b: SearchCoin) => (a.market_cap_rank || 999999) - (b.market_cap_rank || 999999))
    .slice(0, 8)
})

const navigateToCoin = (coinId: string) => {
  router.push({ name: 'coin-detail', params: { id: coinId } })
  clearSearch()
}

const clearSearch = () => {
  searchQuery.value = ''
  searchResults.value = null
  isSearchActive.value = false
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }
}

const handleSearchFocus = () => {
  if (searchQuery.value.trim().length >= 2) {
    isSearchActive.value = true
  }
}

const handleSearchBlur = () => {
  setTimeout(() => {
    isSearchActive.value = false
  }, 200)
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    clearSearch()
  }
}
</script>

<template>
  <div class="crypto-search position-relative">
    <v-text-field v-model="searchQuery" @focus="handleSearchFocus" @blur="handleSearchBlur" @keydown="handleKeyDown"
      placeholder="Search cryptocurrencies..." prepend-inner-icon="mdi-magnify" variant="outlined" density="compact"
      hide-details clearable class="search-field" :loading="searchLoading" />

    <v-card
      v-if="isSearchActive && (searchSuggestions.length > 0 || searchError || (searchQuery.trim().length >= 2 && !searchLoading))"
      class="search-dropdown position-absolute" elevation="8">
      <div v-if="searchLoading" class="pa-4 text-center">
        <v-progress-circular indeterminate size="32" color="primary" class="mb-2" />
        <p class="text-body-2 text-medium-emphasis">Searching...</p>
      </div>

      <div v-else-if="searchError" class="pa-4 text-center">
        <v-icon color="error" size="32" class="mb-2">mdi-alert-circle</v-icon>
        <p class="text-body-2 text-error mb-2">Search failed</p>
        <v-btn @click="performSearch(searchQuery)" size="small" color="primary" variant="outlined">
          Try Again
        </v-btn>
      </div>

      <template v-else-if="searchSuggestions.length > 0">
        <div class="pa-2">
          <div class="text-caption text-medium-emphasis pa-2 font-weight-medium">
            Cryptocurrencies ({{ searchSuggestions.length }})
          </div>
        </div>

        <v-list density="compact" class="pa-0">
          <v-list-item v-for="coin in searchSuggestions" :key="coin.id" @click="navigateToCoin(coin.id)"
            class="search-result-item" lines="one">
            <template v-slot:prepend>
              <v-avatar size="32" class="mr-3">
                <v-img :src="coin.thumb" :alt="coin.name" />
              </v-avatar>
            </template>

            <v-list-item-title>
              <div class="d-flex align-center justify-space-between">
                <div class="d-flex align-center">
                  <span class="font-weight-medium">{{ coin.name }}</span>
                  <span class="text-medium-emphasis ml-2 text-uppercase">
                    {{ coin.symbol }}
                  </span>
                </div>
                <v-chip v-if="coin.market_cap_rank" size="x-small" variant="outlined" color="primary">
                  #{{ coin.market_cap_rank }}
                </v-chip>
              </div>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </template>

      <div v-else-if="searchQuery.trim().length >= 2" class="pa-6 text-center">
        <v-icon color="grey" size="48" class="mb-3">mdi-magnify</v-icon>
        <p class="text-body-1 font-weight-medium mb-1">No results found</p>
        <p class="text-body-2 text-medium-emphasis">
          Try searching for a different cryptocurrency name or symbol
        </p>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
.crypto-search {
  width: 100%;
  max-width: 400px;
}

.search-field {
  transition: all 0.3s ease;
}

.search-field:focus-within {
  transform: scale(1.01);
}

.search-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  max-height: 400px;
  overflow-y: auto;
  margin-top: 4px;
  border-radius: 8px;
}

.search-result-item {
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 4px;
  margin: 2px 4px;
}

.search-result-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.08);
  transform: translateX(2px);
}

/* Mobile responsiveness */
@media (max-width: 600px) {
  .crypto-search {
    max-width: 100%;
  }

  .search-dropdown {
    max-height: 300px;
  }
}

/* Custom scrollbar for search results */
.search-dropdown::-webkit-scrollbar {
  width: 6px;
}

.search-dropdown::-webkit-scrollbar-track {
  background: transparent;
}

.search-dropdown::-webkit-scrollbar-thumb {
  background: rgba(var(--v-theme-primary), 0.2);
  border-radius: 3px;
}

.search-dropdown::-webkit-scrollbar-thumb:hover {
  background: rgba(var(--v-theme-primary), 0.3);
}
</style>
