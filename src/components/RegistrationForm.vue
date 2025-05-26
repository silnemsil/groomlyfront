<template>
  <div class="row justify-content-center">
    <div class="col col-4">
      <div class="mb-3">
        <label class="form-label">Kasutajanimi</label>
        <input v-model="username" type="text" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Parool</label>
        <input v-model="password" type="password" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Korda parooli</label>
        <input v-model="confirmPassword" type="password" class="form-control" />
      </div>
      <button @click="register" type="button" class="btn btn-primary">
        Registreeri
      </button>
    </div>
  </div>
</template>

<script>
import RegistrationService from '@/services/RegistrationService'

export default {
  props: ['roleId'],
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    register() {
      if (this.password !== this.confirmPassword) {
        alert('Paroolid ei kattu!')
        return
      }
      if (!this.username || !this.password) {
        alert('Täida kõik väljad!')
        return
      }

      // Saadame rolli koos andmetega
      if (this.roleId === 3) {
        RegistrationService.registrationCustomer(this.username, this.password)
            .then(() => {
              alert('Registreerimine õnnestus!')
              this.$router.push('/login')
            })
            .catch(err => {
              alert(err.response?.data?.message || 'Midagi läks valesti!')
            })
      } else if (this.roleId === 2) {
        RegistrationService.registrationGroomer(this.username, this.password)
            .then(() => {
              alert('Registreerimine õnnestus!')
              this.$router.push('/login')
            })
            .catch(err => {
              alert(err.response?.data?.message || 'Midagi läks valesti!')
            })
      }
    }
  }
}
</script>
