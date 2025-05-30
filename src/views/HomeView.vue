<template>
  <div id="groomingCarousel" class="carousel slide mb-5" data-bs-ride="carousel" data-bs-interval="5000">
    <div class="carousel-inner">

      <div class="carousel-item active banner-slide" style="background-image: url('/images/banner4.jpg')">
        <div class="banner-content right">
          <h2>Stiil ja mugavus sinu lemmikule</h2>
          <p>Professionaalne pesu ja lõikus igale lemmikule</p>

        </div>
      </div>

      <div class="carousel-item banner-slide" style="background-image: url('/images/banner5.jpg')">
        <div class="banner-content">
          <h2>Hoolime sinu lemmikust</h2>
          <p>Kogenud ja sõbralikud groomerid</p>

        </div>
      </div>

      <div class="carousel-item banner-slide" style="background-image: url('/images/banner7.jpg')">
        <div class="banner-content">
          <h2>Tule uuele välimusele!</h2>
          <p>Eripakkumised igal nädalal</p>

        </div>
      </div>

    </div>

    <button class="carousel-control-prev" type="button" data-bs-target="#groomingCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon"></span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#groomingCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon"></span>
    </button>
  </div>
</template>



<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
