<template>
    <v-container class="container-main pt-0 pl-0" fluid>
        <v-dialog v-model="dialog" persistent max-width="1000px">
            
                <v-card>
                    <v-card-title>
                        <span><v-icon color="white">mdi-clipboard-account-outline</v-icon>Patient Monitoring</span>
                        <v-spacer></v-spacer>
                        <v-icon color="white" @click="closeDialog()">mdi-close</v-icon>
                    </v-card-title>
                    <v-card-text>
                        <v-container fluid>
                            <v-tabs color="primary" v-model="tab">
        <v-tab>Partograph 123</v-tab>
        <v-tab href="#vitalSign">Vital Sign</v-tab>
        <v-tab href="#medicationSheet">Medication Sheet</v-tab>
        <v-tab href="#medicalAbstruct">Medical Abstruct</v-tab>
        <v-tab href="#newBornRecord">New Born Physician Record</v-tab>
      </v-tabs>
      <v-tabs-items  v-model="tab">
        <v-tab-item >
         <!-- ComponentHere  -->
        </v-tab-item>
        <v-tab-item value="vitalSign">  
            <PatientVitalSignForm 
            :case_data="case_monitor_data"
            />          
        </v-tab-item>
        <v-tab-item value="medicationSheet">  
            <PatientMedicationSheet 
            :case_data="case_monitor_data"
            />  
        </v-tab-item>
        <v-tab-item value="medicalAbstruct">  
            <PatientMedicalAbstruct 
            :case_data="case_monitor_data"
            /> 
        </v-tab-item>
        <v-tab-item value="newBornRecord">  
            <PatientNewBornRecord 
            :case_data="case_monitor_data"
            /> 
        </v-tab-item>
      </v-tabs-items>
                        </v-container>
                    </v-card-text>
                </v-card>
           
        </v-dialog>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PatientVitalSignForm from "./PatientVitalSignForm.vue"
import PatientMedicationSheet from './PatientMedicationSheet.vue'
import PatientMedicalAbstruct from './PatienMedicalAbstruct.vue'
import PatientNewBornRecord from './PatientNewBornRecord.vue'
export default {
    components:{
        PatientVitalSignForm:PatientVitalSignForm,
        PatientMedicationSheet:PatientMedicationSheet,
        PatientMedicalAbstruct:PatientMedicalAbstruct,
        PatientNewBornRecord:PatientNewBornRecord
    },
    props:{
        case_monitor_data:{
            type: Object
        },
        dialog:{
            type:Boolean
        },
        dialogSetting:{
            type: Object
        }
    },
    data: () => ({
        snackbarTimeout:3000,
        dialogBtn:false,
        tab:null,
    }),
    methods: {
         closeDialog(){
            this.$emit('closeDialog')
            // console.log("ttiggeeerrr dito")
            // this.case_monitor_data = null
        },
    },
    computed:{},
    created(){
        console.log(this.case_monitor_data,"70")
    },
    // watch:{
    //     dialog(val){
    //         if(!val){
    //             this.$refs.Insert.resetValidation()
    //         }
    //     },
    // }
}
</script>

<style>

</style>