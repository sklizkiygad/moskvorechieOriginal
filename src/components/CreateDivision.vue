<template>
    <div class="form-container">

        <div class="form-container__card">
            <h3 v-show="isCreateItem">Создать подразделение</h3>
            <h3 v-show="isOpenItem">Редактировать подразделение</h3>
            <form class="form-container__card__form" @submit="toSendRequest">

                <div
                        class="form-container__card__form__input"
                        :class="inputName.isError? 'error': inputName.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputName.text" @blur="inputName.isError=!checkTextIsNotEmpty(inputName.text)" required/>
                    <label class="input-label">{{tableHeadNames.name}}</label>
                </div>

                <div
                        class="form-container__card__form__select"
                >

                    <select v-model="inputCompanyId.text">

                        <option value="" disabled selected>Выбрать компанию</option>
                        <option v-for="item in companiesList" :value="item.id" >{{item.name}}</option>

                    </select>
                    <label class="select-label">{{tableHeadNames.company}}</label>
                </div>

                <div
                        class="form-container__card__form__input"
                        :class="inputKpp.isError? 'error': inputKpp.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputKpp.text" @blur="inputKpp.isError=!checkTextIsNotEmpty(inputKpp.text)" required/>
                    <label class="input-label">{{tableHeadNames.kpp}}</label>
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
        name:'CreateDivision',
        mixins:[checkFormMixin],
        data(){
            return{
                tableHeadNames,
                inputName:{text:'',isError:false},
                inputCompanyId:{text:'',isError:false},
                inputKpp:{text:'',isError:false},


                companiesList:[],


            }
        },
        methods:{

            toSendRequest(e){
                e.preventDefault();
                this.isCreateItem? this.postUpdateDivision() : this.patchUpdateDivision()
            },

            postUpdateDivision(){
                if (
                    this.checkTextIsNotEmpty(this.inputName.text) &&
                    this.checkTextIsNotEmpty(this.inputCompanyId.text) &&
                    this.checkTextIsNotEmpty(this.inputKpp.text)

                ){
                    let createDivisionData={
                        "name": this.inputName.text.trim(),
                        "company_id": this.inputCompanyId.text.trim(),
                        "kpp": this.inputKpp.text.trim(),

                    }
                    $api.post('/api/admin/division',createDivisionData).then((res)=>{
                        console.log(res)
                        if(res.data.error === 'alredy exist'){
                            this.$store.commit('setError', {typeErr: 'error', textErr: 'Подразделение уже существует!'})
                        }
                        if(res.data.error === 'invalid data'){
                            this.$store.commit('setError', {typeErr: 'error', textErr: 'Неверно заполнены данные!'})
                        }
                        else{
                            this.$store.commit('setCreatedItem',res.data.result)
                            this.$store.commit('setError', {typeErr: 'success', textErr: 'Вы создали подразделение!'})
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

            patchUpdateDivision(){
                if (
                    this.checkTextIsNotEmpty(this.inputName.text) &&
                    this.checkTextIsNotEmpty(this.inputCompanyId.text) &&
                    this.checkTextIsNotEmpty(this.inputKpp.text)

                ){
                    let createDivisionData={
                        "id":this.openItemId,
                        "name": this.inputName.text.trim(),
                        "company_id": this.inputCompanyId.text.trim(),
                        "kpp": this.inputKpp.text.trim(),

                    }
                    $api.patch('/api/admin/division',createDivisionData).then((res)=>{
                        console.log(res)
                        if(res.data.error === 'alredy exist'){
                            this.$store.commit('setError', {typeErr: 'error', textErr: 'Подразделение уже существует!'})
                        }
                        if(res.data.error === 'invalid data'){
                            this.$store.commit('setError', {typeErr: 'error', textErr: 'Неверно заполнены данные!'})
                        }
                        else{
                            this.$store.commit('setCreatedItem',res.data.result)
                            this.$store.commit('setError', {typeErr: 'success', textErr: 'Вы обновили подразделение!'})
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
                    console.log(res.data.result)
                    this.companiesList=res.data.result

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
                this.inputName={text:'',isError:false};
                this.inputCompanyId={text:'',isError:false};
                this.inputKpp={text:'',isError:false};
            },
            openItemObject(){
                this.inputName={text:this.openItemObject.name,isError:false};
                this.inputCompanyId={text:this.openItemObject.company.id,isError:false};
                this.inputKpp={text:this.openItemObject.kpp,isError:false};


            }

        },
        mounted() {
            this.getCompaniesList();
        }

    }
</script>

<style scoped>

</style>