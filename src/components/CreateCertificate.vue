<template>
    <div class="form-container">

        <div class="form-container__card">
            <h3 v-show="isCreateItem">Создать сертификат</h3>
            <h3 v-show="isOpenItem">Редактировать сертификат</h3>
            <form class="form-container__card__form" @submit="toSendRequest">

                <div
                        class="form-container__card__form__input"
                        :class="inputName.isError? 'error': inputName.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputName.text" @blur="inputName.isError=!checkTextIsNotEmpty(inputName.text)" required/>
                    <label class="input-label">{{tableHeadNames.name}}</label>
                </div>

                <div
                        class="form-container__card__form__input"
                        :class="inputVersion.isError? 'error': inputVersion.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputVersion.text" @blur="inputVersion.isError=!checkTextIsNotEmpty(inputVersion.text)" required/>
                    <label class="input-label">{{tableHeadNames.version}}</label>
                </div>

                <div
                        class="form-container__card__form__input"
                        :class="inputSerialNumber.isError? 'error': inputSerialNumber.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputSerialNumber.text" @blur="inputSerialNumber.isError=!checkTextIsNotEmpty(inputSerialNumber.text)" required/>
                    <label class="input-label">{{tableHeadNames.serial_number}}</label>
                </div>

                <div
                        class="form-container__card__form__input"
                        :class="inputThumbprint.isError? 'error': inputThumbprint.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputThumbprint.text" @blur="inputThumbprint.isError=!checkTextIsNotEmpty(inputThumbprint.text)" required/>
                    <label class="input-label">{{tableHeadNames.thumbprint}}</label>
                </div>

                <div
                        class="form-container__card__form__file"
                        :class="inputData.isError? 'error': inputData.text.length>0? 'filled':''"
                >


