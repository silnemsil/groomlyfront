<template>
  <div class="row justify-content-center">
    <div class="col col-4">
      <AlertDanger :error-message="errorMessage"/>
      <div class="mb-3">
        <label class="form-label">Kasutajanimi</label>
        <input v-model="newCustomer.username" type="text" class="form-control"/>
      </div>
      <div class="mb-3">
        <label class="form-label">Parool</label>
        <input v-model="newCustomer.password" type="password" class="form-control"/>
      </div>
      <div class="mb-3">
        <label class="form-label">Korda parooli</label>
        <input v-model="confirmPassword" type="password" class="form-control"/>
      </div>
      <button @click="register" type="button" class="btn btn-primary">
        Registreeri
      </button>

    </div>
  </div>
</template>

<script>
import RegistrationService from '@/services/RegistrationService'
import AlertDanger from "@/components/alert/AlertDanger.vue";
import Navigation from "@/navigations/Navigation";

export default {
  components: {AlertDanger},
  data() {
    return {
      confirmPassword: '',
      errorMessage: '',

      newCustomer: {
        username: '',
        password: ''
      },

      apiError: {
        message: '',
        errorCode: 0
      }

    }
  },
  methods: {

    resetErrorMessage() {
      this.errorMessage = ''
    },

    register() {
      if (this.newCustomer.password !== this.confirmPassword) {
        this.errorMessage = 'Paroolid ei kattu!'
        setTimeout(this.resetErrorMessage, 4000)
        return
      }
      if (!this.newCustomer.username || !this.newCustomer.password) {
        this.errorMessage = 'Täida kõik väljad!'
        setTimeout(this.resetErrorMessage, 4000)
        return
      }

      RegistrationService.registerCustomer(this.newCustomer)
          .then(() => Navigation.navigateToLoginView())
          .catch(error => this.handleRegisterErrorResponse(error))

    },

    handleRegisterErrorResponse(error) {
      let httpStatusCode = error.response.status
      this.apiError = error.response.data

      if (httpStatusCode === 403 && this.apiError.errorCode === 444) {
        this.errorMessage = this.apiError.message;
        setTimeout(this.resetErrorMessage, 4000);
      } else {
        Navigation.navigateToErrorView()
      }
    },
  }
}
</script>
