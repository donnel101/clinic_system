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
                        <v-container>
                            <v-tabs color="primary">
        <v-tab>Partograph</v-tab>
        <v-tab>Vital Sign</v-tab>
        <v-tab>Medication Sheet</v-tab>
        <v-tab>Medical Abstruct</v-tab>
      </v-tabs>
      <v-tabs-items>
        <v-tab-item >
         <!-- ComponentHere  -->
        </v-tab-item>
        <v-tab-item>
                   <!-- ComponentHere  -->

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
export default {
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
    }),
    methods: {
         closeDialog(){
            this.$emit('closeDialog')
        },
    },
    computed:{},

}
</script>

<style>

</style>