<template>
  <article class="flex flex-col gap-6 bg-white">
    <img
        class="h-48 object-cover object-center"
        :src="artist.profile_img"
        :alt="artist.name"
        referrerpolicy="no-referrer"
    />
    <div class="flex flex-col gap-6 bg-white p-5">
      <p class="text-xl font-semibold text-center">{{ artist.name }}</p>
      <div class="flex gap-4 justify-center">
        <div class="flex gap-2">
          <svg-icon
              type="mdi"
              :path="mdiMapMarker"
              class="text-orange-500"
          ></svg-icon>
          <p>{{ artist.address }}</p>
        </div>
        <p>|</p>
        <div class="flex gap-2">
          <svg-icon
              type="mdi"
              :path="mdiStar"
              class="text-orange-500"
          ></svg-icon>
          <p>{{ artist.rating }} ({{ artist.reviews }} avis)</p>
        </div>
      </div>
      <p class="mx-4 sm:mx-10">{{ artist.description }}</p>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
            v-for="style in artist.styles"
            :key="style"
            class="px-4 py-2 border rounded-full text-gray-700 bg-white"
        >
          {{ style }}
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiStar, mdiMapMarker } from "@mdi/js";
import { defineProps } from "vue";

const props = defineProps({
  artist: {
    type: Object,
    required: true
  },
  artistPage:{
    type:Boolean,
    required: false,
    default: false
  }
});
</script>
