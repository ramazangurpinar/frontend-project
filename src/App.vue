<template>
  <div class="container">
    <h1 class="text-center mt-5 text-info">
      Products
    </h1>
    <router-view v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="$route.fullPath" />
      </Transition>
    </router-view>

  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    this.$store.dispatch("getProducts");
  },
};
</script>

<style>
html {
  height: 100% !important;
}

body {
  background-color: #002436;
}

/* Vue 3 transition class names */
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateX(50px) scale(0.98);
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}
</style>
