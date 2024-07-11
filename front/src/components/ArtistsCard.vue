<template>
  <RouterLink
    :to="'/artist/' + artist._id"
    class="flex flex-col"
    :class="props.artistPage ? 'gap-4' : 'gap-6 bg-white'"
  >
    <div class="flex justify-center items-center">
      <img
        class="h-36 w-1/2 object-cover"
        :src="artist.profile_img"
        :alt="artist.name"
        referrerpolicy="no-referrer"
      />
    </div>
    <div
      class="flex flex-col"
      :class="props.artistPage ? 'gap-2' : 'gap-6 p-5 bg-white'"
    >
      <p class="text-xl font-semibold text-center">{{ artist.name }}</p>
      <div
        class="flex gap-4 justify-center"
        :class="props.artistPage ? 'flex-col' : ''"
      >
        <div class="flex gap-2">
          <svg-icon
            type="mdi"
            :path="mdiMapMarker"
            class="text-orange-500"
          ></svg-icon>
          <p>{{ artist.address }}</p>
        </div>
        <p v-if="!props.artistPage">|</p>
        <div class="flex gap-2">
          <svg-icon
            type="mdi"
            :path="mdiStar"
            class="text-orange-500"
          ></svg-icon>
          <p></p>
        </div>
      </div>
      <p v-if="!props.artistPage" :class="props.artistPage ? '' : 'mx-4'">
        {{ artist.description }}
      </p>
      <div
        v-if="props.artistPage"
        class="mt-4 w-full h-[1px] bg-gray-500"
      ></div>
      <p>{{ artist.description }}</p>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          v-for="style in artist.styles"
          :key="style"
          class="px-4 py-2 border rounded-full text-gray-700 bg-white capitalize"
        >
          {{ style.name }}
        </button>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiMapMarker, mdiStar } from "@mdi/js";
import { defineProps } from "vue";

const props = defineProps({
  artist: {
    type: Object,
    required: true,
  },
  artistPage: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
