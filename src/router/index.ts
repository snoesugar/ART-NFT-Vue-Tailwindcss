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
          path: '/artistIntroduction/:id',
          name: 'ArtistIntroduction',
          component: () => import('@/views/ArtistIntroduction.vue'),
        },
        {
          path: '/filter',
          component: () => import('../views/Filter.vue'),
        },
        {
          path: '/artworkIntroduction/:id',
          name: 'ArtworkIntroduction',
          component: () => import('../views/ArtworkIntroduction.vue'),
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
