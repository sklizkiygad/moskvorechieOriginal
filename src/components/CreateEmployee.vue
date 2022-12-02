<template>
    <div class="form-container">

        <div class="form-container__card">
            <h3>Создать сотрудника</h3>
            <form class="form-container__card__form" @submit="postCreateCertificate">

                <div
                        class="form-container__card__form__input"
                        :class="inputFirstName.isError? 'error': inputFirstName.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputFirstName.text" @blur="inputFirstName.isError=!checkTextIsNotEmpty(inputFirstName.text)" required/>
                    <label class="input-label">{{tableHeadNames.first_name}}</label>
                </div>

                <div
                        class="form-container__card__form__input"
                        :class="inputLastName.isError? 'error': inputLastName.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputLastName.text" @blur="inputLastName.isError=!checkTextIsNotEmpty(inputLastName.text)" required/>
                    <label class="input-label">{{tableHeadNames.last_name}}</label>
                </div>

                <div
                        class="form-container__card__form__input"
                        :class="inputMiddleName.isError? 'error': inputMiddleName.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputMiddleName.text" @blur="inputMiddleName.isError=!checkTextIsNotEmpty(inputMiddleName.text)" required/>
                    <label class="input-label">{{tableHeadNames.middle_name}}</label>
                </div>


                <div
                        class="form-container__card__form__select"
                >

                    <select v-model="inputUserId.text">

                        <option value="" disabled selected>Выбрать пользователя</option>
                        <option v-for="item in usersList" :value="item.id" >{{item.first_name}}</option>

                    </select>
                    <label class="select-label">{{tableHeadNames.user_id}}</label>
                </div>

                <div class="form-container__card__form__select">
                    <select v-model="inputCompanyId.text">

                        <option value="" disabled selected>Выбрать компанию</option>
                        <option v-for="item in companiesList" :value="item.id" >{{item.name}}</option>

                    </select>
                    <label class="select-label">{{tableHeadNames.company}}</label>
                </div>

                <div
                        class="form-container__card__form__select"
                >

                    <select v-model="inputCertificateId.text">

                        <option value="" disabled selected>Выбрать сертификат</option>
                        <option v-for="item in certificatesList" :value="item.id" >{{item.name}}</option>

                    </select>
                    <label class="select-label">{{tableHeadNames.certificate_id}}</label>
                </div>


                <div
                        class="form-container__card__form__input"
                        :class="inputEmail.isError? 'error': inputEmail.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputEmail.text" @blur="inputEmail.isError=!checkTextIsNotEmpty(inputEmail.text)" required/>
                    <label class="input-label">{{tableHeadNames.email}}</label>
                </div>


                <div
                        class="form-container__card__form__select"
                >

                    <select v-model="inputDivisionId.text">

                        <option value="" disabled selected>Выбрать подразделение</option>
                        <option v-for="item in divisionsList" :value="item.id" >{{item.name}}</option>

                    </select>
                    <label class="select-label">{{tableHeadNames.division_id}}</label>
                </div>

                <div
                        class="form-container__card__form__select"
                >

                    <select v-model="inputStatusId.text">

                        <option value="" disabled selected>Выбрать статус</option>
                        <option v-for="item in statusesList" :value="item.id" >{{item.name}}</option>

                    </select>
                    <label class="select-label">{{tableHeadNames.status_id}}</label>
                </div>




                <div
                        class="form-container__card__form__input"
                        :class="inputPosition.isError? 'error': inputPosition.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputPosition.text" @blur="inputPosition.isError=!checkTextIsNotEmpty(inputPosition.text)" required/>
                    <label class="input-label">{{tableHeadNames.position}}</label>
                </div>

                <div
                        class="form-container__card__form__select"
                >

                    <select v-model="inputIsResponsible.text">
                        <option value="" selected>Нет</option>
                        <option value="true">Да</option>
                    </select>
                    <label class="select-label">{{tableHeadNames.is_responsible}}</label>
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
        name:'CreateEmployee',
        mixins:[checkFormMixin],
        data(){
            return{
                tableHeadNames,
                inputFirstName:{text:'',isError:false},
                inputLastName:{text:'',isError:false},
                inputMiddleName:{text:'', isError:false},
                inputUserId:{text:'',isError:false},
                inputCompanyId:{text:'',isError:false},
                inputCertificateId:{text:'',isError:false},
                inputEmail:{text:'',isError:false},
                inputDivisionId:{text:'',isError:false},
                inputStatusId:{text:'',isError:false},
                inputPosition:{text:'',isError:false},
                inputIsResponsible:{text:'',isError:false},

                usersList:[],
                divisionsList:[],
                companiesList:[],
                certificatesList:[],
                statusesList:[]
            }
        },
        methods:{
            postCreateCertificate(e){


                e.preventDefault()

                if (
                    this.checkTextIsNotEmpty(this.inputFirstName.text) &&
                    this.checkTextIsNotEmpty(this.inputLastName.text) &&
                    this.checkTextIsNotEmpty(this.inputMiddleName.text) &&
                    this.checkTextIsNotEmpty(this.inputUserId.text) &&
                    this.checkTextIsNotEmpty(this.inputCompanyId.text) &&
                    this.checkTextIsNotEmpty(this.inputCertificateId.text) &&
                    this.checkTextIsNotEmpty(this.inputEmail.text) &&
                    this.checkTextIsNotEmpty(this.inputDivisionId.text) &&
                    this.checkTextIsNotEmpty(this.inputStatusId.text) &&
                    this.checkTextIsNotEmpty(this.inputPosition.text)
                ){
                    let createCertificateData={
                        "first_name": this.inputFirstName.text,
                        "last_name": this.inputLastName.text,
                        "middle_name": this.inputMiddleName.text,
                        "user_id": this.inputUserId.text,
                        "company_id": this.inputCompanyId.text,
                        "certificate_id": this.inputCertificateId.text,
                        "email": this.inputEmail.text,
                        "division_id": this.inputDivisionId.text,
                        "status_id":  this.inputStatusId.text,
                        "position": this.inputPosition.text,
                        "is_responsible": Boolean(this.inputIsResponsible.text)
                    }
                    $api.post('/api/admin/employee',createCertificateData).then((res)=>{
                        console.log(res)
                        if(res.data.error == 'alredy exist'){
                            this.$store.commit('setError', {typeErr: 'error', textErr: 'Юр.лицо уже существует!'})
                        }
                        if(res.data.error == 'invalid data'){
                            this.$store.commit('setError', {typeErr: 'error', textErr: 'Неверно заполнены данные!'})
                        }
                        else{
                            this.$store.commit('setCreatedItem',res.data.result)
                            this.$store.commit('setError', {typeErr: 'success', textErr: 'Вы создали Юр.лицо!'})
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

           async getUsersList(){
                await $api('/api/admin/users').then((res)=>{
                    this.usersList=res.data.result

                }).catch((err)=>{
                    console.log(err)

                })
            },

            async getDivisionsList(){
                await $api('/api/admin/divisions').then((res)=>{
                    this.divisionsList=res.data.result

                }).catch((err)=>{
                    console.log(err)

                })
            },
            async getCompaniesList(){
                await $api('/api/admin/companies').then((res)=>{
                    this.companiesList=res.data.result

                }).catch((err)=>{
                    console.log(err)

                })
            },
            async getCertificatesList(){
                await $api('/api/admin/certificates').then((res)=>{
                    this.certificatesList=res.data.result

                }).catch((err)=>{
                    console.log(err)

                })
            },
            async getStatusesList(){
                await $api('/api/admin/employee/status_id').then((res)=>{
                    console.log(res)
                    this.statusesList=res.data.result

                }).catch((err)=>{
                    console.log(err)

                })
            },
        },
        computed: mapState([
            'isCreateItem'
        ]),
        watch:{
            isCreateItem(){
                this.inputFirstName={text:'',isError:false}
                this.inputLastName={text:'',isError:false}
                this.inputMiddleName={text:'', isError:false}
                this.inputUserId={text:'',isError:false}
                this.inputCompanyId={text:'',isError:false}
                this.inputCertificateId={text:'',isError:false}
                this.inputEmail={text:'',isError:false}
                this.inputDivisionId={text:'',isError:false}
                this.inputStatusId={text:'',isError:false}
                this.inputPosition={text:'',isError:false}
                this.inputIsResponsible={text:'',isError:false}
            }
        },
        mounted() {
            this.getUsersList();
            this.getDivisionsList();
            this.getCompaniesList();
            this.getCertificatesList();
            this.getStatusesList();
        }

    }
</script>

<style scoped>

</style>