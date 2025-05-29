<template>
  <div v-if="groomer">
    <h2>{{ groomer.groomerName }}</h2>
    <p>{{ groomer.groomerDescription }}</p>
    <p>Aadress: {{ groomer.streetName }} {{ groomer.houseNumber }}</p>
    <p>Kontakttelefon: {{ groomer.groomerTelNumber }}</p>
    <p>Email: {{ groomer.groomerEmail }}</p>
  </div>
  <div v-else>
    <p>{{ error || 'Laen andmeid...' }}</p>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import GroomerService from "@/services/GroomerService";

export default {
  name: "GroomerDetailView",

  data() {
    return {
      groomer: null,
      groomerId: null,
      error: null
    }
  },

  methods: {
    getGroomerDetails() {
      GroomerService.getGroomerDetails(this.groomerId)
          .then(response => {
            this.groomer = response.data
          })
          .catch(() => {
            this.error = 'Ei leidnud lemmiklooma iluteenindaja andmeid'
          })
    }
  },

  beforeMount() {
    this.groomerId = Number(this.$route.query.groomerId);

    if (this.groomerId) {
      this.getGroomerDetails();
    } else {
      this.error = 'Vastava ID-ga groomer puudub';
    }
  }
}
</script>
