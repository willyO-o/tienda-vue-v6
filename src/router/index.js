import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/modules/public/views/PublicLayout.vue'),
      children: [
        {
          path:'',
          name: 'Inicio',
          component: () => import('@/modules/public/views/Inicio.vue')
        },
        {
          path:'/tienda',
          name:'Tienda',
          component:  () => import('@/modules/public/views/Tienda.vue')
        }
        

      ]
    },


  ],
})

export default router
