<script setup lang="ts">
import { computed } from 'vue'
import type { Links } from '@/types/CoinDetail'

interface Props {
  links: Links
  name: string
}

const props = defineProps<Props>()

const getFirstValidLink = (links: (string | null)[] | undefined): string | null => {
  if (!links) return null
  return links.find(link => link && link.trim() !== '') || null
}

const socialLinks = computed(() => [
  {
    label: 'Website',
    url: getFirstValidLink(props.links.homepage),
    icon: 'mdi-web',
    color: 'primary',
  },
  {
    label: 'Whitepaper',
    url: props.links.whitepaper,
    icon: 'mdi-file-document-outline',
    color: 'info',
  },
  {
    label: 'Twitter',
    url: props.links.twitter_screen_name
      ? `https://twitter.com/${props.links.twitter_screen_name}`
      : null,
    icon: 'mdi-twitter',
    color: 'blue',
  },
  {
    label: 'Facebook',
    url: props.links.facebook_username
      ? `https://facebook.com/${props.links.facebook_username}`
      : null,
    icon: 'mdi-facebook',
    color: 'blue-darken-2',
  },
  {
    label: 'Reddit',
    url: props.links.subreddit_url,
    icon: 'mdi-reddit',
    color: 'orange',
  },
  {
    label: 'Telegram',
    url: props.links.telegram_channel_identifier
      ? `https://t.me/${props.links.telegram_channel_identifier}`
      : null,
    icon: 'mdi-telegram',
    color: 'blue-lighten-1',
  },
].filter(link => link.url))

const blockchainExplorers = computed(() => {
  if (!props.links.blockchain_site) return []

  return props.links.blockchain_site
    .filter(site => site && site.trim() !== '')
    .map((site) => {
      const domain = new URL(site!).hostname.replace('www.', '')
      return {
        label: domain.charAt(0).toUpperCase() + domain.slice(1),
        url: site!,
        icon: 'mdi-cube-outline',
        color: 'purple',
      }
    })
    .slice(0, 3)
})

const repositories = computed(() => {
  const repos = []

  if (props.links.repos_url?.github?.length) {
    repos.push({
      label: 'GitHub',
      url: props.links.repos_url.github[0],
      icon: 'mdi-github',
      color: 'grey-darken-3',
    })
  }

  if (props.links.repos_url?.bitbucket?.length) {
    repos.push({
      label: 'Bitbucket',
      url: props.links.repos_url.bitbucket[0],
      icon: 'mdi-bitbucket',
      color: 'blue',
    })
  }

  return repos.filter(repo => repo.url)
})

const openLink = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <v-card elevation="2" rounded="xl" class="pa-2">
    <v-card-title class="d-flex align-center gap-2">
      <v-icon>mdi-link-variant</v-icon>
      Links & Resources
    </v-card-title>

    <v-card-text>
      <div v-if="socialLinks.length" class="mb-6">
        <div class="text-subtitle-2 mb-3 text-medium-emphasis">Social Media & Official</div>
        <div class="d-flex flex-wrap gap-2">
          <v-btn
            v-for="link in socialLinks"
            :key="link.label"
            @click="openLink(link.url!)"
            variant="outlined"
            size="small"
            :color="link.color"
            :prepend-icon="link.icon"
          >
            {{ link.label }}
          </v-btn>
        </div>
      </div>

      <div v-if="blockchainExplorers.length" class="mb-6">
        <div class="text-subtitle-2 mb-3 text-medium-emphasis">Blockchain Explorers</div>
        <div class="d-flex flex-wrap gap-2">
          <v-btn
            v-for="explorer in blockchainExplorers"
            :key="explorer.label"
            @click="openLink(explorer.url)"
            variant="outlined"
            size="small"
            :color="explorer.color"
            :prepend-icon="explorer.icon"
          >
            {{ explorer.label }}
          </v-btn>
        </div>
      </div>

      <div v-if="repositories.length">
        <div class="text-subtitle-2 mb-3 text-medium-emphasis">Source Code</div>
        <div class="d-flex flex-wrap gap-2">
          <v-btn
            v-for="repo in repositories"
            :key="repo.label"
            @click="openLink(repo.url!)"
            variant="outlined"
            size="small"
            :color="repo.color"
            :prepend-icon="repo.icon"
          >
            {{ repo.label }}
          </v-btn>
        </div>
      </div>

      <div v-if="!socialLinks.length && !blockchainExplorers.length && !repositories.length" class="text-center pa-4">
        <v-icon size="48" color="grey" class="mb-2">mdi-link-off</v-icon>
        <p class="text-body-2 text-medium-emphasis">No external links available</p>
      </div>
    </v-card-text>
  </v-card>
</template>
