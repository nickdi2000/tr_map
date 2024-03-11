<template>
  <span>
    <Nav
      class="fade fadein"
      v-if="inspecting"
      @search="inspecting = !inspecting"
    />
    <header class="absolute inset-x-0 top-0">
      <div class="container mx-auto flex justify-end p-4">
        <Map :coords="coords" :inspecting="inspecting" />
      </div>
    </header>
    <!-- 
    <div class="place-card">
      <h3 class="text-white text-3xl fade fadeinUp font-bold">
        Trivia in {{ placeData.name }}
      </h3>
    </div> -->
    <div
      :class="inspecting ? 'top-spot' : 'middle-spot max-w-3xl'"
      class="spot mx-auto flex h-screen flex-col items-center justify-center py-16 px-4"
    >
      <!-- <img src="/images/logo.png" class="logo-image" /> -->
      <div
        class="fade fadein box w-full shadow-lg shadow-black p-3 backdrop-blur-sm"
      >
        <div class="flex justify-end">
          <button
            @click="inspecting = !inspecting"
            class="from-gray-500 rounded-md to-gray-500 opacity-50 bg-gradient-to-br px-2 text-gray-800"
          >
            X
          </button>
        </div>
        <h5
          v-if="!inspecting"
          class="rounded-md p-2 text-center font-bold text-2xl text-gray-700 transition-colors text-white"
        >
          Where's the Trivia At?
        </h5>

        <div class="my-4 w-full">
          <AutoComplete @changed="handleCoordsChange" />
        </div>

        <div class="flex justify-center align-items-center space-x-4 pb-10">
          <!-- <button
            type="button"
            @click="inspecting = !inspecting"
            class="text-white bg-gradient-to-r font-bold text-lg from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Search
          </button> -->

          <div>
            <div class="text-center mt-4 text-xs text-gray-400">OR</div>
            <button
              @click="getUserLocation()"
              class="flex mt-3 text-white bg-gradient-to-r font-bold from-gray-700 to-gray-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>

              <span class="text-lg">Use Current Location</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <Loader v-if="loading" />
  </span>
</template>

<script>
import { currentTheme, initTheme, switchTheme } from "@/composables/theme.js";
import { defineComponent } from "vue";
import Map from "@/components/Map.vue";
import AutoComplete from "@/components/AutoComplete.vue";
import Loader from "@/components/Loader.vue";
import Nav from "@/components/Nav.vue";

export default defineComponent({
  components: { Map, AutoComplete, Loader, Nav },
  computed: {
    theme() {
      return currentTheme.value;
    },
  },
  methods: {
    switchThemeMethod() {
      switchTheme();
    },
    handleCoordsChange(placeData) {
      this.inspecting = true;
      const coords = {
        lat: placeData.geometry.location.lat(),
        lng: placeData.geometry.location.lng(),
      };
      this.placeData = placeData;
      this.coords = coords;
    },
    getUserLocation() {
      this.loading = true;
      this.inspecting = true;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.loading = false;
        });
      }
    },
    inspect() {
      this.inspecting = false;
    },
  },
  mounted() {
    initTheme();
  },
  data() {
    return {
      coords: { lat: 43.01107, lng: -79.617015 },
      placeData: {},
      inspecting: false,
      loading: false,
    };
  },
});
</script>

<style>
body {
  @apply dark:bg-gray-900 dark:text-gray-50;
}

.spot {
  transition: all 0.2s ease;
}

.top-spot {
  top: 0;
  position: absolute;
  height: 200px;
  width: 100vw;
  opacity: 0;
}

.logo-image {
  width: 80px;
  opacity: 0.8;
  height: auto;
  margin: 0 auto;
  display: block;
  border-radius: 10%;
  margin-bottom: 20px;
}

.place-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  padding: 90px;
}
</style>
