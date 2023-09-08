require('./bootstrap');
require('./dialog_movable')
import Vue from 'vue'
import Vuetify from 'vuetify'
import Router from './router'
import store from './store'
import App from './template/App';
import Login from './template/LoginApp';
Vue.use(Vuetify)

new Vue({
    el: '#app',
    store,
    router:Router,
    vuetify: new Vuetify(),
    components : {
        App,
        Login
    }
    // render: h=>h(App)
});
