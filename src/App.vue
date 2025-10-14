<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';


</script>



<template>
  <div class="bg-gray-200">
    <AppHeader />
    <div class="max-w-[1440px] mx-auto pa-2">
      <router-view />
    </div>
  </div>

</template>
