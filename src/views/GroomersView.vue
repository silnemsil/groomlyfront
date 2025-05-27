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

    <div v-if="loading" class="text-center">Laen groomereid...</div>

    <div v-else>
      <div v-if="filteredGroomers.length === 0">
        <p>Antud linnas groomereid ei leitud.</p>
      </div>

      <table class="table table-striped">
        <thead>
        <tr>
          <th>Teenusepakkuja</th>
          <th>Kirjeldus</th>
          <th>Teenused</th>
          <th>Kontakt</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="groomer in filteredGroomers" :key="groomer.id">
          <td>{{ groomer.groomerName }}</td>
          <td>{{ groomer.groomerDescription }}</td>
          <td>{{ groomer.services?.join(', ') || 'Puudub info' }}</td>
          <td>{{ groomer.groomerTelNumber }}, {{ groomer.groomerEmail }}</td>
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
      cities: [],
      groomers: [],
      selectedCityId: 0,
      loading: false,
    };
  },
  computed: {
    filteredGroomers() {
      if (this.selectedCityId === 0) {
        return this.groomers;
      }
      return this.groomers.filter(groomer => groomer.cityId === this.selectedCityId);
    },
  },
  methods: {
    handleCitySelection(cityId) {
      this.selectedCityId = cityId;
    },
    fetchCities() {
      CityService.sendGetCitiesRequest()
          .then(response => {
            this.cities = response.data;
          })
          .catch(() => {
            alert('Linnade laadimisel tekkis viga');
          });
    },
    fetchGroomers() {
      this.loading = true;
      GroomerService.getAllGroomers()
          .then(response => {
            this.groomers = response.data;
            console.log("Laetud groomerid:", this.groomers); // <- siit näed cityId tüüpi
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
    this.fetchCities();
    this.fetchGroomers();
  },
};
</script>

