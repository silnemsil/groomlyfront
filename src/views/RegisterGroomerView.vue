<template>
  <RegistrationForm :roleId="2" />
</template>

<script>
import RegistrationForm from '@/components/RegistrationForm.vue'

export default {
  components: { RegistrationForm },
  data() {
    return {
      roleId: 2
    }
  }
}
</script>
