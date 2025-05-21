<template>
  <nav>
    <h1>Leia oma lemmikule parim salong</h1>
    <router-link to="/">Meie Lugu</router-link> |
    <router-link to="/about">Salongid</router-link> |
    <router-link to="/about">Logi Sisse</router-link>
  </nav>
  <router-view/>
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
  padding: 70px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
