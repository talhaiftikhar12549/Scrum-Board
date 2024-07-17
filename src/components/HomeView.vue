<script>
import Modal from "./addItemModal.vue";
import HeaderComponent from "./HeaderComponent.vue"
import BodyComponent from "./BodyComponent.vue"

export default {
  name: 'HomeView',
  components: {
    Modal,
    HeaderComponent,
    BodyComponent,
  },
  data() {
    return {
      openMod: 0,
    };
  },
  methods: {}
};
</script>


<template>
  <!--  Header with button and title-->
  <div>
  <header>
    <Modal/>
    <HeaderComponent/>
  </header>

  <!--    Body Component-->
  <main  class="bg-image-opacity  w-100" >
    <div>
      <BodyComponent/>
    </div>
  </main>
  </div>
</template>

<!--<style scoped>-->
<!--.bg-image-opacity{-->
<!--  position: relative;-->
<!--  width: 100vw;-->
<!--  height: 85vh;-->
<!--  background: url('../assets/scrum.svg') no-repeat center center;-->
<!--  background-size: cover;-->
<!--  opacity: 0.05;-->
<!--  /*z-index: -1;*/-->
<!--}-->
<!--/*.bg-image-opacity::before {*/-->
<!--/*  content: "";*/-->
<!--/*  position: absolute;*/-->
<!--/*  top: 50%;*/-->
<!--/*  left: 50%;*/-->
<!--/*  width: 80vw;*/-->
<!--/*  height: 80vh;*/-->
<!--/*  background: inherit;*/-->
<!--/*  opacity: 0.2; !* 20% opacity *!*/-->
<!--/*  z-index: -1;*/-->
<!--/*}*/-->
<!--</style>-->



<style scoped>
.bg-image-opacity {
  position: relative;
  width: 100vw;
  height: 85vh;
}

.bg-image-opacity::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('../assets/scrum.svg') no-repeat center center;
  background-size: cover;
  opacity: 0.05;
  z-index: -1;
}
</style>