<template>

    <div class="form-container">
        <div class="form-container__card">

            <h3>Авторизация</h3>

            <form class="form-container__card__form" @submit="postLoginForm">

                <div
                        class="form-container__card__form__input"
                        :class="inputLogin.isError? 'error': inputLogin.text.length>0? 'filled':''"
                >
                    <input type="text" class="input-field" v-model="inputLogin.text"
                           @blur="inputLogin.isError=!checkTextIsNotEmpty(inputLogin.text)" required/>
                    <label class="input-label">Логин</label>
                </div>

                <div class="form-container__card__form__input">
                    <div
                            class="form-container__card__form__input__password"
                            :class="inputPassword.isError ? (inputPassword.text.length>0? 'error filled':'error'): inputPassword.text.length > 0 ? 'filled':''"
                    >
                        <input :type="showPassword1?'text':'password'" v-model="inputPassword.text"
                               @blur="inputPassword.isError=!checkPassword(inputPassword.text)" class="input-field"
                               required/>
                        <label class="input-label">Пароль</label>
                        <font-awesome-icon icon="fa-regular fa-eye" v-show="showPassword1"
                                           @click="showPassword1=false"/>
                        <font-awesome-icon icon="fa-regular fa-eye-slash" v-show="!showPassword1"
                                           @click="showPassword1=true"/>
                    </div>
                </div>

                <div class="form-container__card__action">
                    <button class="form-container__card__action__button">Войти</button>
                </div>
            </form>

            <div class="form-container__card__info">
                <p>Если еще нет аккаунта то
                    <router-link to="/registration">Зарегистрируйтесь</router-link>
                </p>
            </div>
        </div>
    </div>


</template>

<script>

    import checkFormMixin from "@/mixins/checkFormMixin";
    import {$api} from "@/API/AxiosTemplate";

    export default {
        name: 'FormLogin',
        mixins: [checkFormMixin],
        data() {
            return {
                showPassword1: false,
                inputLogin: {text: '', isError: false},
                inputPassword: {text: '', isError: false},
            }
        },
        methods: {
            postLoginForm(e) {
                if (
                    this.checkTextIsNotEmpty(this.inputLogin.text) &&
                    this.checkPassword(this.inputPassword.text)
                ) {
                    e.preventDefault()
                    let loginBody = {
                        login: this.inputLogin.text,
                        password: this.inputPassword.text
                    }

                    $api.post('/api/admin/login', loginBody).then((res) => {
                        console.log(res)
                        if (res.data.error) {
                            this.$store.commit('setError', {typeErr: 'error', textErr: 'Неверный логин или пароль!'})
                        } else {
                            localStorage.setItem('Moskvorechie', JSON.stringify(res.data.result))
                            this.$store.commit('setError', {typeErr: 'success', textErr: 'Вы авторизованы!'})
                            this.$store.commit('setIsServerError', false)
                            this.checkIsAuth()


                        }

                    }).catch((err) => {
                        console.log(err)
                        this.$store.commit('setError', {typeErr: 'error', textErr: 'Ошибка авторизации!'})
                    })
                } else {
                    this.inputLogin.isError = !this.checkTextIsNotEmpty(this.inputLogin.text)
                    this.inputPassword.isError = !this.checkPassword(this.inputPassword.text)
                }
            },
            checkIsAuth() {
                if (localStorage.getItem('Moskvorechie')) {
                    this.$router.go();
                }
            }

        },
        mounted() {
            this.checkIsAuth()
        }
    }
</script>

<style scoped>

</style>