<script setup lang="ts">
import { useRouter } from 'vue-router'
import CryptoSearch from './CryptoSearch.vue'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <header class="app-header bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 mb-6 pa-4">
    <div class="d-flex justify-space-between align-center">
      <div class="d-flex align-center">
        <h1 @click="goHome" class="text-h4 font-weight-bold text-primary cursor-pointer"
          style="transition: all 0.2s ease;">
          CryptoDashboard
        </h1>
      </div>

      <div class="flex-grow-1 d-flex justify-center mx-4">
        <CryptoSearch />
      </div>

      <div class="d-flex align-center gap-2">
        <v-btn @click="goHome" icon variant="text" size="small" color="primary">
          <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn icon variant="text" size="small" color="primary">
          <v-icon>mdi-heart-outline</v-icon>
        </v-btn>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
}

.cursor-pointer {
  cursor: pointer;
}

.cursor-pointer:hover {
  opacity: 0.8;
  transform: scale(1.02);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .d-flex.justify-space-between {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .flex-grow-1 {
    width: 100%;
    max-width: none;
  }

  .mx-4 {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
}

@media (max-width: 480px) {
  .pa-4 {
    padding: 12px !important;
  }

  .text-h4 {
    font-size: 1.25rem !important;
  }
}
</style>
