import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/ServicesPage.vue'
import ServicesPage from "../views/ServicesPage.vue";
import AccessoriesPage from "../views/AccessoriesPage.vue";
import OurProjectsPage from "../views/OurProjectsPage.vue";
import ContactPage from "../views/ContactPage.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/services', component: ServicesPage },
    { path: '/accessories', component: AccessoriesPage },
    { path: '/projects', component: OurProjectsPage },
    { path: '/contact', component: ContactPage },
    {
        path: '/services/:id/:slug',
        name: 'ServiceInfo',
        component: () => import('../views/ServiceInfo.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    }
})

export default router
