<template>
  <div>
    <div class="row justify-content-center">
      <div class="col col-2">
        <div class="mb-3">
          <label class="form-label">Lisa kasutajanimi</label>
          <input v-model="username" type="text" class="form-control">
        </div>
        <div class="mb-3">
          <label class="form-label">Lisa parool</label>
          <input v-model="username" type="text" class="form-control">
        </div>
        <div class="mb-3">
          <label class="form-label">Korda parooli</label>
          <input v-model="username" type="text" class="form-control">
        </div>
        <div>
          <button @click="registration" type="submit" class="btn btn-outline-primary justify-content-between">Registreeri</button>
          <br>
          <br><p>Konto olemas? <router-link to="/login">Logi sisse</router-link></p>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "RegistrationView"
}
</script>



