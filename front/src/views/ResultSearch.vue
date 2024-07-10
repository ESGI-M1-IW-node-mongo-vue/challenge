<template>
  <main class="bg-gray-100">
    <div
        class="bg-[url('.././assets/img/searchBackgroud.png')] h-72 flex items-center justify-center"
    >
      <h1 class="text-3xl text-white">Trouvez un tatoueur près de chez vous</h1>
    </div>

    <div class="grid grid-cols-6 mx-40 mt-10 gap-10">
      <section class="col-span-5">
        <div>
          <div>
            <h2 class="text-2xl font-semibold">Tatoueurs en France</h2>
            <p class="text-lg">
              <span class="text-orange-500">{{ allArtists.length }}</span> tatoueurs trouvés
            </p>
          </div>
          <div class="mt-2 mb-5">
            <hr class="h-0 bg-slate-400 rounded-lg" />

            <div class="grid grid-cols-1 sm:grid-cols-2 mt-6 gap-4">
              <ArtistCard v-for="artist in allArtists" :key="artist._id" :artist="artist" />
            </div>
          </div>
        </div>
      </section>
      <section class="col-span-1">
        <div>
          <p class="text-2xl font-semibold">Filtrer par style</p>
          <hr class="h-0 bg-slate-400 rounded-lg mt-2" />
          <article class="flex flex-wrap gap-1 text-sm pt-5">
            <button
                v-for="style in styles"
                :key="style.id"
                class="px-4 py-2 border rounded-full text-gray-700 bg-white"
            >
              {{ style.name }}
            </button>
          </article>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import ArtistCard from '../components/ArtistsCard.vue';

const styles = ref([]);
const allArtists = ref([]);

fetch("http://localhost:3000/api/styles")
    .then((res) => res.json())
    .then((data) => (styles.value = data));

fetch("http://localhost:3000/api/artists")
    .then((res) => res.json())
    .then((data) => {
      console.log("Artists data:", data);
      allArtists.value = data;
    });
</script>
