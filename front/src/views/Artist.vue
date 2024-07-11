<template>
  <div class="w-9/12 mx-auto grid grid-cols-12 gap-6">
    <div class="col-span-3 bg-gray-50 shadow-xl rounded-lg">
      <ArtistsCard class="p-4" :artist="artist" artist-page />
    </div>
    <div class="col-span-9 h-screen grid grid-cols-12 gap-4">
      <FlashCard @click="item.is_booked ? '' : openDialog(item)" class="col-span-3" v-for="item in flashs" :flash="item" onArtistPage />
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
  </div>
</template>
<script setup>
import ArtistsCard from "@/components/ArtistsCard.vue";
import {ref} from "vue";
import {useRoute} from "vue-router";
import FlashCard from "@/components/FlashCard.vue";
import Reservation from "@/components/Reservation.vue";
import SvgIcon from "@jamescoyle/vue-icon";
import Dialog from "@/components/Dialog.vue";

const route = useRoute()

const artist = ref(null)
const flashs = ref([])
const infoOneFlash = ref(null)

const DialogContactArtist = ref(null)

const openDialog = function (item) {
  DialogContactArtist.value.open();
  infoOneFlash.value = item
};

const closeDialog = function () {
  DialogContactArtist.value.close();
  getFlashs()
};

const getFlashs = function (){
  fetch(`http://localhost:3000/api/artists/${route.params.id}`, {
    method: "get",
  }).then(async(result) => {
    artist.value = await result.json()
    flashs.value = await artist.value.flashs
  })
}

getFlashs()
</script>