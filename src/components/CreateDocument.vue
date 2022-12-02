<template>
    <div class="form-container">

        <div class="form-container__card">
            <h3>Создать документ</h3>
            <form class="form-container__card__form" @submit="postCreateCompany">

                <div
                        class="form-container__card__form__input"
                        :class="inputTitle.isError? 'error': inputTitle.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputTitle.text" @blur="inputTitle.isError=!checkTextIsNotEmpty(inputTitle.text)" required/>
                    <label class="input-label">{{tableHeadNames.title}}</label>
                </div>

                <div
                        class="form-container__card__form__input"
                        :class="inputFileName.isError? 'error': inputFileName.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputFileName.text" @blur="inputFileName.isError=!checkTextIsNotEmpty(inputFileName.text)" required/>
                    <label class="input-label">{{tableHeadNames.file_name}}</label>
                </div>


                <div class="form-container__card__form__select">
                    <select v-model="inputKindId.text">

                        <option value="" disabled selected>Выбрать вид</option>
                        <option v-for="item in kindsList" :value="item.id" >{{item.name}}</option>

                    </select>
                    <label class="select-label">{{tableHeadNames.kind_id}}</label>
                </div>

                <div class="form-container__card__form__select">
                    <select v-model="inputTypeId.text">

                        <option value="" disabled selected>Выбрать тип</option>
                        <option v-for="item in typesList" :value="item.id" >{{item.name}}</option>

                    </select>
                    <label class="select-label">{{tableHeadNames.type_id}}</label>
                </div>

                <div class="form-container__card__form__select">
                    <select v-model="inputStatusId.text">

                        <option value="" disabled selected>Выбрать статус</option>
                        <option v-for="item in statusesList" :value="item.id" >{{item.name}}</option>

                    </select>
                    <label class="select-label">{{tableHeadNames.status_id}}</label>
                </div>

                <div class="form-container__card__form__select">
                    <select v-model="inputCompanyId.text">

                        <option value="" disabled selected>Выбрать компанию</option>
                        <option v-for="item in companiesList" :value="item.id" >{{item.name}}</option>

                    </select>
                    <label class="select-label">{{tableHeadNames.company}}</label>
                </div>

                <div class="form-container__card__form__select">
                    <select v-model="inputIsCorrect.text">

                        <option value="" selected>Нет</option>
                        <option value="true" >Да</option>

                    </select>
                    <label class="select-label">{{tableHeadNames.is_correct}}</label>
                </div>


                <div
                        class="form-container__card__form__input"
                        :class="inputLegalDate.isError? 'error': inputLegalDate.text.length>0? 'filled':''"
                >
                    <input type="date" class="input-field" v-model="inputLegalDate.text" @blur="inputLegalDate.isError=!checkTextIsNotEmpty(inputLegalDate.text)" required/>
                    <label class="input-label">{{tableHeadNames.legal_date}}</label>
                </div>

                <div
                        class="form-container__card__form__input"
                        :class="inputCreatedBy.isError? 'error': inputCreatedBy.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputCreatedBy.text" @blur="inputCreatedBy.isError=!checkTextIsNotEmpty(inputCreatedBy.text)" required/>
                    <label class="input-label">{{tableHeadNames.created_by}}</label>
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
        name:'CreateDocument',
        mixins:[checkFormMixin],
        data(){
            return{
                tableHeadNames,
                inputTitle:{text:'',isError:false},
                inputFileName:{text:'',isError:false},
                inputKindId:{text:'',isError:false},
                inputTypeId:{text:'',isError:false},
                inputStatusId:{text:'',isError:false},
                inputCompanyId:{text:'',isError:false},
                inputIsCorrect:{text:'',isError:false},
                inputLegalDate:{text:'',isError:false},
                inputCreatedBy:{text:'',isError:false},




                kindsList:[],
                typesList:[],
                statusesList:[],
                companiesList:[],
            }
        },
        methods:{
            postCreateCompany(e){
                e.preventDefault()
                if (
                    this.checkTextIsNotEmpty(this.inputTitle.text) &&
                    this.checkTextIsNotEmpty(this.inputFileName.text) &&
                    this.checkTextIsNotEmpty(this.inputKindId.text) &&
                    this.checkTextIsNotEmpty(this.inputTypeId.text) &&
                    this.checkTextIsNotEmpty(this.inputCompanyId.text) &&
                    this.checkTextIsNotEmpty(this.inputStatusId.text) &&
                    this.checkTextIsNotEmpty(this.inputLegalDate.text) &&
                    this.checkTextIsNotEmpty(this.inputCreatedBy.text)



                ){
                    let createDocumentData={
                        "title": this.inputTitle.text,
                        "file_name": this.inputFileName.text,
                        "kind_id":this.inputKindId.text,
                        "type_id": this.inputTypeId.text,
                        "status_id": this.inputStatusId.text,
                        "company_id": this.inputCompanyId.text,
                        "is_correct": this.inputIsCorrect.text,
                        "legal_date": Math.floor(new Date(this.inputLegalDate.text).getTime() / 1000),
                        "created_by": this.inputCreatedBy.text
                    }

                    $api.post('/api/admin/document',createDocumentData).then((res)=>{
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


            async getKindsList(){
                await $api('/api/admin/document/kind_id').then((res)=>{

                    this.kindsList=res.data.result

                }).catch((err)=>{
                    console.log(err)

                })
            },

            async getTypesList(){
                await $api('/api/admin/document/type_id').then((res)=>{

                    this.typesList=res.data.result

                }).catch((err)=>{
                    console.log(err)

                })
            },

            async getStatusesList(){
                await $api('/api/admin/employee/status_id').then((res)=>{

                    this.statusesList=res.data.result

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


        },
        computed: mapState([
            'isCreateItem'
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
            }
        },
        mounted() {
            this.getKindsList();
            this.getTypesList();
            this.getStatusesList();
            this.getCompaniesList();
        }

    }
</script>

<style scoped>

</style>