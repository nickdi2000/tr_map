<template>
  <div>
    <vue-google-autocomplete
      id="map"
      v-model="query"
      class="block font-bold text-lg w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
      placeholder="Search City..."
      v-on:placechanged="getAddressData"
      types="(cities)"
    >
    </vue-google-autocomplete>
  </div>
</template>

<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";

export default {
  components: {
    VueGoogleAutocomplete,
  },
  emits: ["changed"],
  data() {
    return {
      address: "",
      placeResult: "",
      query: "",
    };
  },
  methods: {
    getAddressData(addressData, placeResultData) {
      //console.log(addressData);
      console.log(placeResultData);
      this.placeResult = placeResultData;
      const cords = {
        lat: placeResultData.geometry.location.lat(),
        lng: placeResultData.geometry.location.lng(),
      };
      console.log("Cords", cords);
      this.$emit("changed", placeResultData);
    },
  },
};
</script>
