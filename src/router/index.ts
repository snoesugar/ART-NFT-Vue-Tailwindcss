import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/Layout.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/Front/Home.vue'),
        },
        {
          path: '/explore',
          component: () => import('../views/Front/Explore.vue'),
        },
        {
          path: '/capitalization',
          component: () => import('../views/Front/Capitalization.vue'),
        },
        {
          path: '/artistIntroduction/:id',
          name: 'ArtistIntroduction',
          component: () => import('@/views/Front/ArtistIntroduction.vue'),
        },
        {
          path: '/filter',
          component: () => import('../views/Front/Filter.vue'),
        },
        {
          path: '/artworkIntroduction/:id',
          name: 'ArtworkIntroduction',
          component: () => import('../views/Front/ArtworkIntroduction.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
    },
  ],
})

export default router
