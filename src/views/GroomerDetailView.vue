<template>
<div>
  <h2>{{groomer.groomerName}}</h2>
  <p>{{groomer.groomerDescription}}</p>
  <p>Aadress: {{groomer.g}}</p>
  <p>Kontakttelefon: {{groomer.groomerTelNumber}}</p>
  <p>Email: {{groomer.groomerEmail}}</p>
</div>

</template>

<script>
export default {
  name: "GroomerDetailView",

  data() {
    return{
      groomer: null,
      error:null
    }

  },

}
</script>



