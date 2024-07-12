<template>
  <div class="w-9/12 mx-auto grid grid-cols-12 gap-6 rounded-2xl">
    <div class="col-span-3 bg-gray-50 shadow-xl rounded-lg p-3">
      <div class="flex flex-col gap-4">
        <div class="flex justify-center items-center">
          <img
            class="h-36 w-1/2 object-cover rounded-xl"
            :src="artist.profile_img"
            :alt="artist.name"
            referrerpolicy="no-referrer"
          />
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-xl font-semibold text-center capitalize">
            {{ artist.name }}
          </p>
          <div class="flex gap-4 justify-center flex-col">
            <div class="flex gap-2" v-if="artist.address">
              <svg-icon
                type="mdi"
                :path="mdiMapMarker"
                class="text-orange-500"
              ></svg-icon>
              <p>{{ artist.address }}</p>
            </div>
            <div class="flex gap-2" v-if="artist.description">
              <svg-icon
                type="mdi"
                :path="mdiStar"
                class="text-orange-500"
              ></svg-icon>
              <p>4.99 (20 avis)</p>
            </div>
          </div>
          <div class="mt-4 w-full h-[1px] bg-gray-300"></div>
          <p class="font-bold text-sm">Description </p>
          <p class="pl-2"> {{ artist.description }}</p>
          <div class="mt-4 w-full h-[1px] bg-gray-300"></div>
          <p class="font-bold text-sm">Réseaux Sociaux</p>
          <div class="flex pl-2 justify-around">
            <svg-icon
                type="mdi"
                :path="mdiInstagram"
                class="text-orange-500"
                size="40"
            ></svg-icon>
            <svg-icon
                type="mdi"
                :path="mdiLinkedin"
                class="text-orange-500"
                size="40"
            ></svg-icon>
            <svg-icon
                type="mdi"
                :path="mdiTwitter"
                class="text-orange-500"
                size="40"
            ></svg-icon>
          </div>
          <div class="mt-4 w-full h-[1px] bg-gray-300"></div>
          <p class="font-bold text-sm">Styles</p>
          <div class="flex flex-wrap px-2 gap-2">
            <span
              v-for="style in artist.styles"
              :key="style"
              class="px-4 py-2 border rounded-full text-gray-700 bg-white capitalize"
            >
              {{ style.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-9 h-screen grid grid-cols-12 gap-4">
      <FlashCard
        @click="item.is_booked ? '' : openDialog(item)"
        class="col-span-3"
        v-for="item in flashs"
        :flash="item"
        onArtistPage
      />
    </div>
    <Dialog ref="DialogContactArtist">
      <template #title>
        <div class="flex justify-between">
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
        <Reservation @closeDialog="closeDialog" :infoFlash="infoOneFlash" />
      </template>
    </Dialog>
    <ConfirmAlert v-if="confirmAlert" @close="confirmAlert = false">
      <template #title>
        Votre flash a bien été reservé
      </template>
    </ConfirmAlert>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import FlashCard from "@/components/FlashCard.vue";
import Reservation from "@/components/Reservation.vue";
import SvgIcon from "@jamescoyle/vue-icon";
import Dialog from "@/components/Dialog.vue";
import { mdiMapMarker, mdiStar, mdiInstagram, mdiLinkedin, mdiTwitter } from "@mdi/js";
import ConfirmAlert from "@/components/ConfirmAlert.vue";

const route = useRoute();

const artist = ref(null);
const flashs = ref([]);
const infoOneFlash = ref(null);

const DialogContactArtist = ref(null);
const confirmAlert = ref(false)

const openDialog = function (item) {
  DialogContactArtist.value.open();
  infoOneFlash.value = item;
};

const closeDialog = function () {
  DialogContactArtist.value.close();
  confirmAlert.value = true
  getFlashs();
};

const getFlashs = function () {
  fetch(`http://localhost:3000/api/artists/${route.params.id}`, {
    method: "get",
  }).then(async (result) => {
    artist.value = await result.json();
    flashs.value = await artist.value.flashs;
  });
};

getFlashs();
</script>
