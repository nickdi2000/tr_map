<template>
  <div class="dark bg-white dark:bg-gray-900">
    <!-- Navbar -->
    <nav class="bg-gray-800 text-white p-4">
      <div class="container mx-auto flex items-center justify-between">
        <a class="text-white py-2 px-4" href="/">Home</a>
        <div class="flex">
          <!-- Add more navigation links here -->
          <router-link class="text-white py-2 px-4" to="/about"
            >About</router-link
          >
          <router-link class="text-white py-2 px-4" to="/contact"
            >Contact</router-link
          >
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="bg-gray-700 text-white">
      <router-view></router-view>
      <!-- This is where child routes/components will be rendered -->
    </main>
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
};
</script>

<style>
/* Global styles or scoped styles for App.vue */
</style>
