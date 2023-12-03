<template>
    <v-container class="container-main pt-0 pl-0" fluid>
        <toolbar :toolbar="toolbar"></toolbar>
        <v-simple-table dense :height="tableHeight">
            <thead>
                <tr>
                    <th v-show="editMode" class="text-left" style="width:20px">Edit</th> 
                    <th v-show="editMode" class="text-left" style="width:20px">ID</th> 
                    <th>Case No</th>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Room</th>
                    <th>Bed</th>
                    <th>Relationship</th>
                    <th>Guardian</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(data,index) in caseData" :key="index">
                    <td v-show="editMode">
                        <v-icon color="success" @click="Edit(data)">mdi-pencil</v-icon>
                        <v-icon color="error" @click="toggleDelete(data.id)">mdi-delete</v-icon>
                    </td>
                    <td v-show="editMode">{{data.id}}</td>
                    <td>{{data.case_no}}</td>
                    <td>{{data.patient_name}}</td>
                    <td>{{data.doctor_name}}</td>
                    <td>{{data.room_name}}</td>
                    <td>{{data.bed_name}}</td>
                    <td>{{data.relationship}}</td>
                    <td>{{data.husband_name}}</td>
                </tr>
            </tbody>
        </v-simple-table>
        <insert-dialog 
            :data="tempData" 
            :dialog="insertDialog" 
            :dialogSetting="insertDialogSetting" 
            @closeDialog="tempData = {};insertDialog = false" 
            @toggleSave="Insert()"
        ></insert-dialog>
        <edit-dialog 
            :data="tempEditData" 
            :dialog="editDialog" 
            :dialogSetting="editDialogSetting" 
            @closeDialog="tempEditData = {};editDialog = false" 
            @toggleSave="Update()"
        ></edit-dialog>

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
import AdmissionDialog from './AdmissionDialog.vue'
import SnackBar from '../../includes/SnackBar.vue'
import { mapActions, mapState } from 'vuex'
export default {
    name:'PatientRegistration',
    components:{
        'toolbar':ToolbarComponent,
        'float-action':FloatAction,
        'agree-dialog':AgreeDialog,
        'insert-dialog':AdmissionDialog,
        'edit-dialog':AdmissionDialog,
        'snackbar':SnackBar,
    },
    data() {
        return {
            toolbar:{
                title:'Admission',
                subTitle:'Register Case',
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
            insertDialogSetting:{
                title:'Insert Room Info',
                submitBtn:'Save'
            },
            editDialogSetting:{
                title:'Update Patient Info',
                submitBtn:'Update'
            },
            tableHeight:window.innerHeight - 180,
            insertDialog:false,
            editDialog:false,
            deleteDialog:false,
            editMode:false,
            selectedRows:[],
            tempName:null,
            tempId:null,
            dialogBtn:false,

            tempData:{
                case_no:null,
                patient_id:null,
                doctor_id:null,
                room_id:null,
                bed_name:null,
            },
            tempEditData:{},


        }
    },
    methods:{
        ...mapActions(['getCase']),
        closeAgree(){
            this.agree.dialog = false
        },
        toggleAgree(){
            this.Delete()
        },
        toggleInsertDialog(){
            this.tempData = {},
            this.insertDialog = true
        },
        toggleEditMode(val){
            this.tempData = {
                room_type:null,
                name:null,
                beds:[]
            },
            this.editMode = !this.editMode
        },
        toggleDelete(id){
            this.tempId = id
            this.agree.dialog = true
        },
        Edit(data){
            console.log(data)
            this.tempEditData = structuredClone(data)
            this.editDialog = true
        },
        Insert(){
            
            this.loadMore = true
            axios({
                method : 'post',
                url : 'case_insert',
                data : this.tempData,
            })
            .then(res =>{
                console.log(res.data)
                if(res.data == 'success'){
                    this.snackbar.show=true
                    this.snackbar.text= "Success Insert"
                    this.snackbar.color="success"
                    // this.$refs.Insert.resetValidation()
                    this.getCase()
                    this.insertDialog = false
                }else if(res.data == 1){
                    this.snackbar.show=true
                    this.snackbar.text= "Case Number Already Exist"
                    this.snackbar.color="error"
                }
                

            }).catch(err =>{
                console.log(err)
            });
        },
        Update(){
            
            this.loadMore = true
            axios({
                method : 'post',
                url : 'case_update',
                data : this.tempEditData,
            })
            .then(res =>{
                console.log(res.data)
                this.snackbar.show=true
                this.snackbar.text= "Success Update"
                this.snackbar.color="success"
                // this.$refs.Insert.resetValidation()
                this.getCase()
                this.editDialog = false

            }).catch(err =>{
                console.log(err)
            });
        },
        Delete(){
            axios({
                method : 'post',
                url : 'case_delete',
                data : {
                    id:this.tempId
                },
            })
            .then(res =>{
                this.getCase()
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
            'caseData',
            'selectRoomType',
        ]),
    },
    watch:{
    },
    
    mounted(){
        this.getCase()
    },
}
</script>

<style>

</style>