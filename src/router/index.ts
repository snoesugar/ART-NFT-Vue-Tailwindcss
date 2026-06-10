import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // 前台路由
    {
      path: '/',
      component: () => import('../layouts/FrontLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/front/Home.vue'),
        },
        {
          path: '/explore',
          component: () => import('../views/front/Explore.vue'),
        },
        {
          path: '/capitalization',
          component: () => import('../views/front/Capitalization.vue'),
        },
        {
          path: '/artistIntroduction/:id',
          name: 'ArtistIntroduction',
          component: () => import('@/views/front/ArtistIntroduction.vue'),
        },
        {
          path: '/filter',
          component: () => import('../views/front/Filter.vue'),
        },
        {
          path: '/artworkIntroduction/:id',
          name: 'ArtworkIntroduction',
          component: () => import('../views/front/ArtworkIntroduction.vue'),
        },
      ],
    },
    // 後台路由
    {
      path: '/admin',
      component: () => import('../layouts/AdminLayout.vue'),
      children: [
        {
          path: '', // 當網址是 /admin 時，重新導向到營運概況，或直接載入組件
          redirect: '/admin/dashboard',
        },
        {
          path: 'dashboard', // 網址：/admin/dashboard (修正：去掉開頭斜線)
          name: 'AdminDashboard',
          component: () => import('../views/admin/AdminDashboard.vue'),
        },
        {
          path: 'artworks', // 網址：/admin/artworks (修正：去掉開頭斜線)
          name: 'AdminArtworks',
          component: () => import('../views/admin/AdminArtworks.vue'),
        },
        {
          path: 'artists',
          name: 'AdminArtists',
          component: () => import('../views/admin/AdminArtists.vue'),
        },
      ],
    },
    // 獨立的登入頁
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'), // 確認檔案路徑正確
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
    },
  ],
})

export default router
