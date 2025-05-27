<template>
  <select
      :value="selectedCityId"
      @change="handleCityDropdownChange"
      class="form-select"
      aria-label="Linnavalik"
  >
    <option :selected="selectedCityId === 0" value="0">{{ defaultOptionLabel }}</option>
    <option
        v-for="city in cities"
        :key="city.cityId"
        :value="city.cityId"
    >
      {{ city.cityName }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'CitiesDropdown',
  props: {
    cities: {
      type: Array,
      required: true
    },
    selectedCityId: {
      type: Number,
      default: 0
    },
    defaultOptionLabel: {
      type: String,
      default: 'Kõik linnad'
    }
  },
  methods: {
    handleCityDropdownChange(event) {
      this.$emit('event-new-city-selected', Number(event.target.value))
    }
  }
}
</script>
