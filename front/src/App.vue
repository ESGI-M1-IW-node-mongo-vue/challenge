<script setup lang="ts">
import {RouterView, useRoute} from "vue-router";
import {computed} from "vue";
import navBar from "@/components/navBar.vue";

const route = useRoute();
const isAdmin = computed(() => route.path.includes("admin"));

</script>

<template>
  <navBar v-if="!isAdmin" />
  <RouterView />
</template>
