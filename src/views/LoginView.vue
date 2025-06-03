<template>
  <div>
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col col-4">
          <AlertDanger :error-message="errorMessage"/>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col col-2">

          <div class="mb-3">
            <label class="form-label">Kasutajanimi</label>
            <input v-model="username" type="text" class="form-control">
          </div>

          <div class="mb-3">
            <label class="form-label">Parool</label>
            <input v-model="password" type="password" class="form-control">
          </div>

          <button @click="login" type="submit" class="btn btn-outline-success">Logi sisse</button>

          <hr />

          <p>Kasutajakontot pole?</p>

          <button @click="goRegisterCustomer" type="button" class="btn btn-outline-primary mb-2">
            Registreeri kliendiks
          </button>

          <button @click="goRegisterGroomer" type="button" class="btn btn-outline-primary">
            Registreeri teenusepakkujaks
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";
import ErrorCodes from "@/errors/ErrorCodes";
import Navigation from "@/navigations/Navigation";
import LoginService from "@/services/LoginService";

export default {
  name: 'LoginView',
  components: {AlertDanger},
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',

      loginResponse: {
        userId: 0,
        roleName: ''
      },

      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },
  methods: {
    login() {
      if (this.allFieldsAreWithCorrectInput()) {
        this.sendLoginRequest()
      } else {
        this.errorMessage = 'Täida kõik väljad'
        setTimeout(this.resetErrorMessage, 4000)
      }
    },

    allFieldsAreWithCorrectInput() {
      return this.username.length > 0 && this.password.length > 0;
    },

    sendLoginRequest() {
      LoginService.sendGetLoginRequest(this.username, this.password)
          .then(response => this.handleLoginResponse(response))
          .catch(error => this.handleLoginErrorResponse(error))
    },

    handleLoginResponse(response) {
      this.loginResponse = response.data
      sessionStorage.setItem('userId', this.loginResponse.userId)
      sessionStorage.setItem('roleName', this.loginResponse.roleName)
      this.$emit('event-update-nav-menu')

      if (this.loginResponse.roleName === 'customer') {
        //TODO: veel teha
        Navigation.navigateToGroomersView()

      } else if (this.loginResponse.roleName === 'groomer') {
        //Todo veel teha
        //Navigation
      } else {
        //Todo veel teha (admin)
        //Navigation


      }

    },

    handleLoginErrorResponse(error) {
      let httpStatusCode = error.response.status
      this.errorResponse = error.response.data
      this.handleIncorrectCredentials(httpStatusCode);
    },

    handleIncorrectCredentials(httpStatusCode) {
      if (this.isIncorrectCredentials(httpStatusCode)) {
        this.errorMessage = this.errorResponse.message
        setTimeout(this.resetErrorMessage, 4000)
      } else {
        Navigation.navigateToErrorView()
      }
    },

    isIncorrectCredentials(httpStatusCode) {
      return httpStatusCode === 403 && this.errorResponse.errorCode === ErrorCodes.CODE_INCORRECT_CREDENTIALS;
    },

    resetErrorMessage() {
      this.errorMessage = ''
    },

    goRegisterCustomer() {
      this.$router.push('/register-customer')
    },

    goRegisterGroomer() {
      this.$router.push('/register-groomer')
    }
  }
}
</script>