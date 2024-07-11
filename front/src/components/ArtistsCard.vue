<template>
  <div class="flex flex-col" :class="props.artistPage ? 'gap-4' : 'gap-6 bg-white'">
    <div class="flex justify-center items-center">
      <img
          class="h-36 w-1/2 object-cover"
          :src="artist.profile_img"
          :alt="artist.name"
          referrerpolicy="no-referrer"
      />
    </div>
    <div class="flex flex-col" :class="props.artistPage ? 'gap-2' : 'gap-6 p-5 bg-white'">
      <p class="text-xl font-semibold text-center">{{ artist.name }}</p>
      <div class="flex gap-4 justify-center" :class="props.artistPage ? 'flex-col' : ''">
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
      <p v-if="!props.artistPage" :class="props.artistPage ? '' : 'mx-4'">{{ artist.description }}</p>
      <div v-if="props.artistPage" class="mt-4 w-full h-[1px] bg-gray-500"></div>
      <div v-if="props.artistPage" class="flex flex-col gap-y-2 items-center justify-center">
        <p class="font-bold text-lg">Contact</p>
        <div class="flex items-center gap-x-8">
          <div class="flex items-center justify-center px-4 py-2 cursor-pointer bg-black text-white rounded-full">
            Téléphone
          </div>
          <div @click="openDialog" class="flex items-center justify-center px-4 py-2 cursor-pointer bg-primary text-white rounded-full">
            Réserver
          </div>
        </div>
      </div>
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
    <Dialog ref="DialogContactArtist">
      <template #title>
        <div class="flex justify-between">
          <div></div>
          <div @click="closeDialog()" class="cursor-pointer z-50">
            <svg-icon
                type="mdi"
                :path="mdiClose"
                class="text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-xl"
            ></svg-icon>
          </div>
        </div>
      </template>
      <template #content>
        <Reservation />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiStar, mdiMapMarker } from "@mdi/js";
import {defineProps, ref} from "vue";
import Dialog from "@/components/Dialog.vue";
import Reservation from "@/components/Reservation.vue";

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

const DialogContactArtist = ref(null)

const openDialog = function () {
  DialogContactArtist.value.open();
};

const closeDialog = function () {
  DialogContactArtist.value.close();
};
</script>
