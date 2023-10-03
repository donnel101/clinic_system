<template>
    <v-container class="container-main pt-0 pl-0" fluid>
        <toolbar :toolbar="toolbar"></toolbar>
        <v-simple-table dense :height="tableHeight">
            <thead>
                <tr>
                    <th v-show="editMode" class="text-left" style="width:20px">Edit</th> 
                    <th v-show="editMode" class="text-left" style="width:20px">ID</th> 
                    <th>Type</th>
                    <th>Name</th>
                    <th>Bed No.</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(room,index) in roomData" :key="index">
                    <td v-show="editMode">
                        <v-icon color="success" @click="Edit(room)">mdi-pencil</v-icon>
                        <v-icon color="error" @click="toggleDelete(room.id)">mdi-delete</v-icon>
                    </td>
                    <td v-show="editMode">{{room.id}}</td>
                    <td>{{selectRoomType[room.room_type - 1].name}}</td>
                    <td>{{room.name}}</td>
                    <td>{{room.beds.length}}</td>
                </tr>
            </tbody>
        </v-simple-table>
        <insert-dialog 
            :room="tempRoom" 
            :dialog="insertDialog" 
            :dialogSetting="insertDialogSetting" 
            @closeDialog="insertDialog = false" 
            @toggleSave="Insert()"
        ></insert-dialog>
        <edit-dialog 
            :room="tempEditRoom" 
            :dialog="editDialog" 
            :dialogSetting="editDialogSetting" 
            @closeDialog="editDialog = false" 
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
import RoomDialog from './RoomDialog.vue'
import SnackBar from '../../includes/SnackBar.vue'
import { mapActions, mapState } from 'vuex'
export default {
    name:'PatientRegistration',
    components:{
        'toolbar':ToolbarComponent,
        'float-action':FloatAction,
        'agree-dialog':AgreeDialog,
        'insert-dialog':RoomDialog,
        'edit-dialog':RoomDialog,
        'snackbar':SnackBar,
    },
    data() {
        return {
            toolbar:{
                title:'Room Master',
                subTitle:'Register room',
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

            tempRoom:{
                room_type:null,
                name:null,
                beds:[]
            },
            tempEditRoom:{},


        }
    },
    methods:{
        ...mapActions(['getRoom']),
        closeAgree(){
            this.agree.dialog = false
        },
        toggleAgree(){
            this.Delete()
        },
        toggleInsertDialog(){
            this.tempRoom = {
                room_type:null,
                name:null,
                beds:[]
            },
            this.insertDialog = true
        },
        toggleEditMode(val){
            this.tempRoom = {
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
            this.tempEditRoom = structuredClone(data)
            this.editDialog = true
        },
        Insert(){
            
            this.loadMore = true
            axios({
                method : 'post',
                url : 'room_insert',
                data : this.tempRoom,
            })
            .then(res =>{
                console.log(res.data)
                this.snackbar.show=true
                this.snackbar.text= "Success Insert"
                this.snackbar.color="success"
                // this.$refs.Insert.resetValidation()
                this.getRoom()
                this.insertDialog = false

            }).catch(err =>{
                console.log(err)
            });
        },
        Update(){
            
            this.loadMore = true
            axios({
                method : 'post',
                url : 'room_update',
                data : this.tempEditRoom,
            })
            .then(res =>{
                console.log(res.data)
                this.snackbar.show=true
                this.snackbar.text= "Success Update"
                this.snackbar.color="success"
                // this.$refs.Insert.resetValidation()
                this.getRoom()
                this.editDialog = false

            }).catch(err =>{
                console.log(err)
            });
        },
        Delete(){
            axios({
                method : 'post',
                url : 'room_delete',
                data : {
                    id:this.tempId
                },
            })
            .then(res =>{
                this.getRoom()
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
            'roomData',
            'selectRoomType',
        ]),
    },
    watch:{
    },
    
    mounted(){
        this.getRoom()
    },
}
</script>

<style>

</style>