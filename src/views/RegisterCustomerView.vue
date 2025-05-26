<template>
  <RegistrationForm :roleId="3" />
</template>

<script>
import RegistrationForm from '@/components/RegistrationForm.vue'

export default {
  components: { RegistrationForm },
  data() {
    return {
      roleId: 3
    }
  }
}
</script>
