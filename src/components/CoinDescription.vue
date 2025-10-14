<script setup lang="ts">

interface Props {
  description: string
  name: string
}

const props = defineProps<Props>()

</script>

<template>
  <v-card elevation="2" rounded="xl" class="pa-2">
    <v-card-title class="d-flex align-center gap-2">
      <v-icon>mdi-information-outline</v-icon>
      About {{ name }}
    </v-card-title>

    <v-card-text>
      <div class="text-body-1 line-height-relaxed">
        {{ props.description }}
      </div>
    </v-card-text>
  </v-card>
</template>


