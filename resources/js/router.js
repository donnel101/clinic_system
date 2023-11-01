import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import Home from './components/Home'
import Hello from './components/Hello'
import Test from './components/Test'
import Registration from './components/pages/account_registration/Registration.vue'
import Login from './auth/Login'
import LoginOption from './auth/LoginOption'
import RequestDocument from './auth/RequestDocument'

import PatientRegistrationPage from './components/pages/patient_registration/PatientRegistrationPage.vue'
import ReligionPage from './components/pages/masters/ReligionPage.vue'
import DoctorPage from './components/pages/masters/DoctorPage.vue'
import RoomPage from './components/pages/masters/RoomPage.vue'
import AdmissionPage from './components/pages/admission/AdmissionPage.vue'
import PatientMonitoring from './components/pages/patient_monitoring/PatientMonitoringPage.vue'
import ForgotPassword from './components/pages/forgot_password/ForgotPassword.vue'
import ChangePassword from './components/pages/forgot_password/changePassword.vue'

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
        {
            path: '/admission',
            name: 'admission',
            component : AdmissionPage
        },

        // Master

        {
            path: '/religion',
            name: 'religion',
            component : ReligionPage
        },
        {
            path: '/doctor',
            name: 'doctor',
            component : DoctorPage
        },
        {
            path: '/room',
            name: 'room',
            component : RoomPage
        },
        {
            path: '/patient_monitoring',
            name: 'patient_monitoring',
            component : PatientMonitoring
        },
        {
            path: '/forgot_password',
            name: 'forgot_password',
            component : ForgotPassword
        },
        {
            path: '/change_password',
            name: 'change_password',
            component : ChangePassword
        },


      
    ],
});