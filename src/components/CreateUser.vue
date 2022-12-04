<template>
    <div class="form-container">

        <div class="form-container__card">
            <h3 v-show="isCreateItem">Создать пользователя</h3>
            <h3 v-show="isOpenItem">Редактировать пользователя</h3>
            <form class="form-container__card__form" @submit="toSendRequest">

                <div
                        v-show="isCreateItem"
                        class="form-container__card__form__input"
                        :class="inputLogin.isError? 'error': inputLogin.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputLogin.text" @blur="inputLogin.isError=!checkTextIsNotEmpty(inputLogin.text)" :required="isCreateItem"/>
                    <label class="input-label">{{tableHeadNames.login}}</label>
                </div>

                <div
                        class="form-container__card__form__input"
                        :class="inputEmail.isError?  (inputEmail.text.length>0? 'error filled':'error') : inputEmail.text.length>0? 'filled':''"
                >

                    <input type="email" class="input-field" v-model="inputEmail.text" @blur="inputEmail.isError=!checkEmail(inputEmail.text)" required/>
                    <label class="input-label">{{tableHeadNames.email}}</label>
                </div>

                <div
                        class="form-container__card__form__select"
                >

                    <select v-model="inputIsAdmin.text">
                        <option value="" selected>Нет</option>
                        <option value="true">Да</option>
                    </select>
                    <label class="select-label">{{tableHeadNames.is_admin}}</label>
                </div>

                <div
                        class="form-container__card__form__input"
                        :class="inputFirstName.isError? 'error': inputFirstName.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputFirstName.text" @blur="inputFirstName.isError=!checkTextIsNotEmpty(inputFirstName.text)"  required/>
                    <label class="input-label">{{tableHeadNames.first_name}}</label>
                </div>

                <div
                        class="form-container__card__form__input"
                        :class="inputSecondName.isError? 'error': inputSecondName.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputSecondName.text" @blur="inputSecondName.isError=!checkTextIsNotEmpty(inputSecondName.text)" required/>
                    <label class="input-label">{{tableHeadNames.last_name}}</label>
                </div>

                <div v-show="isCreateItem" class="form-container__card__form__input">
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





                <div class="form-container__card__action">
                    <button v-if="isCreateItem" class="form-container__card__action__button">Создать</button>
                    <button v-else class="form-container__card__action__button">Редактировать</button>
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
        name:'CreateUser',
        mixins:[checkFormMixin],
       data(){
            return{
                tableHeadNames,
                inputLogin:{text:'',isError:false},
                inputEmail:{text:'',isError: false},
                inputFirstName:{text:'',isError: false},
                inputIsAdmin:{text:'',isError: false},
                inputSecondName:{text:'',isError: false},
                inputPassword:{text:'',isError:false},
                showPassword1:false,
            }
       },
        methods:{
            toSendRequest(e){
                e.preventDefault();
                this.isCreateItem? this.postCreateUser() : this.patchUpdateUser()
            },
            postCreateUser(){

                if (
                    this.checkTextIsNotEmpty(this.inputLogin.text) &&
                    this.checkEmail(this.inputEmail.text) &&
                    this.checkTextIsNotEmpty(this.inputFirstName.text) &&
                    this.checkTextIsNotEmpty(this.inputSecondName.text) &&
                    this.checkPassword(this.inputPassword.text)
                ){
                    let createUserData={
                        "login": this.inputLogin.text,
                        "email": this.inputEmail.text,
                        "is_admin": Boolean(this.inputIsAdmin.text),
                        "first_name": this.inputFirstName.text,
                        "last_name": this.inputSecondName.text,
                        "password": this.inputPassword.text
                    }
                    console.log(createUserData)
                    $api.post('/api/admin/user',createUserData).then((res)=>{
                        console.log(res)
                        if(res.data.error === 'alredy exist'){
                            this.$store.commit('setError', {typeErr: 'error', textErr: 'Пользователь уже существует!'})
                        }
                        if(res.data.error === 'invalid data'){
                            this.$store.commit('setError', {typeErr: 'error', textErr: 'Неверно заполнены данные!'})
                        }
                        else{

                            this.$store.commit('setCreatedItem',res.data.result)
                            this.$store.commit('setError', {typeErr: 'success', textErr: 'Вы создали пользователя!'})
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

            patchUpdateUser(){

                if (
                    this.checkEmail(this.inputEmail.text) &&
                    this.checkTextIsNotEmpty(this.inputFirstName.text) &&
                    this.checkTextIsNotEmpty(this.inputSecondName.text)
                ){
                    let patchUserData={
                        "id":this.openItemId,
                        "login": this.inputLogin.text,
                        "email": this.inputEmail.text,
                        "is_admin": Boolean(this.inputIsAdmin.text),
                        "first_name": this.inputFirstName.text,
                        "last_name": this.inputSecondName.text,
                    }


                    $api.patch('/api/admin/user',patchUserData).then((res)=>{
                        console.log(res)
                        if(res.data.error === 'alredy exist'){
                            this.$store.commit('setError', {typeErr: 'error', textErr: 'Пользователь уже существует!'})
                        }
                        if(res.data.error === 'invalid data'){
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
            }

        },
        computed: mapState([
            'isCreateItem',
            'isOpenItem',
            'openItemObject',
            'openItemId'
        ]),
        watch:{
            isCreateItem(){
                this.inputLogin={text:'',isError:false}
                this.inputEmail={text:'',isError: false}
                this.inputFirstName={text:'',isError: false}
                this.inputSecondName={text:'',isError: false}
                this.inputPassword={text:'',isError:false}
                this.inputIsAdmin={text:'',isError:false}
                this.showPassword1=false
            },
            openItemObject(){
                this.inputLogin={text:this.openItemObject.login,isError:false}
                this.inputEmail={text:this.openItemObject.email,isError: false}
                this.inputFirstName={text:this.openItemObject.first_name,isError: false}
                this.inputSecondName={text:this.openItemObject.last_name,isError: false}
                this.inputIsAdmin={text:this.openItemObject.is_admin?'true':'',isError: false}
                this.inputPassword={text:'',isError:false}
                this.showPassword1=false
            }
        },

    }
</script>

<style scoped>

</style>