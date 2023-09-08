import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import Home from './components/Home'
import Hello from './components/Hello'
import Test from './components/Test'
import Registration from './components/pages/Registration.vue'
import Login from './auth/Login'
import LoginOption from './auth/LoginOption'
import RequestDocument from './auth/RequestDocument'

import PatientRegistrationPage from './components/pages/patient_registration/PatientRegistrationPage.vue'

export default new VueRouter({
    mode: 'history',
    base:'/clinic_system/',
    routes: [
        // NOTE: LOGIN
        
        {
            path: '/login',
            name: 'login',
            component : Login
        },
        {
            path: '/',
            name: 'login_option',
            component : LoginOption
        },
        {
            path: '/request_document',
            name: 'request_document',
            component : RequestDocument
        },

        // NOTE: Authenticated
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
        {
            path: '/patient_registration',
            name: 'patient_registration',
            component : PatientRegistrationPage
        },

      
    ],
});