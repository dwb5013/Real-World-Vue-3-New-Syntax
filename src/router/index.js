import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/event/EventListView.vue'
import AboutView from '../views/AboutView.vue'
import EventRegister from '@/views/event/EventRegister.vue'
import EventEdit from '@/views/event/EventEdit.vue'
import EventLayout from '@/views/event/Layout.vue'
import EventDetailsView from '@/views/event/EventDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'EventList',
      component: EventListView,
      props: (route) => ({ page: parseInt(route.query.page) || 1 }),
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/event/:id',
      name: 'EventLayout',
      props: true,
      component: EventLayout,
      children: [
        {
          path: '',
          name: 'EventDetails',
          component: EventDetailsView,
        },
        {
          path: 'register',
          name: 'EventRegister',
          component: EventRegister,
        },
        {
          path: 'edit',
          name: 'EventEdit',
          component: EventEdit,
        },
      ],
    },
  ],
})

export default router
