<template>
  <div class="flex bg-white rounded-full">
    <input
      type="text"
      placeholder="Ville, code postal, tatoueur"
      class="rounded-full rounded-r-none pl-4 border-r-2 sm:w-96 w-20 focus:outline-none"
      v-model="location"
    />
    <select
      class="rounded-full capitalize rounded-l-none sm:w-56 w-20 focus:outline-none pl-3"
      v-model="selectedStyle"
    >
      <option value="">Sélectionner style</option>
      <option v-for="style in styles" :key="style._id" :value="style.name">
        {{ style.name }}
      </option>
    </select>
    <RouterLink
      :to="searchUrl"
      class="flex bg-primary m-1 p-3 rounded-full text-white hover:bg-opacity-50 transition-all ease-out"
    >
      <svg-icon type="mdi" :path="mdiMagnify"></svg-icon>
      Rechercher
    </RouterLink>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { mdiMagnify } from "@mdi/js";

const styles = ref([]);
const selectedStyle = ref({});
const location = ref("");
const searchUrl = computed(
  () => `/result?style=${selectedStyle.value}&location=${location.value}`
);

fetch("http://localhost:3000/api/styles")
  .then((res) => res.json())
  .then((data) => {
    styles.value = data;
    selectedStyle.value = "";
  });
</script>
