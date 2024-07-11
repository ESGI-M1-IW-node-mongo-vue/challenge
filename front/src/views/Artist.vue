<template>
  <div class="w-9/12 mx-auto grid grid-cols-12 gap-6">
    <div class="col-span-3 bg-gray-50">
      <ArtistsCard class="p-4" :artist="artist" artist-page />
    </div>
    <div class="col-span-9 h-screen bg-primary">

    </div>
  </div>
</template>
<script setup>
import ArtistsCard from "@/components/ArtistsCard.vue";
import {ref} from "vue";
import {useRoute} from "vue-router";

const route = useRoute()

const artist = ref(null)

fetch(`http://localhost:3000/api/artists/${route.params.id}`, {
  method: "get",
}).then(async(result) => {
  artist.value = await result.json()
})
</script>