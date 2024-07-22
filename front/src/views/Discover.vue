<template>
  <main class="bg-gray-50">
    <div class="max-w-2xl mx-auto p-4">
      <div class="border-b border-gray-300 pb-4 mb-4">
        <h1 class="text-2xl font-semibold">
          Découvrez des flashs qui vous ressemblent
        </h1>
      </div>
      <div class="space-y-8">
        <div
          v-for="flash in flashes"
          :key="flash._id"
          class="bg-white border border-gray-300 rounded-lg"
        >
          <div class="flex items-center p-4">
            <img
              :src="flash.artist.profile_img"
              alt="Artist Profile"
              class="w-10 h-10 rounded-full"
            />
            <div class="ml-4">
              <RouterLink
                class="font-semibold cursor-pointer"
                :to="'/artist/' + flash.artist._id"
                >{{ flash.artist.name }}</RouterLink
              >
              <p class="text-sm text-gray-600">{{ flash.artist.address }}</p>
            </div>
          </div>
          <RouterLink
            class="font-semibold cursor-pointer"
            :to="'/artist/' + flash.artist._id"
          >
            <img :src="flash.img" alt="Flash Image" class="w-full" />
          </RouterLink>
          <div class="p-4">
            <div class="flex items-center justify-between">
              <div class="flex space-x-4">
                <button>
                  <svg
                    class="w-6 h-6 text-gray-600 hover:text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 15l7-7 7 7"
                    ></path>
                  </svg>
                </button>
                <button>
                  <svg
                    class="w-6 h-6 text-gray-600 hover:text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 12h8m-4-4v8"
                    ></path>
                  </svg>
                </button>
                <button>
                  <svg
                    class="w-6 h-6 text-gray-600 hover:text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 12l-4-4-4 4m4 4V8"
                    ></path>
                  </svg>
                </button>
              </div>
              <button>
                <svg
                  class="w-6 h-6 text-gray-600 hover:text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 19h14M5 12h14M5 5h14"
                  ></path>
                </svg>
              </button>
            </div>
            <p class="pt-4 text-sm">
              <span class="font-semibold">{{ flash.artist.name }}</span>
              {{ flash.description }}
            </p>
            <p class="pt-1 text-sm">Price: {{ flash.price }}€</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";

const flashes = ref<[]>([]);

fetch("http://localhost:3000/api/artists?populate=flashs", { method: "GET" })
  .then((response) => response.json())
  .then((data) => {
    const allFlashes = data.flatMap(
      (artist: IArtist) =>
        artist.flashs?.map((flash: IFlash) => ({ ...flash, artist })) || []
    );

    flashes.value = allFlashes.sort((a, b) => b._id.localeCompare(a._id));
  })
  .catch((err) => console.error(err));
</script>
