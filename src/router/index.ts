import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/coin/:id',
      name: 'coin-detail',
      component: () => import('@/views/CoinDetailView.vue'),
      props: true,
    },
  ],
})

export default router
