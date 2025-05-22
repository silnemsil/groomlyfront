<template>
  <div>
    <div class="login">
      <h1>Logi sisse</h1>
    </div>
    <div>
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
          <button @click="login" type="submit" class="btn btn-outline-primary justify-content-between">Logi sisse</button>
          <br>
          <br>
          <p>Pole kontot? <router-link to="/register">Registreeri</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


</script>



