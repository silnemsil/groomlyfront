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


export default {
  name: 'RegisterGroomerView',
  data() {
    return {

    }
  }
}
</script>
