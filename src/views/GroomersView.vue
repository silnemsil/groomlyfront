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
<!-- Järgnev koodilõik on GPT lahendatud ent küsisin selgitusi -->
        <!-- Luuakse üks rida iga groomeri kohta -->
        <tr v-for="groomer in filteredGroomers" :key="groomer.id">
          <!-- Teenuspakkuja nimi -->
          <td>{{ groomer.groomerName }}</td>
          <!-- Kirjeldus -->
          <td>{{ groomer.groomerDescription }}</td><!-- -->
<!-- join on javascripti meetod, kus massiiv ühendatakse üheks stringiks -->
<!-- services? on valikuline chaining, ehk kontrollime, kas services eksiseeterib, kui ei või tühi, siis kuvatakse "puudub indo" -->
          <td>{{ groomer.services?.join(', ') || 'Puudub info' }}</td>
          <!-- Kontakt -->
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
      cities: [],
      groomers: [],
      selectedCityId: 0,
      loading: false,
    };
  },
  //computed ehk arvutatud omadus on meetod, kui data plokis miski muutub, siis arvutatakse cumputed uuesti
  // computed eelised meetodite ees, arvutatakse vaid vajadusel, on automaatne vahemälu, hea andmete tuletamiseks
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
      this.fetchGroomers(cityId); // lisasin täna
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

    // fetchGroomers() {
    //   this.loading = true;
    //   GroomerService.getAllGroomers()
    //       .then(response => {
    //         this.groomers = response.data;
    //       })
    //       .catch(() => {
    //         alert('Groomerite laadimisel tekkis viga');
    //       })
    //       .finally(() => {
    //         this.loading = false;
    //       });
    // }

    fetchGroomers(cityId = 0) {
      this.loading = true;
      GroomerService.findGroomerByCity(cityId)
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
    this.fetchCities();
    this.fetchGroomers();
  },
};
</script>

