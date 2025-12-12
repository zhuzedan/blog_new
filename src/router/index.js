import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Article from '../views/Article.vue'
import About from '../views/About.vue'
import Moments from '../views/Moments.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: Article
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/moments',
    name: 'Moments',
    component: Moments
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
