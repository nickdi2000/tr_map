<template>
  <div class="backdrop backdrop-sepia">
    <div class="loaderDiv">
      <div class="loader" :class="enlarged ? 'enlarge' : ''"></div>
    </div>
    <h3 class="loading-text fade fadein">Loading...</h3>
  </div>
</template>

<script>
export default {
  props: {
    loading: false,
  },
  data() {
    return {
      enlarged: true,
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
.loading-text {
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.4rem;
  margin-left: 16px;
  margin-top: 12px;
  text-transform: uppercase;
  font-weight: 700;
  text-shadow: 2px 2px 4px #000000;
}
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.loaderDiv {
  position: absolute;

  top: 50%;
  left: 50%;
}
.enlarge {
  transform: scale(11.2);
}

/* HTML: <div class="loader"></div> */
.loader {
  width: 20px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #2b2525;
  box-shadow: 0 0 0 0 #0004;
  animation: l2 1.5s infinite linear;
  position: relative;
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 0 0 0 rgba(181, 178, 178, 0.267);
  animation: inherit;
  animation-delay: -0.5s;
}
.loader:after {
  animation-delay: -1s;
}
@keyframes l2 {
  100% {
    box-shadow: 0 0 0 40px #0000;
  }
}
</style>
