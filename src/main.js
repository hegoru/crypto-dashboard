import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './HomeView.vue'
import FngView from './FngView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/fng', component: FngView }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

createApp(App)
  .use(router)
  .mount('#app')
