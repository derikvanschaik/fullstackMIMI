// vue app 
import { createApp } from 'vue'
import App from './App.vue'
// vue router 
import {createWebHistory, createRouter} from 'vue-router'; 
// import components 
import MindmapList from './components/MindmapList';
import Mindmap from './components/Mindmap'; 

// 2. Define some routes

const routes = [
  { path: '/', component: MindmapList, props:{url: 'http://localhost:3000/'}},
  {path: '/:mindmap', component: Mindmap } 
]

const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

const app = createApp(App)

app.use(router)

app.mount('#app')



