<template>
  <table class="table table-striped">
    <thead>
    <tr>
      <th>Nimi</th>
      <th>Kirjeldus</th>
      <th>Telefon</th>
      <th>Email</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="groomer in groomers" :key="groomer.groomerId">
      <td>{{ groomer.groomerName }}</td>
      <td>{{ groomer.groomerDescription }}</td>
      <td>{{ groomer.groomerTelNumber }}</td>
      <td>{{ groomer.groomerEmail }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'GroomersTable',
  props: {
    groomers: {
      type: Array,
      default: () => []
    }
  }
}
</script>
