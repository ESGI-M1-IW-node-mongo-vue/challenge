<template>
  <div class="flex bg-white rounded-full">
    <input
        type="text"
        placeholder="Ville, code postal, tatoueur"
        class="rounded-full rounded-r-none pl-4 sm:w-96 w-20 no-focus no-border"
        v-model="location"
    />
    <select
        class="rounded-full capitalize rounded-l-none sm:w-56 w-20 pl-3 no-border no-focus"
        v-model="selectedStyle"
    >
      <option value="">Sélectionner style</option>
      <option v-for="style in styles" :key="style._id" :value="style._id">
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
import SvgIcon from "@jamescoyle/vue-icon";
import { computed, ref } from "vue";
import { mdiMagnify } from "@mdi/js";

const styles = ref([]);
const selectedStyle = ref("");
const location = ref("");
const searchUrl = computed(() => {
  const searchParams = new URLSearchParams();
  if (selectedStyle.value) {
    searchParams.append("style", selectedStyle.value);
  }
  if (location.value) {
    searchParams.append("location", location.value);
  }

  searchParams.append("flashOrArtist", "flash");

  return `/result${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
});

fetch("http://localhost:3000/api/styles")
    .then((res) => res.json())
    .then((data) => {
      styles.value = data;
      selectedStyle.value = "";
    });
</script>

<style>
.no-border {
  border: none !important;
}
.no-focus:focus {
  outline: none !important;
  box-shadow: none !important;
}
.input-border-right {
  border-right: 2px solid #FFFFFF;
}
</style>