<!--                    <input type="text" class="input-field" v-model="inputData.text" @blur="inputData.isError=!checkTextIsNotEmpty(inputData.text)" required/>-->
                    <input type="file" class="file-field" @blur="inputData.isError=!checkTextIsNotEmpty(inputData.text)" @change="getFiles" required>
                    <label class="file-label">{{tableHeadNames.data}}</label>
                </div>

                <div
                        v-show="isCreateItem"
                        class="form-container__card__form__input"
                        :class="inputPin.isError? 'error': inputPin.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputPin.text" @blur="inputPin.isError=!checkTextIsNotEmpty(inputPin.text)" :required="isCreateItem"/>
                    <label class="input-label">{{tableHeadNames.pin}}</label>
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
        name:'CreateCertificate',
        mixins:[checkFormMixin],
        data(){
            return{
                tableHeadNames,
                inputName:{text:'',isError:false},
                inputVersion:{text:'',isError:false},
                inputSerialNumber:{text:'',isError:false},
                inputThumbprint:{text:'',isError:false},
                inputData:{text:'',isError:false},
                inputPin:{text:'',isError:false}
            }
        },
        methods:{
            toSendRequest(e){
                e.preventDefault();
                this.isCreateItem? this.postCreateCertificate() : this.patchUpdateCertificate()
            },
            postCreateCertificate(){

                if (
                    this.checkTextIsNotEmpty(this.inputName.text) &&
                    this.checkTextIsNotEmpty(this.inputVersion.text) &&
                    this.checkTextIsNotEmpty(this.inputSerialNumber.text) &&
                    this.checkTextIsNotEmpty(this.inputThumbprint.text) &&
                    this.checkTextIsNotEmpty(this.inputData.text) &&
                    this.checkTextIsNotEmpty(this.inputPin.text)
                ){
                    let createCertificateData={
                        "name": this.inputName.text,
                        "version": this.inputVersion.text,
                        "serial_number": this.inputSerialNumber.text,
                        "thumbprint": this.inputThumbprint.text,
                        "data": this.inputData.text,
                        "pin": this.inputPin.text
                    }
                    $api.post('/api/admin/certificate',createCertificateData).then((res)=>{
                        console.log(res)
                        if(res.data.error === 'alredy exist'){
                            this.$store.commit('setError', {typeErr: 'error', textErr: 'Сертификат уже существует!'})
                        }
                        if(res.data.error === 'invalid data'){
                            this.$store.commit('setError', {typeErr: 'error', textErr: 'Неверно заполнены данные!'})
                        }
                        else{
                            this.$store.commit('setCreatedItem',res.data.result)
                            this.$store.commit('setError', {typeErr: 'success', textErr: 'Вы создали сертификат!'})
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

            patchUpdateCertificate(){

                if (
                    this.checkTextIsNotEmpty(this.inputName.text) &&
                    this.checkTextIsNotEmpty(this.inputVersion.text) &&
                    this.checkTextIsNotEmpty(this.inputSerialNumber.text) &&
                    this.checkTextIsNotEmpty(this.inputThumbprint.text) &&
                    this.checkTextIsNotEmpty(this.inputData.text)

                ){
                    let createCertificateData={
                        "id":this.openItemId,
                        "name": this.inputName.text,
                        "version": this.inputVersion.text,
                        "serial_number": this.inputSerialNumber.text,
                        "thumbprint": this.inputThumbprint.text,
                        "data": this.inputData.text
                    }
                    $api.patch('/api/admin/certificate',createCertificateData).then((res)=>{
                        console.log(res)
                        if(res.data.error === 'alredy exist'){
                            this.$store.commit('setError', {typeErr: 'error', textErr: 'Сертификат уже существует!'})
                        }
                        if(res.data.error === 'invalid data'){
                            this.$store.commit('setError', {typeErr: 'error', textErr: 'Неверно заполнены данные!'})
                        }
                        else{
                            this.$store.commit('setCreatedItem',res.data.result)
                            this.$store.commit('setError', {typeErr: 'success', textErr: 'Вы обновили сертификат!'})
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
           getFiles(e){

                // get the files
                let files = e.target.files;

                // Process each file
                let allFiles = []
                for (let i = 0; i < files.length; i++) {

                    let file = files[i]

                    // Make new FileReader
                    let reader = new FileReader()

                    // Convert the file to base64 text
                    reader.readAsDataURL(file)

                    // on reader load somthing...
                    reader.onload = () => {

                        // Make a fileInfo Object
                        let fileInfo = {
                            name: file.name,
                            type: file.type,
                            size: Math.round(file.size / 1000)+' kB',
                            base64: reader.result,
                            file: file
                        }

                        // Push it to the state
                        allFiles.push(fileInfo)

                        // If all files have been proceed
                        if(allFiles.length == files.length){
                            // Apply Callback function

                            this.inputData.text=allFiles[0].base64

                            this.checkTextIsNotEmpty(this.inputData.text)
                            // console.log()
                        }

                    } // reader.onload

                } // for

            }, // onChange()

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
                this.inputName={text:'',isError:false}
                this.inputVersion={text:'',isError:false}
                this.inputSerialNumber={text:'',isError:false}
                this.inputThumbprint={text:'',isError:false}
                this.inputData={text:'',isError:false}
                this.inputPin={text:'',isError:false}
            },
            openItemObject(){

                    this.inputName={text:this.openItemObject.name,isError:false}
                     this.inputVersion={text:this.openItemObject.version,isError:false}
                     this.inputSerialNumber={text:this.openItemObject.serial_number,isError:false}
                     this.inputThumbprint={text:this.openItemObject.thumbprint,isError:false}
                     this.inputData={text:this.openItemObject.data,isError:false}

            }
        }

    }
</script>

<style scoped>

.form-container__card__form__file{
    display: flex;
    flex-direction: column-reverse;
    position: relative;
    padding-top: 1.5rem;
}
.file-label{
    color: #8597a3;
    transition: 0.25s ease;
}
.form-container__card__form__file.error > .file-label{
   color:red
}

.form-container__card__form__file.filled > .file-label{
    color: #6658d3;
}

</style>

