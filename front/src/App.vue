<script setup lang="ts">
import { RouterView } from "vue-router";
import navBar from "@/components/navBar.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <navBar />
  <RouterView />
  <Footer />
</template>
