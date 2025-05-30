<template>
  <div class="container mt-3">
    <div class="mb-3 col-2">
      <CitiesDropdown
          :cities="cities"
          :selected-city-id="selectedCityId"
          defaultOptionLabel="Kõik linnad"
          @event-new-city-selected="handleNewCitySelection"
      />
    </div>
    <AlertDanger :error-message="alertMessage"/>
    <div v-if="loading" class="text-center">Laen lemmiklooma iluteenindajaid...</div>

    <div v-else>
      <div v-if="groomers.length === 0">
        <p>Valitud linnas lemmiklooma iluteenindajaid ei leitud.</p>
      </div>

      <table v-if="groomers.length > 0" class="table table-striped table-success">
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
          <td>
            {{groomer.groomerId}}
            <a href="#" @click="navigateToGroomerView(groomer.groomerId)">{{ groomer.groomerName }}</a>
          </td>
          <td>{{ groomer.groomerDescription }}</td><!-- -->
          <td>
            <p v-for="procedure in groomer.procedures" :key="procedure.procedureId">{{procedure.procedureName}}</p>
          </td>
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
import AlertDanger from "@/components/alert/AlertDanger.vue";
import Navigation from "@/navigations/Navigation";

export default {
  name: 'GroomersView',
  components: {
    AlertDanger,
    CitiesDropdown,
  },
  data() {
    return {
      alertMessage: '',
      selectedCityId: 0,
      loading: false,

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
          houseNumber: '',
          procedures: [
            {
              procedureId: 0,
              procedureName: '',
              procedurePrice: 0
            }
          ]
        }
      ],

      errorResponse: {
        message: '',
        errorCode: 0
      }

    };
  },
  methods: {
    handleNewCitySelection(cityId) {
      this.selectedCityId = cityId;
      this.getGroomers()
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

      GroomerService.sendGetCityGroomers(this.selectedCityId)
          .then(response => {
            this.groomers = response.data;
          })
          .catch(error => {
            this.errorResponse = error.response.data

            if (this.errorResponse.errorCode === 203) {
              this.alertMessage = this.errorResponse.message
              this.groomers = []
            } else {
              Navigation.navigateToErrorView()
            }

          })
          .finally(() => {
            this.loading = false;
          });
    },

    navigateToGroomerView(groomerId) {
      Navigation.navigateToGroomerView(groomerId)
    },



    resetAlertMessage() {
      this.alertMessage = ''
    },

  },
  beforeMount() {
    this.getCities();
    this.getGroomers();
  },
};
</script>

