import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import Home from './components/Home'
import Hello from './components/Hello'
import Test from './components/Test'
import Registration from './components/pages/Registration.vue'

export default new VueRouter({
    mode: 'history',
    base:'/clinic_system/',
    routes: [
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/hello',
            name: 'hello',
            component: Hello
        },

        {
            path: '/test',
            name: 'test',
            component : Test
        },
        {
            path: '/registration',
            name: 'registration',
            component : Registration
        },

      
    ],
});