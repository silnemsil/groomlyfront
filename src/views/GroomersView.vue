<template>
  <div class="container">

    <h2>Minu profiil</h2>

    <form @submit.prevent="saveGroomerData">
      <div class="mb-3">
        <label for="city" class="form-label">Linn</label>
        <CitiesDropdown :cities="cities"
                        :selected-city-id="groomer.cityId"
                        @event-new-city-selected="setCityId"/>
      </div>

      <div class="mb-3">
        <label class="form-label">Tänava nimi</label>
        <input v-model="groomer.streetName" class="form-control" type="text">
      </div>

      <div class="mb-3">
        <label class="form-label">Maja nr</label>
        <input v-model="groomer.houseNumber" class="form-control" type="text">
      </div>

      <div class="mb-3">
        <label class="form-label">Nimi</label>
        <input v-model="groomer.groomerName" class="form-control" type="text">
      </div>

      <!-- lisa teised väljad samamoodi -->

      <button type="submit" class="btn btn-primary">Salvesta</button>
    </form>

  </div>
</template>

<script>
import CitiesDropdown from '@/components/city/CitiesDropdown.vue';
import CityService from '@/services/CityService';
import GroomerService from '@/services/GroomerService';

export default {
  name: 'GroomerProfileForm',
  components: { CitiesDropdown },
  data() {
    return {
      cities: [],
      groomer: {
        cityId: 0,
        streetName: '',
        houseNumber: '',
        groomerName: '',
        groomerDescription: '',
        groomerTelNumber: '',
        groomerEmail: ''
      }
    };
  },
  methods: {
    setCityId(cityId) {
      this.groomer.cityId = cityId;
    },
    getAllCities() {
      CityService.sendGetCitiesRequest()
          .then(response => {
            this.cities = response.data;
          })
          .catch(() => {
            // lisa vajadusel error handling
          });
    },
    saveGroomerData() {
      GroomerService.sendPostGroomerRequest(this.groomer)
          .then(() => {
            alert("Andmed salvestatud!");
          });
    }
  },
  mounted() {
    this.getAllCities();
  }
}
</script>
