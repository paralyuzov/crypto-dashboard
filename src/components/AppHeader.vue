<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import CryptoSearch from './CryptoSearch.vue'

const router = useRouter()
const { mobile } = useDisplay()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div v-if="mobile" class="pa-3" style="width: 100%; min-height: 80px">
    <div class="d-flex align-center justify-center mb-3">
      <h1
        @click="goHome"
        class="text-h5 font-weight-bold text-black cursor-pointer"
        style="transition: all 0.2s ease"
      >
        CryptoDashboard
      </h1>
    </div>

    <div class="d-flex justify-center" style="position: relative; z-index: 1">
      <div style="width: 100%; max-width: 350px">
        <CryptoSearch />
      </div>
    </div>
  </div>

  <div v-else class="d-flex align-center pa-3" style="width: 100%; min-height: 70px">
    <div class="flex-grow-0" style="min-width: 200px">
      <h1
        @click="goHome"
        class="text-h4 font-weight-bold text-black cursor-pointer"
        style="transition: all 0.2s ease"
      >
        CryptoDashboard
      </h1>
    </div>

    <div class="flex-grow-1 d-flex justify-center" style="position: relative; z-index: 1">
      <div style="max-width: 400px; width: 100%">
        <CryptoSearch />
      </div>
    </div>

    <div class="flex-grow-0" style="min-width: 200px">
    </div>
  </div>
</template>
