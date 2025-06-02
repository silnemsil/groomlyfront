<template>
  <nav class="navbar p-4 bg-light d-flex flex-column align-items-center">
    <h1 class="mb-4 text-primary text-center fw-bold">Groomly – kui hoolid oma lemmikust</h1>

    <div class="btn-group" role="group" aria-label="Nav menu">
      <router-link to="/" class="btn btn-outline-primary">Kodu</router-link>
      <router-link to="/support" class="btn btn-outline-primary">Tugi</router-link>

      <template v-if="!isLoggedIn">
        <router-link to="/login" class="btn btn-outline-primary">Logi sisse</router-link>
      </template>
      <template v-else>
        <router-link to="/groomers" class="btn btn-outline-primary">Groomerid</router-link>
        <div @click="logOut" class="btn btn-outline-primary">
          Logi välja
        </div>
<!--         class="cursor-pointer -->
        <template v-if="basketShortInfo.isBookingStarted">
          <font-awesome-icon @click="navigateToCheckoutView" icon="basket-shopping" style="font-size: 36px;" class="cursor-pointer" />
          <span>{{basketShortInfo.numberOfItems}}</span>
        </template>
      </template>

    </div>
  </nav>

  <router-view @event-update-nav-menu="updateNavMenu"/>
</template>

<script>
import Navigation from "@/navigations/Navigation";
import RoleService from "@/services/RoleService";
import BookingService from "@/services/BookingService";

export default {
  data() {
    return {
      userId: 0 ,
      isLoggedIn: false,
      modalIsOpen: false,
      basketShortInfo: {
        isBookingStarted: false,
        bookingId: 0,
        numberOfItems: 0
      }
    };
  },
  methods: {

    getBasketShortInfo() {
      BookingService.sendGetBookingShortBasketInfoRequest(this.userId)
          .then(response => this.handleGetBasketShortInfoResponse(response))
          .catch(() => Navigation.navigateToErrorView())
    },

    handleGetBasketShortInfoResponse(response) {
      this.basketShortInfo = response.data
      sessionStorage.setItem("bookingId", this.basketShortInfo.bookingId)
    },

    logOut() {
      sessionStorage.clear()
      this.updateNavMenu()
    },

    updateNavMenu() {
      this.isLoggedIn = RoleService.isLoggedIn()
      this.userId = Number(sessionStorage.getItem("userId"))
      this.getBasketShortInfo()
    },

    closeModal() {
      this.modalIsOpen = false
    },

    navigateToCheckoutView() {
      Navigation.navigateToCheckoutView()
    },

  },
  beforeMount() {
    this.updateNavMenu()
  }

}
</script>


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
