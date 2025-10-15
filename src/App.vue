<script setup lang="ts">
import { useDisplay } from 'vuetify'
import AppHeader from './components/AppHeader.vue'

const { mobile } = useDisplay()
</script>

<template>
  <v-app>
    <v-app-bar density="comfortable" :height="mobile ? 120 : 80" elevation="2" class="px-0">
      <AppHeader />
    </v-app-bar>
    <v-main>
      <v-container fluid :class="{ 'pa-0': mobile, 'pa-4': !mobile }" style="max-width: 1440px">
        <router-view v-slot="{ Component }">
          <v-fade-transition hide-on-leave>
            <component :is="Component" />
          </v-fade-transition>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
