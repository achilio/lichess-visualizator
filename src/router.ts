import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/HomePage.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomePage,
    },
  ],
})
