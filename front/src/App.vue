<script setup lang="ts">
import {RouterView, useRoute} from "vue-router";
import Header from "@/components/Header.vue";
import {computed} from "vue";

const route = useRoute();
const isAdmin = computed(() => route.path.includes("admin"));

</script>

<template>
  <Header v-if="!isAdmin" />
  <RouterView />
</template>
