import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/modules/public/views/PublicLayout.vue'),
      children: [
        {
          path: '',
          name: 'Inicio',
          component: () => import('@/modules/public/views/Inicio.vue')
        },
        {
          path: '/tienda',
          name: 'Tienda',
          component: () => import('@/modules/public/views/Tienda.vue')
        },
        {
          path: '/tienda/producto/:id',
          name: 'DetalleProducto',
          component: () => import('@/modules/public/views/DetalleProducto.vue')
        },
        {
          path: '/carrito',
          name: 'Carrito',
          component: () => import('@/modules/public/views/Carrito.vue')
        },
        {
          path: '/contacto',
          name: 'Contacto',
          component: () => import('@/modules/public/views/Contacto.vue')
        },
        {
          path: '/login',
          name: 'Login',
          component: () => import('@/modules/public/views/Login.vue')

        }


      ]
    },


  ],
})

export default router
