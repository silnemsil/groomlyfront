<template>
  <div class="container mt-3">
    <div class="mb-3 col-2">
      <CitiesDropdown
          :cities="cities"
          :selected-city-id="selectedCityId"
          defaultOptionLabel="Kõik linnad"
          @event-new-city-selected="handleCitySelection"
      />
    </div>

    <div v-if="loading" class="text-center">Laen lemmiklooma iluteenindajaid...</div>

    <div v-else>
      <div v-if="filteredGroomers.length === 0">
        <p>Valitud linnas lemmiklooma iluteenindajaid ei leitud.</p>
      </div>

      <table class="table table-striped table-success">
        <thead>
        <tr>
          <th>Teenusepakkuja</th>
          <th>Kirjeldus</th>
          <th>Teenused</th>
          <th>Kontakttelefon</th>
          <th>Email</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="groomer in groomers" :key="groomer.groomerId">
          <td>{{ groomer.groomerName }}</td>
          <td>{{ groomer.groomerDescription }}</td><!-- -->
          <td>{{ groomer.services?.join(', ') || 'Puudub info' }}</td>
          <td>{{ groomer.groomerTelNumber }}</td>
          <td> {{ groomer.groomerEmail }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import CitiesDropdown from '@/components/city/CitiesDropdown.vue';
import CityService from '@/services/CityService';
import GroomerService from '@/services/GroomerService';

export default {
  name: 'GroomersView',
  components: {
    CitiesDropdown,
  },
  data() {
    return {

      cities: [
        {
          cityId: 0,
          cityName: ''
        }
      ],

      groomers: [
        {
          groomerId: 0,
          cityId: 0,
          groomerName: '',
          groomerDescription: '',
          groomerTelNumber: '',
          groomerEmail: '',
          streetName: '',
          houseNumber: ''
        }
      ],

      selectedCityId: 0,
      loading: false,
    };
  },
  methods: {
    handleCitySelection(cityId) {
      this.selectedCityId = cityId;
    },
    getCities() {
      CityService.sendGetCitiesRequest()
          .then(response => {
            this.cities = response.data;
          })
          .catch(() => {
            alert('Linnade laadimisel tekkis viga');
          });
    },
    getGroomers() {
      this.loading = true;

      GroomerService.getAllGroomers()
          .then(response => {
            this.groomers = response.data;
          })
          .catch(() => {
            alert('Groomerite laadimisel tekkis viga');
          })
          .finally(() => {
            this.loading = false;
          });
    }
,
  },
  created() {
    this.getCities();
    this.getGroomers();
  },
};
</script>

