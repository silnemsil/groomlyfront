<template>
  <div>
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col col-6">
          <table class="table table-hover table-dark">
            <thead>
            <tr>
              <th scope="col">Teenus</th>
              <th scope="col">kirjeldus</th>
              <th scope="col">hind</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="booking in bookings">
              <td>{{ booking.procedureName }}</td>
              <td>{{ booking.procedureDescription }}</td>
              <td>{{ booking.price }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import BookingService from "@/services/BookingService";

export default {
  name: "CheckoutView",
  data() {
    return {
      bookingId: Number(sessionStorage.getItem('bookingId')),

      bookings: [
        {
          bookingProcedureId: 0,
          procedureName: '',
          procedureDescription: '',
          price: 0
        }
      ]
    }
  },
  methods: {
    getBookingBasketInfo() {
      BookingService.sendGetBookingBasketInfoRequest(this.bookingId)
          .then(response => this.bookings = response.data)
          .catch()
    },
  },
  beforeMount() {
    this.getBookingBasketInfo()
  }
}
</script>
