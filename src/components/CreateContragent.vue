<template>
    <div class="form-container">

        <div class="form-container__card">
            <h3 v-show="isCreateItem">Создать контрагента</h3>
            <h3 v-show="isOpenItem">Редактировать контрагента</h3>
            <form class="form-container__card__form" @submit="toSendRequest">

                <div
                        class="form-container__card__form__input"
                        :class="inputName.isError? 'error': inputName.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputName.text" @blur="inputName.isError=!checkTextIsNotEmpty(inputName.text)" required/>
                    <label class="input-label">{{tableHeadNames.name}}</label>
                </div>


                <div class="form-container__card__form__select">
                    <select v-model="inputHeadDivisionId.text">

                        <option value="" disabled selected>Выбрать подразделение</option>
                        <option v-for="item in headDivisionsList" :value="item.id" >{{item.name}}</option>

                    </select>
                    <label class="select-label">{{tableHeadNames.head_division_id}}</label>
                </div>

                <div class="form-container__card__form__select">
                    <select v-model="inputTypeId.text">

                        <option value="" disabled selected>Выбрать тип</option>
                        <option v-for="item in typesList" :value="item.id" >{{item.name}}</option>

                    </select>
                    <label class="select-label">{{tableHeadNames.type_id}}</label>
                </div>

                <div class="form-container__card__form__select">
                    <select v-model="inputAuthorizedEmployeeId.text">

                        <option value="" disabled selected>Выбрать тип</option>
                        <option v-for="item in employeesList" :value="item.id" >{{item.last_name+' '+item.first_name}}</option>

                    </select>
                    <label class="select-label">{{tableHeadNames.authorized_employee_id}}</label>
                </div>

                <div
                        class="form-container__card__form__input"
                        :class="inputBik.isError? 'error': inputBik.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputBik.text" @blur="inputBik.isError=!checkTextIsNotEmpty(inputBik.text)" required/>
                    <label class="input-label">{{tableHeadNames.bik}}</label>
                </div>

                <div
                        class="form-container__card__form__input"
                        :class="inputAccountNumber.isError? 'error': inputAccountNumber.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputAccountNumber.text" @blur="inputAccountNumber.isError=!checkTextIsNotEmpty(inputAccountNumber.text)" required/>
                    <label class="input-label">{{tableHeadNames.account_number}}</label>
                </div>

                <div
                        class="form-container__card__form__input"
                        :class="inputInn.isError? 'error': inputInn.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputInn.text" @blur="inputInn.isError=!checkTextIsNotEmpty(inputInn.text)" required/>
                    <label class="input-label">{{tableHeadNames.inn}}</label>
                </div>

                <div
                        class="form-container__card__form__input"
                        :class="inputOgrn.isError? 'error': inputOgrn.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputOgrn.text" @blur="inputOgrn.isError=!checkTextIsNotEmpty(inputOgrn.text)" required/>
                    <label class="input-label">{{tableHeadNames.ogrn}}</label>
                </div>

                <div
                        class="form-container__card__form__input"
                        :class="inputActualAddress.isError? 'error': inputActualAddress.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputActualAddress.text" @blur="inputActualAddress.isError=!checkTextIsNotEmpty(inputActualAddress.text)" required/>
                    <label class="input-label">{{tableHeadNames.actual_address}}</label>
                </div>

                <div class="form-container__card__form__select">
                    <select v-model="inputIsActive.text">

                        <option value="" selected>Нет</option>
                        <option value="true">Да</option>

                    </select>
                    <label class="select-label">{{tableHeadNames.is_active}}</label>
                </div>

                <div class="form-container__card__form__select">
                    <select v-model="inputIsAutoSignEnable.text">

                        <option value="" selected>Нет</option>
                        <option value="true">Да</option>

                    </select>
                    <label class="select-label">{{tableHeadNames.is_auto_sign_enable}}</label>
                </div>




                <div class="form-container__card__action">
                    <button v-if="isCreateItem" class="form-container__card__action__button">Создать</button>
                    <button v-if="isOpenItem" class="form-container__card__action__button">Редактировать</button>
                    <button type="button" @click="deleteContragent" v-if="isOpenItem" class="form-container__card__action__button delete-button">Удалить</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import checkFormMixin from "@/mixins/checkFormMixin";
    import {mapState} from "vuex";
    import {$api} from "@/API/AxiosTemplate";
    import {tableHeadNames} from "@/assets/tableHeadNames";

    export default {
        name:'CreateLegal',
        mixins:[checkFormMixin],
        data(){
            return{
                tableHeadNames,
                inputName:{text:'',isError:false},
                inputHeadDivisionId:{text:'',isError:false},
                inputTypeId:{text:'',isError:false},
                inputAuthorizedEmployeeId:{text:'',isError:false},
                inputBik:{text:'',isError:false},
                inputAccountNumber:{text:'',isError:false},
                inputInn:{text:'',isError:false},
                inputOgrn:{text:'',isError:false},
                inputActualAddress:{text:'',isError:false},
                inputIsActive:{text:'',isError:false},
                inputIsAutoSignEnable:{text:'',isError:false},


                headDivisionsList:[],
                typesList:[],
                employeesList:[],

            }
        },
        methods:{
            toSendRequest(e){
                e.preventDefault();
                this.isCreateItem? this.postCreateContragent() : this.patchUpdateContragent()
            },
           async postCreateContragent(){
                if (
                    this.checkTextIsNotEmpty(this.inputName.text) &&
                    this.checkTextIsNotEmpty(this.inputHeadDivisionId.text) &&
                    this.checkTextIsNotEmpty(this.inputTypeId.text) &&
                    this.checkTextIsNotEmpty(this.inputAuthorizedEmployeeId.text) &&
                    this.checkTextIsNotEmpty(this.inputBik.text) &&
                    this.checkTextIsNotEmpty(this.inputAccountNumber.text) &&
                    this.checkTextIsNotEmpty(this.inputInn.text)  &&
                    this.checkTextIsNotEmpty(this.inputOgrn.text)  &&
                    this.checkTextIsNotEmpty(this.inputActualAddress.text)


                ){
                    let createCompanyData={
                        "name": this.inputName.text,
                        "head_division_id": this.inputHeadDivisionId.text,
                        "type_id": this.inputTypeId.text,
                        "authorized_employee_id": this.inputAuthorizedEmployeeId.text,
                        "bik": this.inputBik.text,
                        "tax_id":1,
                        "account_number": this.inputAccountNumber.text,
                        "inn": this.inputInn.text,
                        "ogrn": this.inputOgrn.text,
                        "actual_address": this.inputActualAddress.text,
                        "is_owner": false,
                        "is_active": Boolean(this.inputIsActive.text),
                        "is_auto_sign_enable": Boolean(this.inputIsAutoSignEnable.text)
                    }

                   await $api.post('/api/admin/company',createCompanyData).then((res)=>{
                        console.log(res)
                        if(res.data.error == 'alredy exist'){
                            this.$store.commit('setError', {typeErr: 'error', textErr: 'Контрагент уже существует!'})
                        }
                        if(res.data.error == 'invalid data'){
                            this.$store.commit('setError', {typeErr: 'error', textErr: 'Неверно заполнены данные!'})
                        }
                        else{
                            this.$store.commit('setCreatedItem',res.data.result)
                            this.$store.commit('setError', {typeErr: 'success', textErr: 'Вы создали контрагента!'})
                        }

                    }).catch((err)=>{
                        console.log(err)
                        this.$store.commit('setError', {typeErr: 'error', textErr: 'Проблемы с сервером!'})
                    })



                }
                else{
                    this.$store.commit('setError', {typeErr: 'error', textErr: 'Заполните форму!'})
                }
            },

            async patchUpdateContragent(){

                if (
                    this.checkTextIsNotEmpty(this.inputName.text) &&
                    this.checkTextIsNotEmpty(this.inputHeadDivisionId.text) &&
                    this.checkTextIsNotEmpty(this.inputTypeId.text) &&
                    this.checkTextIsNotEmpty(this.inputAuthorizedEmployeeId.text) &&
                    this.checkTextIsNotEmpty(this.inputBik.text) &&
                    this.checkTextIsNotEmpty(this.inputAccountNumber.text) &&
                    this.checkTextIsNotEmpty(this.inputInn.text)  &&
                    this.checkTextIsNotEmpty(this.inputOgrn.text)  &&
                    this.checkTextIsNotEmpty(this.inputActualAddress.text)


                ){
                    let updateCompanyData={
                        "id":this.openItemId,
                        "name": this.inputName.text,
                        "head_division_id": this.inputHeadDivisionId.text,
                        "type_id": this.inputTypeId.text,
                        "authorized_employee_id": this.inputAuthorizedEmployeeId.text,
                        "bik": this.inputBik.text,
                        "tax_id":1,
                        "account_number": this.inputAccountNumber.text,
                        "inn": this.inputInn.text,
                        "ogrn": this.inputOgrn.text,
                        "actual_address": this.inputActualAddress.text,
                        "is_owner": false,
                        "is_active": Boolean(this.inputIsActive.text),
                        "is_auto_sign_enable": Boolean(this.inputIsAutoSignEnable.text)
                    }

                  await  $api.patch('/api/admin/company',updateCompanyData).then((res)=>{
                        console.log(res)
                        if(res.data.error == 'alredy exist'){
                            this.$store.commit('setError', {typeErr: 'error', textErr: 'Контрагент уже существует!'})
                        }
                        if(res.data.error == 'invalid data'){
                            this.$store.commit('setError', {typeErr: 'error', textErr: 'Неверно заполнены данные!'})
                        }
                        else{
                            this.$store.commit('setCreatedItem',res.data.result)
                            this.$store.commit('setError', {typeErr: 'success', textErr: 'Вы обновили данные!'})
                        }

                    }).catch((err)=>{
                        console.log(err)
                        this.$store.commit('setError', {typeErr: 'error', textErr: 'Проблемы с сервером!'})
                    })



                }
                else{
                    this.$store.commit('setError', {typeErr: 'error', textErr: 'Заполните форму!'})
                }
            },

            async deleteContragent(){
               await  $api.delete(`/api/admin/company/${this.openItemId}`).then((res)=>{
                    console.log(res)
                    if(res.data.error === 'invalid data'){
                        this.$store.commit('setError', {typeErr: 'error', textErr: 'Неверно заполнены данные!'})
                    }
                    else{

                        this.$store.commit('setCreatedItem',res.data.result)
                        this.$store.commit('setError', {typeErr: 'success', textErr: 'Вы удалили контрагента!'})
                    }

                }).catch((err)=>{
                    console.log(err)
                    this.$store.commit('setError', {typeErr: 'error', textErr: 'Проблемы с сервером!'})
                })
            },



            async getHeadDivisionList(){
                await $api('/api/admin/divisions').then((res)=>{
                    console.log(res.data)
                    this.headDivisionsList=res.data.result

                }).catch((err)=>{
                    console.log(err)

                })

            },

            async getTypesList(){
                await $api('/api/admin/company/type_id').then((res)=>{
                    this.typesList=res.data.result

                }).catch((err)=>{
                    console.log(err)

                })

            },

            async getEmployeesList(){
                await $api('/api/admin/employees').then((res)=>{

                    this.employeesList=res.data.result

                }).catch((err)=>{
                    console.log(err)

                })

            },

        },
        computed: mapState([
            'isCreateItem',
            'isOpenItem',
            'openItemObject',
            'openItemId'
        ]),
        watch:{
            isCreateItem(){
                this.inputName={text:'',isError:false}
                this.inputHeadDivisionId={text:'',isError:false}
                this.inputTypeId={text:'',isError:false}
                this.inputAuthorizedEmployeeId={text:'',isError:false}
                this.inputBik={text:'',isError:false}
                this.inputAccountNumber={text:'',isError:false}
                this.inputInn={text:'',isError:false}
                this.inputOgrn={text:'',isError:false}
                this.inputActualAddress={text:'',isError:false}
                this.inputIsActive={text:'',isError:false}
                this.inputIsAutoSignEnable={text:'',isError:false}
            },

            openItemObject(){
                this.inputName={text:this.openItemObject.name,isError:false}
                this.inputHeadDivisionId={text:this.openItemObject.head_division.id,isError:false}
                this.inputTypeId={text:this.openItemObject.type_id,isError:false}
                this.inputAuthorizedEmployeeId={text:this.openItemObject.authorized_employee.id,isError:false}
                this.inputBik={text:this.openItemObject.bik,isError:false}
                this.inputAccountNumber={text:this.openItemObject.account_number,isError:false}
                this.inputInn={text:this.openItemObject.inn,isError:false}
                this.inputOgrn={text:this.openItemObject.ogrn,isError:false}
                this.inputActualAddress={text:this.openItemObject.actual_address,isError:false}
                this.inputIsActive={text:this.openItemObject.is_active?'true':'',isError:false}
                this.inputIsAutoSignEnable={text:this.openItemObject.is_auto_sign_enable?'true':'',isError:false}
            }
        },
        mounted() {
            this.getHeadDivisionList();
            this.getTypesList();
            this.getEmployeesList();
        }

    }
</script>

<style scoped>

</style>