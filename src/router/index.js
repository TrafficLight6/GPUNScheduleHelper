import { createRouter, createWebHistory } from 'vue-router'
import Opening from '../pages/opening.vue'
import Bar from '../pages/bar.vue'
import Line from '../pages/main/line.vue'
import Schedule from '../pages/main/schedule.vue'
import Me from '../pages/main/me.vue'
const routes = [
  {
    path: '/',
    name: 'opening',
    component: Opening,
  },
  {
    path: '/main',
    name: 'bar',
    component: Bar,
    children: [
      {
        path: 'line',
        name: 'line',
        component: Line,
      },
      {
        path: 'schedule',
        name: 'schedule',
        component: Schedule,
      },
      {
        path: 'me',
        name: 'me',
        component: Me,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
