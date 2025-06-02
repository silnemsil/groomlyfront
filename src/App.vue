<template>
  <nav class="navbar p-4 bg-light d-flex flex-column align-items-center">
    <h1 class="mb-4 text-primary text-center fw-bold">Groomly – kui hoolid oma lemmikust</h1>

    <div class="btn-group" role="group" aria-label="Nav menu">
      <router-link to="/" class="btn btn-outline-primary">Kodu</router-link>
      <router-link to="/support" class="btn btn-outline-primary">Tugi</router-link>
      <router-link to="/login" class="btn btn-primary">Logi sisse</router-link>
    </div>
  </nav>

  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script setup lang="ts">
</script>