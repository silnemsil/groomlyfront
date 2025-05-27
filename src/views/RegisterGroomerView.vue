<template>
  <div class="row justify-content-center">
    <div class="col col-4">
      <div class="mb-3">
        <label class="form-label">Kasutajanimi</label>
        <input v-model="newGroomer.username" type="text" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Parool</label>
        <input v-model="newGroomer.password" type="password" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Korda parooli</label>
        <input v-model="confirmPassword" type="password" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Vali linn</label>
        <CitiesDropdown
            :cities="cities"
            :selected-city-id="newGroomer.cityId"
            :default-option-label="'Vali linn'"
            @event-new-city-selected="newGroomer.cityId = $event"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Tänav</label>
        <input v-model="newGroomer.streetName" type="text" class="form-control"/>
      </div>
      <div class="mb-3">
        <label class="form-label">Majanumber</label>
        <input v-model="newGroomer.houseNumber" type="text" class="form-control"/>
      </div>
      <div class="mb-3">
        <label class="form-label">Teenusepakkuja nimi</label>
        <input v-model="newGroomer.groomerName" type="text" class="form-control"/>
      </div>
      <div class="mb-3">
        <label class="form-label">Kirjeldus</label>
        <input v-model="newGroomer.groomerDescription" type="text" class="form-control"/>
      </div>
      <div class="mb-3">
        <label class="form-label">Telefoninumber</label>
        <input v-model="newGroomer.groomerTelNumber" type="text" class="form-control"/>
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input v-model="newGroomer.groomerEmail" type="text" class="form-control"/>
      </div>
      <button @click="registerGroomer" type="button" class="btn btn-primary">
        Registreeri
      </button>
    </div>
  </div>
</template>

<script>
import RegistrationService from "@/services/RegistrationService";
import CityService from "@/services/CityService";
import CitiesDropdown from "@/components/city/CitiesDropdown.vue";
import Navigation from "@/navigations/Navigation";

export default {
  name: 'RegisterGroomerView',
  components: {
    CitiesDropdown
  },
  data() {
    return {
      confirmPassword: '',
      cities: [],
      newGroomer: {
        username: '',
        password: '',
        cityId: 0,
        streetName: '',
        houseNumber: '',
        groomerName: '',
        groomerDescription: '',
        groomerTelNumber: '',
        groomerEmail: ''
      },
      apiError: null,
      errorMessage: ''
    };
  },
  created() {
    CityService.sendGetCitiesRequest()
        .then(response => {
          this.cities = response.data;
        })
        .catch(error => {
          console.error("Linnade laadimine ebaõnnestus", error);
        });
  },
  methods: {
    registerGroomer() {
      RegistrationService.registerGroomer(this.newGroomer)
          .then(() => Navigation.navigateToLoginView())
          .catch(error => this.handleRegisterGroomerErrorResponse(error));
    },
    handleRegisterGroomerErrorResponse(error) {
      let httpStatusCode = error.response.status;
      this.apiError = error.response.data;

      if (httpStatusCode === 403 && this.apiError.errorCode === 444) {
        this.errorMessage = this.apiError.message;
        setTimeout(this.resetErrorMessage, 4000);
      } else {
        Navigation.navigateToErrorView();
      }
    },
    resetErrorMessage() {
      this.errorMessage = '';
    }
  }
};
</script>
