<template>
  <div v-if="groomer && groomer.groomerId">
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
  <div v-else>
    <p>{{ error || 'Laen andmeid...' }}</p>
  </div>
</template>

<script>
import GroomerService from "@/services/GroomerService";

export default {
  name: "GroomerDetailView",
  data() {
    return {
      groomerId: null,
      groomer: null,
      error: null
    };
  },
  methods: {
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
    }
  },
  mounted() {
    this.groomerId = Number(this.$route.query.groomerId);
    if (this.groomerId) {
      this.getGroomerDetails();
    } else {
      this.error = 'Vigane või puuduv groomer ID';
    }
  }
};
</script>
