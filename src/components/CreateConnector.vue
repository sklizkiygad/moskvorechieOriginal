<template>
    <div class="form-container">

        <div class="form-container__card">
            <h3>Создать коннектор</h3>
            <form class="form-container__card__form" @submit="toSendRequest">

                <div
                        class="form-container__card__form__input"
                        :class="inputCode.isError? 'error': inputCode.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputCode.text" @blur="inputCode.isError=!checkTextIsNotEmpty(inputCode.text)" required/>
                    <label class="input-label">{{tableHeadNames.code}}</label>
                </div>


                <div class="form-container__card__form__select">
                    <select v-model="inputCompanyId.text">

                        <option value="" disabled selected>Выбрать компанию</option>
                        <option v-for="item in companiesList" :value="item.id" >{{item.name}}</option>

                    </select>
                    <label class="select-label">{{tableHeadNames.company_id}}</label>
                </div>

                <div class="form-container__card__form__select">
                    <select v-model="inputTypeId.text">
                        <option value="" disabled selected>Выбрать тип</option>
                        <option v-for="item in typesList" :value="item.id" >{{item.name}}</option>
                    </select>
                    <label class="select-label">{{tableHeadNames.type_id}}</label>
                </div>


                <div
                        class="form-container__card__form__input"
                        :class="inputDiadocBoxId.isError? 'error': inputDiadocBoxId.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputDiadocBoxId.text" @blur="inputDiadocBoxId.isError=!checkTextIsNotEmpty(inputDiadocBoxId.text)" required/>
                    <label class="input-label">{{tableHeadNames.diadoc_box_id}}</label>
                </div>

                <div
                        class="form-container__card__form__input"
                        :class="inputLogin.isError? 'error': inputLogin.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputLogin.text" @blur="inputLogin.isError=!checkTextIsNotEmpty(inputLogin.text)" required/>
                    <label class="input-label">{{tableHeadNames.login}}</label>
                </div>

                <div  v-show="isCreateItem" class="form-container__card__form__input">
                    <div
                            class="form-container__card__form__input__password"
                            :class="inputPassword.isError ? (inputPassword.text.length>0? 'error filled':'error'): inputPassword.text.length > 0 ? 'filled':''"
                    >
                        <input :type="showPassword1?'text':'password'" v-model="inputPassword.text" @blur="inputPassword.isError=!checkPassword(inputPassword.text)" class="input-field" :required="isCreateItem"/>
                        <label class="input-label">{{tableHeadNames.password}}</label>
                        <font-awesome-icon icon="fa-regular fa-eye" v-show="showPassword1"  @click="showPassword1=false"/>
                        <font-awesome-icon icon="fa-regular fa-eye-slash" v-show="!showPassword1" @click="showPassword1=true"/>
                    </div>
                </div>

                <div
                        class="form-container__card__form__input"
                        :class="inputApiToken.isError? 'error': inputApiToken.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputApiToken.text" @blur="inputApiToken.isError=!checkTextIsNotEmpty(inputApiToken.text)" required/>
                    <label class="input-label">{{tableHeadNames.api_token}}</label>
                </div>



                <div class="form-container__card__action">
                    <button class="form-container__card__action__button">Создать</button>
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
        name:'CreateConnector',
        mixins:[checkFormMixin],
        data(){
            return{
                tableHeadNames,
                inputCode:{text:'',isError:false},
                inputCompanyId:{text:'',isError:false},
                inputTypeId:{text:'',isError:false},
                inputDiadocBoxId:{text:'',isError:false},
                inputLogin:{text:'',isError:false},
                inputPassword:{text:'',isError:false},
                inputApiToken:{text:'',isError:false},

                companiesList:[],
                typesList:[],
                showPassword1:false,

            }
        },
        methods:{
            toSendRequest(e){
                e.preventDefault();
                this.isCreateItem? this.postCreateConnector() : this.patchUpdateConnector()
            },
            postCreateConnector(){

                if (
                    this.checkTextIsNotEmpty(this.inputCode.text) &&
                    this.checkTextIsNotEmpty(this.inputCompanyId.text) &&
                    this.checkTextIsNotEmpty(this.inputTypeId.text) &&
                    this.checkTextIsNotEmpty(this.inputDiadocBoxId.text) &&
                    this.checkTextIsNotEmpty(this.inputLogin.text) &&
                    this.checkTextIsNotEmpty(this.inputApiToken.text) &&
                    this.checkPassword(this.inputPassword.text)
                ){
                    let createConnectorData={
                        "code": this.inputCode.text,
                        "company_id": this.inputCompanyId.text,
                        "type_id": this.inputTypeId.text,
                        "diadoc_box_id": this.inputDiadocBoxId.text,
                        "login": this.inputLogin.text,
                        "password": this.inputPassword.text,
                        "api_token": this.inputApiToken.text
                    }
                    $api.post('/api/admin/connector',createConnectorData).then((res)=>{
                        console.log(res)
                        if(res.data.error == 'alredy exist'){
                            this.$store.commit('setError', {typeErr: 'error', textErr: 'Коннектор уже существует!'})
                        }
                        if(res.data.error == 'invalid data'){
                            this.$store.commit('setError', {typeErr: 'error', textErr: 'Неверно заполнены данные!'})
                        }
                        else{
                            this.$store.commit('setCreatedItem',res.data.result)
                            this.$store.commit('setError', {typeErr: 'success', textErr: 'Вы создали коннектор!'})
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

            patchUpdateConnector(){

                if (
                    this.checkTextIsNotEmpty(this.inputCode.text) &&
                    this.checkTextIsNotEmpty(this.inputCompanyId.text) &&
                    this.checkTextIsNotEmpty(this.inputTypeId.text) &&
                    this.checkTextIsNotEmpty(this.inputDiadocBoxId.text) &&
                    this.checkTextIsNotEmpty(this.inputLogin.text) &&
                    this.checkTextIsNotEmpty(this.inputApiToken.text) &&
                    this.checkPassword(this.inputPassword.text)
                ){
                    let updateConnectorData={
                        "id":this.openItemId,
                        "code": this.inputCode.text,
                        "company_id": this.inputCompanyId.text,
                        "type_id": this.inputTypeId.text,
                        "diadoc_box_id": this.inputDiadocBoxId.text,
                        "login": this.inputLogin.text,
                        "api_token": this.inputApiToken.text
                    }
                    $api.patch('/api/admin/connector',updateConnectorData).then((res)=>{
                        console.log(res)
                        if(res.data.error == 'alredy exist'){
                            this.$store.commit('setError', {typeErr: 'error', textErr: 'Коннектор уже существует!'})
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


            async getCompaniesList(){
                await $api('/api/admin/companies').then((res)=>{
                    this.companiesList=res.data.result

                }).catch((err)=>{
                    console.log(err)

                })
            },

            async getTypesList(){
                await $api('/api/admin/connector/type_id').then((res)=>{
                    this.typesList=res.data.result

                }).catch((err)=>{
                    console.log(err)

                })
            },

        },
        computed: mapState([
            'isCreateItem',
            'createdItem',
            'isOpenItem',
            'openItemObject',
            'openItemId'
        ]),
        watch:{
            isCreateItem(){
                this.inputCode={text:'',isError:false}
                this.inputCompanyId={text:'',isError:false}
                this.inputTypeId={text:'',isError:false}
                this.inputDiadocBoxId={text:'',isError:false}
                this.inputLogin={text:'',isError:false}
                this.inputPassword={text:'',isError:false}
                this.inputApiToken={text:'',isError:false}
                this.showPassword1=false
            },
            openItemObject(){
                this.inputCode={text:this.openItemObject.code,isError:false}
                this.inputCompanyId={text:this.openItemObject.company.id,isError:false}
                this.inputTypeId={text:this.openItemObject.type.id,isError:false}
                this.inputDiadocBoxId={text:this.openItemObject.diadoc_box_id,isError:false}
                this.inputLogin={text:this.openItemObject.login,isError:false}
                this.inputApiToken={text:this.openItemObject.api_token,isError:false}




            }
        },
        mounted() {
            this.getCompaniesList();
             this.getTypesList();
        }

    }
</script>

<style scoped>

</style>