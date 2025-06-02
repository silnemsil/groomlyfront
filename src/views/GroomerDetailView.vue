<template>
  <div>


    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col col-8 mb-4">

          <h2>{{ groomer.groomerName }}</h2>
          <table class="table table-bordered mt-3">
            <tbody>
            <tr>
              <th>Kirjeldus</th>
              <td>{{ groomer.groomerDescription }}</td>
            </tr>
            <tr>
              <th>Aadress</th>
              <td>{{ groomer.streetName }} {{ groomer.houseNumber }}</td>
            </tr>
            <tr>
              <th>Kontakttelefon</th>
              <td>{{ groomer.groomerTelNumber }}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{{ groomer.groomerEmail }}</td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="row justify-content-center">
          <div class="col col-6">
            <AlertSuccess :success-message="successMessage"/>
            <table class="table">
              <thead>
              <tr>
                <th scope="col">Pakett</th>
                <th scope="col">Hind</th>
                <th scope="col"></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="procedure in groomer.procedures" :key="procedure.groomerProcedureId">
                <td>{{ procedure.procedureName }}</td>
                <td>{{ procedure.procedurePrice }}</td>
                <td>
                  <font-awesome-icon @click="addBookingRequest(procedure)"
                                     icon="cart-plus" class="cursor-pointer"/>
                </td>
              </tr>

              </tbody>
            </table>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col col-2">
            <button @click="navigateToCheckoutView" class="btn btn-success">Vaata ostuskorcik</button>
          </div>
        </div>
      </div>
    </div>


  </div>


</template>

<script>
import GroomerService from "@/services/GroomerService";
import {useRoute} from "vue-router";
import BookingService from "@/services/BookingService";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import Navigation from "@/navigations/Navigation";

export default {
  name: "GroomerDetailView",
  components: {AlertSuccess},
  data() {
    return {
      userId: Number(sessionStorage.getItem('userId')),
      groomerId: 0,
      error: '',
      successMessage: '',

      groomer: {
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
            groomerProcedureId: 0,
            procedureName: '',
            procedurePrice: 0
          }
        ]
      },

    }

  },
  methods: {

    navigateToCheckoutView() {
      Navigation.navigateToCheckoutView()
    },

    getGroomerDetails() {
      console.log('Laen groomeri andmeid ID-ga:', this.groomerId);
      GroomerService.getGroomerDetails(this.groomerId)
          .then(response => {
            console.log('Saadud groomer:', response.data);
            this.groomer = response.data;
          })
          .catch(() => {
            this.error = 'Ei leidnud lemmiklooma iluteenindaja andmeid';
          });
    },

    addBookingRequest(procedure) {
      BookingService.sendPostBookingGroomerProcedureRequest(this.userId, procedure.groomerProcedureId)
          .then(() => this.handleAddBookingRequestResponse(procedure))
          .catch()

    },

    handleAddBookingRequestResponse(procedure) {
      this.$emit('event-update-nav-menu')
      this.successMessage = 'Teenus ' + procedure.procedureName + ' hinnaga ' + procedure.procedurePrice + ' on edukalt ostukorvi listatud!'
      setTimeout(this.resetSuccessMessage, 3000)
    },

    resetSuccessMessage() {
      this.successMessage = ''
    },


  },
  beforeMount() {
    let groomerExists = useRoute().query.groomerId !== undefined
    if (groomerExists) {
      this.groomerId = Number(useRoute().query.groomerId);
      this.getGroomerDetails();
    } else {
      this.error = 'Vigane või puuduv groomer ID';
    }
  }
};
</script>
