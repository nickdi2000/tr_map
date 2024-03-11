<template>
  <div v-if="show" class="fade fadeinUp customModal backdrop-blur-lg">
    <div class="card-body">
      <slot></slot>
    </div>
    <div>
      <button
        class="mt-10 bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="$emit('update:show', false)"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.customModal {
  position: fixed;
  top: 20%;

  left: 10%;
  background: rgba(23, 31, 62, 0.638);
  width: 80%;
  padding: 2rem;
  border-radius: 3rem;
  z-index: 2;
}

.card-body {
  max-height: 50vh;
  overflow: scroll;
}
</style>
