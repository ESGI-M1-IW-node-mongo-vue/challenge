<template>
  <div class="container mx-auto grid grid-cols-12">
    <div class="col-span-2">
      <ArtistsCard :artist="artist" artist-page />
    </div>
    <div class="col-span-10">

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