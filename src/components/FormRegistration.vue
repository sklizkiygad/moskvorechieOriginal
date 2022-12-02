<template>
    <div class="form-container">
        <div class="form-container__card">

            <h3>Регистрация</h3>
            <form class="form-container__card__form">

                <div
                        class="form-container__card__form__input"
                        :class="inputLogin.isError? 'error': inputLogin.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputLogin.text" @blur="inputLogin.isError=!checkTextIsNotEmpty(inputLogin.text)" required/>
                    <label class="input-label">Логин</label>
                </div>

                <div
                        class="form-container__card__form__input"
                        :class="inputFirstName.isError? 'error': inputFirstName.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputFirstName.text" @blur="inputFirstName.isError=!checkTextIsNotEmpty(inputFirstName.text)"  required/>
                    <label class="input-label">Имя</label>
                </div>

                <div
                        class="form-container__card__form__input"
                        :class="inputSecondName.isError? 'error': inputSecondName.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputSecondName.text" @blur="inputSecondName.isError=!checkTextIsNotEmpty(inputSecondName.text)" required/>
                    <label class="input-label">Фамилия</label>
                </div>

                <div
                        class="form-container__card__form__input"
                        :class="inputEmail.isError?  (inputEmail.text.length>0? 'error filled':'error') : inputEmail.text.length>0? 'filled':''"
                >
                    <input type="email" class="input-field" v-model="inputEmail.text" @blur="inputEmail.isError=!checkEmail(inputEmail.text)" required/>
                    <label class="input-label">Email</label>
                </div>

                <div class="form-container__card__form__input">
                    <div
                            class="form-container__card__form__input__password"
                            :class="inputPassword.isError ? (inputPassword.text.length>0? 'error filled':'error'): inputPassword.text.length > 0 ? 'filled':''"
                    >
                        <input :type="showPassword1?'text':'password'" v-model="inputPassword.text" @blur="inputPassword.isError=!checkPassword(inputPassword.text)" class="input-field" required/>
                        <label class="input-label">Пароль</label>
                        <font-awesome-icon icon="fa-regular fa-eye" v-show="showPassword1"  @click="showPassword1=false"/>
                        <font-awesome-icon icon="fa-regular fa-eye-slash" v-show="!showPassword1" @click="showPassword1=true"/>
                    </div>
                </div>

                <div class="form-container__card__form__input">
                    <div
                            class="form-container__card__form__input__password"
                            :class="inputRepeatPassword.isError ? (inputRepeatPassword.text.length>0? 'error filled':'error'): inputRepeatPassword.text.length > 0 ? 'filled':''"
                    >
                        <input :type="showPassword2?'text':'password'" v-model="inputRepeatPassword.text" @blur="inputRepeatPassword.isError=!checkPasswordRepeat(inputPassword.text,inputRepeatPassword.text)" class="input-field" required/>
                        <label class="input-label">Повторите пароль</label>
                        <font-awesome-icon icon="fa-regular fa-eye" v-show="showPassword2" @click="showPassword2=false"/>
                        <font-awesome-icon icon="fa-regular fa-eye-slash" v-show="!showPassword2" @click="showPassword2=true"/>
                    </div>

                </div>


                <div class="form-container__card__action">
                    <button class="form-container__card__action__button">Зарегистрироваться</button>
                </div>
            </form>
            <div class="form-container__card__info">
                <p>Если уже есть аккаунт то<router-link to="/">Авторизуйтесь</router-link></p>
            </div>
        </div>
    </div>
</template>

<script>
    import checkFormMixin from "@/mixins/checkFormMixin";

    export default {
        name:'FormRegistration',
        mixins:[checkFormMixin],
        data(){
            return{
                showPassword1:false,
                showPassword2:false,
                inputLogin:{text:'',isError:false},
                inputFirstName:{text:'',isError: false},
                inputSecondName:{text:'',isError: false},
                inputEmail:{text:'',isError: false},
                inputPassword:{text:'',isError:false},
                inputRepeatPassword:{text:'',isError:false}
            }
        },


        
    }
</script>

<style scoped>

</style>