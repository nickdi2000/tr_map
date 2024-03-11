<template>
  <div class="loaderDiv">
    <div
      v-if="inspecting"
      class="fade fadeinUp marker-label mb-4 bg-gray-900 text-white p-2 rounded-sm"
    >
      {{ marker.name }}
    </div>
    <div class="loader" :class="enlarged ? 'enlarge' : ''"></div>
  </div>
</template>

<script>
export default {
  props: {
    inspecting: false,
    marker: Object,
  },
  data() {
    return {
      enlarged: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.enlarged = true;
    }, 200);
  },
};
</script>
<style scoped>
.loader {
  width: 40px;
  aspect-ratio: 1;
  position: relative;
  transform: rotate(45deg);
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50% 50% 0 50%;
  background: #c0efff;
  -webkit-mask: radial-gradient(circle 10px at 50% 50%, #0000 94%, #000);
}
.loader:after {
  animation: l6 1s infinite;
  transform: perspective(300px) translateZ(0px);
}
@keyframes l6 {
  to {
    transform: perspective(300px) translateZ(150px);
    opacity: 0;
  }
}
</style>
