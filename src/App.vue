<script setup lang="ts">
import { useDisplay } from 'vuetify'
import AppHeader from './components/AppHeader.vue'

const { mobile } = useDisplay()
</script>

<template>
  <v-app>
    <v-app-bar
      density="comfortable"
      :height="mobile ? 120 : 80"
      elevation="2"
    >
      <AppHeader />
    </v-app-bar>
    <v-main max-width="1440" class="mx-auto" >
        <router-view v-slot="{ Component }">
          <v-fade-transition hide-on-leave>
            <component :is="Component" />
          </v-fade-transition>
        </router-view>
    </v-main>
  </v-app>
</template>
