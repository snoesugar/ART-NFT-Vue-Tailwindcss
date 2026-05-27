import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/Layout.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/Home.vue'),
        },
        {
          path: '/explore',
          component: () => import('../views/Explore.vue'),
        },
        {
          path: '/capitalization',
          component: () => import('../views/Capitalization.vue'),
        },
        {
          path: '/artistIntroduction',
          component: () => import('../views/ArtistIntroduction.vue'),
        },
        {
          path: '/filter',
          component: () => import('../views/Filter.vue'),
        },
      ],
    },
  ],
})

export default router
