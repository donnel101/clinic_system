import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import province from './province.json'
import municipality from './municipality.json'
import barangay from './barangay.json'

Vue.use(Vuex)
const persistedData = new createPersistedState({
    key:'clinic_system_vuex',
    storage: localStorage,
    reducer : state => ({
        loggedInUser : state.loggedInUser,
        systemData : state.systemData,
    })
})

export default new Vuex.Store({
    state:{
        loggedInUser : null,
        systemData:null,
        province:province,
        municipality:municipality,
        barangay:barangay,
        allUsers : [],
        rules: {
            required: [(v) => !!v || "Field is required"],
            email: [
                (v) =>
                    !v ||
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    "E-mail must be valid",
            ],
            password: [
                (v) => !!v || "Field is required",
                // (v) => !v || /[0-9]/.test(v) || "Must contain number",
                // (v) => !v || /[a-zA-Z]/.test(v) || "Must contain letter",
                // v => !v || /[@$!%*?&]/.test(v) || 'Must contain symbol',
                (v) =>
                    (v || "").length >= 8 ||
                    "Must contain atlest 8 characters.",
            ],
            hex: [
                (v) =>
                    !v || /[0-9A-Fa-f]{6}/.test(v) || "Must be a hex value",
            ],
            confirmpassword(temp, actual) {
                return [(v) => temp === actual || "Password must match"];
            },
            uniqueRole(list) {
                return [
                    (v) => !!v || "Field is required",
                    (v) => 
                        // console.log(typeof _.find(list, {name : v}) === 'object', list, v)
                        typeof _.find(list, {name : v}) === 'undefined' ||
                        "Role is already exists.",
                ];
            },
            uniquePermission(list) {
                return [
                    (v) => !!v || "Field is required",
                    (v) => 
                        // console.log(typeof _.find(list, {name : v}) === 'object', list, v)
                        typeof _.find(list, {name : v}) === 'undefined' ||
                        "Permission is already exists.",
                ];
            },
            array: [(v) => !v.length == 0 || "Field is required"],
            higher_number(min, max) {
                return [
                    (v) => !!v || "Field is required",
                    (v) => v > min || "Must Higher",
                    (v) => v <= max || "Too much",
                ];
            },
            numberRule: [
                // (v) => {
                //     if (!isNaN(v) && v >= 0 && v <= 99) return true;
                //     return "Field is required";
                // },
                (v) => !!v || "Field is required",
                (v) => (!isNaN(v) && v >= 1 && v <= 99) || "Must be between 1-99",
            ],
            contactNo: [
                (v) => !!v || "Field is required",
                (v) => !v || /[0-9]{11}/.test(v) || "Must be a 11 number",
            ],
        },
        provinceMaster:[],
        religionData:[],
        doctorData:[],
        selectSex:[
            {name:'Female',id:1},
            {name:'Male',id:2}
        ],
        selectCivil:[
            {name:'Single',id:1},
            {name:'Married',id:2},
            {name:'Widow',id:3}
        ],
        selectRoomType:[
            {id:1,name:'Private'},
            {id:2,name:'Ward'}
        ],
        patientData:[],
        roomData:[],
        caseData:[],
        case_VitalSign:[],
        case_MedicalSheet:[],
    },

    actions:{
        login({commit}){
            axios({
                method : "GET",
                url : 'get_user',
            })
            .then( response => {
                commit('login', response.data);
            } )
        },

        logout(context){
            context.commit('logout');
        },

        getUsers({commit}){
            axios({
                method : "GET",
                url : 'get_users',
            })
            .then( response => {
                commit('getUsers', response.data);
            } )
        },
        getSystemData({commit}){
            
            axios({
                method : 'get',
                url : 'get_system_data'
            })
            .then(res =>{
                commit('getSystemData',res.data);
            }).catch(err =>{
                console.log(err)
            });
        },
        getProvince({commit}){
            
            axios({
                method : 'get',
                url : 'get_province'
            })
            .then(res =>{
                commit('getProvince',res.data);
            }).catch(err =>{
                console.log(err)
            });
        },
        getReligion({commit}){
            axios({
                method : 'get',
                url : 'get_religion'
            })
            .then(res =>{
                commit('getReligion',res.data);
            }).catch(err =>{
                console.log(err)
            });
        },
        getDoctor({commit}){
            axios({
                method : 'get',
                url : 'get_doctor'
            })
            .then(res =>{
                commit('getDoctor',res.data);
            }).catch(err =>{
                console.log(err)
            });
        },
        getPatient({commit}){
            axios({
                method : 'get',
                url : 'get_patient'
            })
            .then(res =>{
                commit('getPatient',res.data);
            }).catch(err =>{
                console.log(err)
            });
        },
        getRoom({commit}){
            axios({
                method : 'get',
                url : 'get_room'
            })
            .then(res =>{
                commit('getRoom',res.data);
            }).catch(err =>{
                console.log(err)
            });
        },
        getCase({commit}){
            axios({
                method : 'get',
                url : 'get_case'
            })
            .then(res =>{
                commit('getCase',res.data);
                console.log(res.data)
            }).catch(err =>{
                console.log(err)
            });
        },
        getVitalSign({commit}){
            axios({
                method : 'get',
                url : 'vital_sign'
            })
            .then(res =>{
                commit('getVitalSign',res.data);
                console.log(res.data)
            }).catch(err =>{
                console.log(err)
            });
        },
        getMedicalSheet({commit}){
            axios({
                method : 'get',
                url : 'medication_sheet'
            })
            .then(res =>{
                commit('getMedicalSheet',res.data);
                console.log(res.data)
            }).catch(err =>{
                console.log(err)
            });
        },
    },

    mutations:{
        login(state, payload){
            state.loggedInUser = payload
            // window.location.href='/';
            // window.location.reload()
        },

        logout(state){
            state.loggedInUser = {}
            state.isLoggedin = false;
        },

        getUsers(state, data){
            console.log('hehaw',data)
            state.allUsers = data
        },
        getSystemData(state,payload){
            state.systemData = payload
        },
        getProvince(state,payload){
            state.provinceMaster = payload
        },
        getReligion(state,payload){
            state.religionData = payload
        },
        getDoctor(state,payload){
            state.doctorData = payload
        },
        getPatient(state,payload){
            state.patientData = payload
        },
        getRoom(state,payload){
            state.roomData = payload
        },
        getCase(state,payload){
            state.caseData = payload
        },
        getVitalSign(state,payload){
            state.case_VitalSign = payload
        },
        getMedicalSheet(state,payload){
            state.case_MedicalSheet = payload
        }
    },
    getters:{},
    plugins: [persistedData]
});