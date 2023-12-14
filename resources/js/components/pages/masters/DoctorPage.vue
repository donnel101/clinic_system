<template>
    <v-container class="container-main pt-0 pl-0" fluid>
        <toolbar :toolbar="toolbar"></toolbar>
        <v-simple-table dense :height="tableHeight">
            <thead>
                <tr>
                    <th v-show="editMode" class="text-left" style="width:20px">Edit</th> 
                    <th v-show="editMode" class="text-left" style="width:20px">ID</th> 
                    <th>Name</th>
                    <th>Position</th>
                </tr>
            </thead>    
            <tbody>
                <tr v-for="(doctor,index) in doctorData" :key="index">
                    <td v-show="editMode">
                        <v-icon color="success" @click="Edit(doctor)">mdi-pencil</v-icon>
                        <v-icon color="error" @click="toggleDelete(doctor.id)">mdi-delete</v-icon>
                    </td>
                    <td v-show="editMode">{{doctor.id}}</td>
                    <td>{{doctor.name}}</td>
                    <td>{{doctor.position}}</td>
                </tr>
            </tbody>
        </v-simple-table>
        <v-dialog v-model="insertDialog" persistent max-width="400">
            <v-form  id="Insert" ref="Insert" @submit.prevent="Insert" enctype="multipart/form-data">
                <v-card>
                    <v-card-title>
                        <span>Add Doctor</span>
                        <v-spacer></v-spacer>
                        <v-icon color="white" @click="insertDialog = false">mdi-close</v-icon>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Name"
                                        v-model="tempName"
                                        class="required uppercase"
                                        dense
                                        :rules="rules.required"
                                        persistent-placeholder
                                        outlined
                                        name="name"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-autocomplete
                                        label="Position"
                                        v-model="position"
                                        dense
                                        :items="['Midwife','Doctor']"
                                        :rules="rules.required"
                                        persistent-placeholder
                                        outlined
                                        name="position"
                                    ></v-autocomplete>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text :disabled="dialogBtn" @click="insertDialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" text :disabled="dialogBtn" @click="Insert()">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
        
        <v-dialog v-model="editDialog" persistent max-width="400">
            <v-form  id="Update" ref="Update" @submit.prevent="Update" enctype="multipart/form-data">
                <v-card>
                    <v-card-title>
                        <span>Update Doctor</span>
                        <v-spacer></v-spacer>
                        <v-icon color="white" @click="editDialog = false">mdi-close</v-icon>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Name"
                                        v-model="tempName"
                                        class="required uppercase"
                                        dense
                                        :rules="rules.required"
                                        persistent-placeholder
                                        outlined
                                        name="name"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-autocomplete
                                        label="Position"
                                        v-model="position"
                                        class="required uppercase"
                                        dense
                                        :items="['Midwife','Doctor']"
                                        item-text="name"
                                        item-value="id"
                                        :rules="rules.required"
                                        persistent-placeholder
                                        outlined
                                        name="position"
                                    ></v-autocomplete>
                                </v-col>
                            </v-row>
                            <input type="hidden" :value="tempId" name="id">
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text :disabled="dialogBtn" @click="editDialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" text :disabled="dialogBtn" @click="Update()">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>

        <agree-dialog :agree="agree" @closeAgree="closeAgree()" @toggleAgree="toggleAgree()"></agree-dialog>
        <snackbar :snackbar="snackbar"></snackbar>
        <!-- NOTE : Float Action -->
        <float-action 
        @toggleInsertDialog="toggleInsertDialog($event)"
        @toggleDelete="toggleDelete"
        @toggleEditMode="toggleEditMode(editMode)"
        :floatbtn="floatbtn"
        :editMode="editMode"
        :selectedRowsCnt="selectedRows.length"
        ></float-action>
    </v-container>
</template>

<script>
import ToolbarComponent from '../../includes/Toolbar'
import FloatAction from '../../includes/FloatAction.vue'
import AgreeDialog from '../../includes/AgreeDialog.vue'
import SnackBar from '../../includes/SnackBar.vue'
import { mapActions, mapState } from 'vuex'
export default {
    name:'PatientRegistration',
    components:{
        'toolbar':ToolbarComponent,
        'float-action':FloatAction,
        'agree-dialog':AgreeDialog,
        'snackbar':SnackBar,
    },
    data() {
        return {
            toolbar:{
                title:'Doctor Master',
                subTitle:'Register doctor',
            },
            floatbtn:{
                add:true,
                edit:true,
                delete:true,
            },
            agree:{
                dialog:false,
                title:'Delete',
                text:'Are you sure you want to delete',
            },
            snackbar:{
                show:false,
                color:'success',
                text:null,
            },
            tableHeight:window.innerHeight - 180,
            insertDialog:false,
            editDialog:false,
            deleteDialog:false,
            editMode:false,
            selectedRows:[],
            tempName:null,
            tempId:null,
            position:null,
            dialogBtn:false,


        }
    },
    methods:{
        ...mapActions(['getDoctor']),
        closeAgree(){
            this.agree.dialog = false
        },
        toggleAgree(){
            this.Delete()
        },
        toggleInsertDialog(){
            this.insertDialog = true
        },
        toggleEditMode(val){
            this.editMode = !this.editMode
        },
        toggleDelete(id){
            this.tempId = id
            this.agree.dialog = true
        },
        Edit(data){
            console.log(data)
            this.tempName = data.name
            this.tempId = data.id
            this.position= data.position
            this.editDialog = true
        },
        Insert(){
            
            if(this.$refs.Insert.validate()){
                this.loadMore = true
                var myform = document.getElementById('Insert');
                var formdata = new FormData(myform);
                axios({
                    method : 'post',
                    url : 'doctor_insert',
                    data : formdata,
                })
                .then(res =>{
                    console.log(res.data)
                    this.snackbar.show=true
                    this.snackbar.text= "Success Insert"
                    this.snackbar.color="success"
                    // this.$refs.Insert.resetValidation()
                    this.getDoctor()
                    this.insertDialog = false

                }).catch(err =>{
                    console.log(err)
                });
            }
        },
        Update(){
            
            if(this.$refs.Update.validate()){
                this.loadMore = true
                var myform = document.getElementById('Update');
                var formdata = new FormData(myform);
                axios({
                    method : 'post',
                    url : 'doctor_update',
                    data : formdata,
                })
                .then(res =>{
                    console.log(res.data)
                    
                    this.snackbar.show=true
                    this.snackbar.text= "Success Update"
                    this.snackbar.color="success"
                    // this.$refs.Insert.resetValidation()
                    this.getDoctor()
                    this.editDialog = false

                }).catch(err =>{
                    console.log(err)
                });
            }
        },
        Delete(){
            axios({
                method : 'post',
                url : 'doctor_delete',
                data : {
                    id:this.tempId
                },
            })
            .then(res =>{
                this.getDoctor()
                this.snackbar.show=true
                this.snackbar.text= "Success Delete"
                this.snackbar.color="success"
                this.closeAgree()
            }).catch(err =>{
                console.log(err)
            });
        },
    },
    computed:{
        ...mapState([
            'rules',
            'doctorData',
        ]),
    },
    watch:{
        insertDialog(val){
            if(!val){
                this.tempName = null
                this.tempId = null
                this.position = null
                this.$refs.Insert.resetValidation()
            }
        },
        editDialog(val){
            if(!val){
                this.tempName = null
                this.tempId = null
                this.position = null
                this.$refs.Update.resetValidation()
            }
        }
    },
    
    mounted(){
        this.getDoctor()
    },
}
</script>

<style>

</style>