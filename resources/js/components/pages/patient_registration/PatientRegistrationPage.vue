<template>
    <v-container class="container-main pt-0 pl-0" fluid>
        <toolbar :toolbar="toolbar"></toolbar>
        <v-simple-table dense :height="tableHeight">
            <thead>
                <tr>
                    <th v-show="editMode" class="text-left" style="width:20px">Edit</th> 
                    <th v-show="editMode" class="text-left" style="width:20px">ID</th> 
                    <th>Name</th>
                    <th>Username</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in registerData" :key="index">
                    <td v-show="editMode">
                        <v-icon color="success" @click="Edit(item)">mdi-pencil</v-icon>
                        <v-icon color="error" @click="toggleDelete(item.id)">mdi-delete</v-icon>
                    </td>
                    <td v-show="editMode">{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.username}}</td>
                </tr>
            </tbody>
        </v-simple-table>

        <v-overlay :value="loadMore" overlay>
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <!-- NOTE: insert Dialog -->
        <v-dialog v-model="insertDialog" persistent max-width="800px">
            <v-form  id="Insert" ref="Insert" @submit.prevent="Insert" enctype="multipart/form-data">
                <v-card>
                    <v-card-title>
                        <span>Add Patient Info</span>
                        <v-spacer></v-spacer>
                        <v-icon color="white" @click="insertDialog = false">mdi-close</v-icon>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row style="margin-top:0px !important">
                                <v-col cols="12" lg="6" md="12" sm="12">
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
                                        <v-col cols="4">
                                            <v-autocomplete
                                                label="Religion"
                                                v-model="tempReligion"
                                                :items="selectReligion"
                                                class="required"
                                                dense
                                                :rules="rules.required"
                                                persistent-placeholder
                                                outlined
                                                name="password"
                                            ></v-autocomplete>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field
                                                label="Nationality"
                                                v-model="tempNationality"
                                                class="required uppercase"
                                                dense
                                                :rules="rules.required"
                                                persistent-placeholder
                                                outlined
                                                name="name"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field
                                                label="Birth Place"
                                                v-model="tempBirthPlace"
                                                class="required uppercase"
                                                dense
                                                :rules="rules.required"
                                                persistent-placeholder
                                                outlined
                                                name="birth_place"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field
                                                label="Occupation"
                                                v-model="tempOccupation"
                                                class="required uppercase"
                                                dense
                                                :rules="rules.required"
                                                persistent-placeholder
                                                outlined
                                                name="name"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-autocomplete
                                                label="Sex"
                                                v-model="tempSex"
                                                :items="selectSex"
                                                class="required"
                                                dense
                                                :rules="rules.required"
                                                persistent-placeholder
                                                outlined
                                                name="sex"
                                            ></v-autocomplete>
                                        </v-col>
                                        <v-col cols="8">
                                            <v-text-field
                                                label="Contact"
                                                v-model="tempContactNo"
                                                class="required"
                                                dense
                                                :rules="rules.contactNo"
                                                persistent-placeholder
                                                outlined
                                                name="contact"
                                                maxlength="11"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="12" lg="6" md="12" sm="12">
                                    <v-row>
                                        <v-col cols="3">
                                            <v-text-field
                                                label="Age"
                                                v-model="tempAge"
                                                class="required uppercase"
                                                dense
                                                :rules="rules.required"
                                                persistent-placeholder
                                                outlined
                                                readonly
                                                name="name"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="5">
                                            <v-menu
                                                v-model="birthdayMenu"
                                                :close-on-content-click="false"
                                                transition="scale-transition"
                                                offset-y
                                                max-width="290px"
                                                min-width="auto"
                                            >
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field
                                                        v-model="tempBirthDay"
                                                        label="Birth Day"
                                                        class="required uppercase"
                                                        persistent-placeholder
                                                        prepend-inner-icon="mdi-calendar"
                                                        readonly
                                                        outlined
                                                        :rules="rules.required"
                                                        dense
                                                        v-bind="attrs"
                                                        v-on="on"
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker
                                                        v-model="tempBirthDay"
                                                        no-title
                                                        @input="birthdayMenu = false"
                                                ></v-date-picker>
                                            </v-menu>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-autocomplete
                                                label="Civil Status"
                                                v-model="tempCivilStatus"
                                                :items="selectCivil"
                                                class="required"
                                                dense
                                                :rules="rules.required"
                                                persistent-placeholder
                                                outlined
                                                name="password"
                                            ></v-autocomplete>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-autocomplete
                                                label="Province"
                                                v-model="tempProvince"
                                                :items="provinceMaster"
                                                item-text="name"
                                                item-value="id"
                                                class="required"
                                                dense
                                                :rules="rules.required"
                                                persistent-placeholder
                                                outlined
                                                name="password"
                                            ></v-autocomplete>
                                        </v-col>
                                        
                                        <v-col cols="6">
                                            <v-autocomplete
                                                label="Municipal"
                                                v-model="tempMunicipal"
                                                :items="selectMunicipal"
                                                item-text="name"
                                                item-value="id"
                                                class="required"
                                                dense
                                                :rules="rules.required"
                                                persistent-placeholder
                                                outlined
                                                name="password"
                                            ></v-autocomplete>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-autocomplete
                                                label="Barangay"
                                                v-model="tempBarangay"
                                                :items="selectBarangay"
                                                item-text="name"
                                                item-value="id"
                                                class="required"
                                                dense
                                                :rules="rules.required"
                                                persistent-placeholder
                                                outlined
                                                name="password"
                                            ></v-autocomplete>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field
                                                label="House Address"
                                                v-model="tempHouse"
                                                class="required uppercase"
                                                dense
                                                :rules="rules.required"
                                                persistent-placeholder
                                                outlined
                                                name="name"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="12" lg="12" md="12" sm="12">
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field
                                                label="Complete Address"
                                                v-model="tempAddressTxt"
                                                class="required uppercase"
                                                dense
                                                :rules="rules.required"
                                                persistent-placeholder
                                                outlined
                                                readonly
                                                name="name"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
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
import { mapActions, mapState } from 'vuex'
export default {
    
    name:'Employee',
    components:{
        'toolbar':ToolbarComponent,
        'float-action':FloatAction,
    },
    data() {
        return {
            employee:[],
            empIds:null,
            toolbar:{
                title:'Patient Registration',
                subTitle:'Register Patient System',
            },
            floatbtn:{
                add:true,
                edit:true,
                delete:true,
            },
            selectAll:false,
            selectedRows:[],
            editMode:false,
            loadMore:false,
            insertDialog:false,
            tableHeight:window.innerHeight - 180,
            dialogBtn:false,
            selectSex:['Female','Male'],
            selectCivil:['Single','Married','Widow'],
            selectReligion:['Roman Catholic','Iglesia ni Cristo','Baptist'],
            tempName:null,
            tempAge:null,
            tempSex:null,
            tempCivilStatus:null,
            tempNationality:null,
            tempOccupation:null,
            tempReligion:null,
            tempProvince:null,
            tempMunicipal:null,
            tempBarangay:null,
            tempHouse:null,
            // tempAddressTxt:null,
            tempContactNo:null,
            tempBirthDay:null,
            birthdayMenu:false,
            tempBirthPlace:null,

        }
    },
    methods:{
        ...mapActions(['getProvince']),
        toggleInsertDialog(){
            this.insertDialog=true
        },
        toggleDelete(id){
            console.log('delete')
            this.tempToDeleteId = id
            this.deleteDialog = true
            // sdfasdf
        },
        Insert(){
            
            if(this.$refs.Insert.validate()){
                this.loadMore = true
                var myform = document.getElementById('Insert');
                var formdata = new FormData(myform);
                axios({
                    method : 'post',
                    url : 'register_insert',
                    data : formdata,
                })
                .then(res =>{
                    console.log(res.data)
                    this.loadMore = false
                    // this.$refs.Insert.resetValidation()
                    this.insertDialog = false
                    this.getRegister()

                }).catch(err =>{
                    console.log(err)
                });
            }
        },
        toggleEditMode(val){
            this.editMode = !this.editMode
        },
        Edit(item){
            console.log(item)
        },
        Update(){
            if(this.$refs.Update.validate()){
                this.loadMore = true
                var myform = document.getElementById('Update');
                var formdata = new FormData(myform);
                axios({
                    method : 'post',
                    url : 'register_update',
                    data : formdata,
                })
                .then(res =>{
                    console.log(res.data)
                    this.loadMore = false
                    // this.$refs.Insert.resetValidation()
                    this.editDialog = false
                    this.getRegister()

                }).catch(err =>{
                    console.log(err)
                });
            }
        },
        Delete(){
            console.log(this.tempToDeleteId)
            this.loadMore = true

            axios({
                method : 'post',
                url : 'register_delete',
                data : {id:this.tempToDeleteId},
            })
            .then(res =>{
                console.log(res.data)
                this.loadMore = false
                this.deleteDialog = false
                this.getRegister()

            }).catch(err =>{
                console.log(err)
            });
        },
        getRegister(){
            this.loadMore = true
            this.registerData = []
            axios({
                method : 'post',
                url : 'api/get_user',
                data : {id:1}
            })
            .then(res =>{
                console.log(res.data)
                this.loadMore = false
                this.registerData = res.data
            }).catch(err =>{
                this.dialogBtn = false
                console.log(err)
            });
        }
    },
    computed:{
        ...mapState([
            'rules',
            'provinceMaster',
        ]),
        seqs(){
                return (this.insertDialog) ? _.reverse(_.range(1,this.registerData.length + 2)) : _.reverse(_.range(1,this.registerData.length + 1))
            },
        last_seq(){
            return this.registerData.length + 1
        },
        selectMunicipal(){
            let arr = []
            this.provinceMaster.filter(data=>{
                if(data.id === this.tempProvince){
                    arr = data.municipality
                }
            })
            return arr
        },
        selectBarangay(){
            let arr = []
            this.provinceMaster.filter(data=>{
                if(data.id === this.tempProvince){
                    data.municipality.filter(municipal=>{
                        if(municipal.id === this.tempMunicipal){
                            arr = municipal.barangay
                        }
                    })
                }
            })
            return arr
        },
        tempAddressTxt(){
            let province = ''
            let municipality = ''
            let barangay = ''
            let completeAddress = [this.tempHouse]
            this.provinceMaster.filter(data=>{
                if(data.id === this.tempProvince){
                    province = data.name
                    completeAddress[3] = data.name
                    data.municipality.filter(municipal=>{
                        if(municipal.id === this.tempMunicipal){
                            municipality = municipal.name
                            completeAddress[2] = municipal.name
                            municipal.barangay.filter(bar=>{
                                if(bar.id === this.tempBarangay){
                                    barangay = bar.name
                                    completeAddress[1] = bar.name
                                }
                            })
                        }
                    })
                }
            })
            if(!this.tempHouse){
                completeAddress.shift()
            }
            console.log('totok',completeAddress)
            return completeAddress.join(' ')
            // return this.tempHouse + ' ' + barangay + ' ' + municipality + ' ' + province
        }
    },
    watch:{
        insertDialog(val){
            if(!val){
                this.tempUnitNo = null
                this.tempUnitType = null
                this.$refs.Insert.resetValidation()
                // this.closeInsertDialog()
            }
        },
        tempBirthDay(val){
            let age = moment(val, "YYYY-MM-DD").month(0).from(moment().month(0))
            if(age.split(' ')[1] == 'year'){
                this.tempAge = 1
            }else if(!['day','days','month','months'].includes(age.split(' ')[1])){
                this.tempAge =  age ? age.split(' ')[0] : ''
            } else{
                this.tempAge = null
                console.log('no age');
            }
            
        },
        insertDialog(val){
            if(!val){
                this.tempName = null
                this.tempAge = null
                this.tempSex = null
                this.tempCivilStatus = null
                this.tempOccupation = null
                this.tempNationality = null
                this.tempReligion = null
                this.tempProvince = null
                this.tempMunicipal = null
                this.tempBarangay = null
                this.tempHouse = null
                // this.tempAddressTxt = null
                this.tempContactNo = null
                this.tempBirthDay = null
                this.birthdayMenu = false
                this.tempBirthPlace = null
            }
        },
    },
    created() {
        this.getRegister()
        this.getProvince()
    },
}
</script>
<style scoped>
th, td{
    /* border: black 1px solid; */
    /* padding:0px !important; */
    text-align: center;
}
.mt-4{
    margin-top:16px;
}
.inline{
    display: inline-flex;
}
.uppercase >>> input{
    text-transform: uppercase;
}
/* .v-card__title {
    background: #455A64 !important;
    color: #ffffff !important;
    padding: 4px 16px !important;
} */
/* .boxing{
    display: block;
    text-align: -webkit-center;
    42069 42070 42071 42072 42073 42074
} */
</style>

