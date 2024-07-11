<template>
  <main class="bg-gray-100">
    <div
      class="bg-[url('.././assets/img/searchBackgroud.png')] h-72 flex items-center flex-col gap-5 justify-center"
    >
      <h1 class="text-3xl text-white">
        Trouvez un {{ isFlash ? "flash" : "tatoueur" }} près de chez vous
      </h1>
      <SearchBar />
      <div class="text-white text-xl text-shadow flex gap-2 items-center mb-3">
        <p>Tatoueurs</p>
        <Switch
          v-model="isFlash"
          :class="[
            isFlash ? 'bg-orange-500' : 'bg-gray-200',
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
          ]"
        >
          <span class="sr-only">Toggle flash</span>
          <span
            aria-hidden="true"
            :class="[
              isFlash ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            ]"
          />
        </Switch>
        <p>Flashs</p>
      </div>
    </div>

    <div class="grid grid-cols-6 mx-40 mt-10 gap-10">
      <section class="col-span-5">
        <div>
          <div>
            <h2 class="text-2xl font-semibold">
              {{ isFlash ? "Flashs" : "Tatoueurs" }} en France
            </h2>
            <p class="text-lg">
              <span class="text-orange-500">{{ allObject.length }}</span>
              {{ isFlash ? "flashs" : "tatoueurs" }} trouvés
            </p>
          </div>
          <div class="mt-2 mb-5">
            <hr class="h-0 bg-slate-400 rounded-lg" />

            <div
              class="grid grid-cols-1 sm:grid-cols-2 mt-6 gap-4"
              v-if="!isFlash"
            >
              <ArtistCard
                v-for="artist in allObject"
                :key="artist._id"
                :artist="artist"
              />
            </div>
            <div
              class="grid grid-cols-1 sm:grid-cols-4 mt-6 gap-4"
              v-if="isFlash"
            >
              <FlashCard
                v-for="flash in allObject"
                :key="flash._id"
                :flash="flash"
                :disableControls="true"
              />
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
              @click="filterStyle(style)"
              class="px-4 py-2 border rounded-full capitalize"
              :class="{
                'bg-orange-500 text-white': style._id === route.query.style,
                'bg-gray-200 text-gray-700': style._id !== route.query.style,
              }"
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
import { ref, watch } from "vue";
import ArtistCard from "../components/ArtistsCard.vue";
import FlashCard from "../components/FlashCard.vue";
import { useRoute, useRouter } from "vue-router";
import SearchBar from "@/components/SearchBar.vue";
import { Switch } from "@headlessui/vue";

const isFlash = ref(false);

const styles = ref([]);
const allObject = ref([]);

const route = useRoute();
const router = useRouter();

const filterStyle = (clickedStyle) => {
  if (clickedStyle._id === route.query.style) {
    router.push({
      query: {
        ...route.query,
        style: undefined,
      },
    });
    return;
  }
  router.push({
    query: {
      ...route.query,
      style: clickedStyle._id,
    },
  });
};

watch(isFlash, () => {
  router.push({
    query: {
      ...route.query,
      flashOrArtist: isFlash.value ? "flash" : "artist",
    },
  });
});

watch(route, () => {
  const location = route.query.location;
  const style = route.query.style;

  const searchParams = new URLSearchParams();

  if (location) searchParams.append("location", location);
  if (style) searchParams.append("style", style);
  searchParams.append("populate", "style");

  const fetchUrl = isFlash.value
    ? "http://localhost:3000/api/flashs"
    : "http://localhost:3000/api/artists";

  fetch(
    `${fetchUrl}${searchParams.toString() ? "?" : ""}${searchParams.toString()}`
  )
    .then((res) => res.json())
    .then((data) => (allObject.value = data));
});

fetch("http://localhost:3000/api/styles")
  .then((res) => res.json())
  .then((data) => (styles.value = data));

fetch(
  "http://localhost:3000/api/artists?" +
    new URLSearchParams({ ...route.query, populate: "style" }).toString(),
)
  .then((res) => res.json())
  .then((data) => (allObject.value = data));
</script>
