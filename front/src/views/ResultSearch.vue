<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiStar } from "@mdi/js";
import { mdiMapMarker } from "@mdi/js";
import Reservation from "@/components/Reservation.vue";
</script>

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
              <span class="text-orange-500">2912</span> tatoueurs trouvés
            </p>
          </div>
          <div class="mt-2 mb-5">
            <hr class="h-0 bg-slate-400 rounded-lg" />

            <div class="grid grid-cols-1 sm:grid-cols-2 mt-6 gap-4">
              <article class="flex flex-col gap-6 bg-white">
                <img
                  class="h-48 object-cover object-center"
                  src="../assets/img/exempleArtist.jpg"
                  alt=""
                />
                <div class="flex flex-col gap-6 bg-white p-5">
                  <p class="text-xl font-semibold text-center">Elena</p>
                  <div class="flex gap-4 justify-center">
                    <div class="flex gap-2">
                      <svg-icon
                        type="mdi"
                        :path="mdiMapMarker"
                        class="text-orange-500"
                      ></svg-icon>
                      <p>Annecy</p>
                    </div>
                    <p>|</p>
                    <div class="flex gap-2">
                      <svg-icon
                        type="mdi"
                        :path="mdiStar"
                        class="text-orange-500"
                      ></svg-icon>
                      <p>5.0 (7 avis)</p>
                    </div>
                  </div>
                  <p class="mx-4 sm:mx-10">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Assumenda, repellendus dolorem, deleniti sint accusamus ad
                    nemo numquam tempore provident, nobis maiores inventore non
                    natus vero?
                  </p>
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      class="px-4 py-2 border rounded-full text-gray-700 bg-white"
                    >
                      Animal
                    </button>
                    <button
                      class="px-4 py-2 border rounded-full text-gray-700 bg-white"
                    >
                      Animal
                    </button>
                    <button
                      class="px-4 py-2 border rounded-full text-gray-700 bg-white"
                    >
                      Animal
                    </button>
                    <button
                      class="px-4 py-2 border rounded-full text-gray-700 bg-white"
                    >
                      Animal
                    </button>
                    <button
                      class="px-4 py-2 border rounded-full text-gray-700 bg-white"
                    >
                      Animal
                    </button>
                    <button
                      class="px-4 py-2 border rounded-full text-gray-700 bg-white"
                    >
                      Animal
                    </button>
                  </div>
                </div>
              </article>
              <article class="flex flex-col gap-6 bg-white">
                <img
                  class="h-48 object-cover object-center"
                  src="../assets/img/exempleArtist.jpg"
                  alt=""
                />
                <div class="flex flex-col gap-6 bg-white p-5">
                  <p class="text-xl font-semibold text-center">Elena</p>
                  <div class="flex gap-4 justify-center">
                    <div class="flex gap-2">
                      <svg-icon
                        type="mdi"
                        :path="mdiMapMarker"
                        class="text-orange-500"
                      ></svg-icon>
                      <p>Annecy</p>
                    </div>
                    <p>|</p>
                    <div class="flex gap-2">
                      <svg-icon
                        type="mdi"
                        :path="mdiStar"
                        class="text-orange-500"
                      ></svg-icon>
                      <p>5.0 (7 avis)</p>
                    </div>
                  </div>
                  <p class="mx-4 sm:mx-10">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Assumenda, repellendus dolorem, deleniti sint accusamus ad
                    nemo numquam tempore provident, nobis maiores inventore non
                    natus vero?
                  </p>
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                    <button
                      class="px-4 py-2 border rounded-full text-gray-700 bg-white"
                    >
                      Animal
                    </button>
                    <button
                      class="px-4 py-2 border rounded-full text-gray-700 bg-white"
                    >
                      Animal
                    </button>
                    <button
                      class="px-4 py-2 border rounded-full text-gray-700 bg-white"
                    >
                      Animal
                    </button>
                    <button
                      class="px-4 py-2 border rounded-full text-gray-700 bg-white"
                    >
                      Animal
                    </button>
                    <button
                      class="px-4 py-2 border rounded-full text-gray-700 bg-white"
                    >
                      Animal
                    </button>
                    <button
                      class="px-4 py-2 border rounded-full text-gray-700 bg-white"
                    >
                      Animal
                    </button>
                  </div>
                </div>
              </article>
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
              class="px-4 py-2 border rounded-full text-gray-700 bg-white"
            >
              test
            </button>
            <button
              class="px-4 py-2 border rounded-full text-gray-700 bg-white"
            >
              Animal
            </button>
            <button
              class="px-4 py-2 border rounded-full text-gray-700 bg-white"
            >
              Animal
            </button>
            <button
              class="px-4 py-2 border rounded-full text-gray-700 bg-white"
            >
              Animal
            </button>
            <button
              class="px-4 py-2 border rounded-full text-gray-700 bg-white"
            >
              Animal
            </button>
            <button
              class="px-4 py-2 border rounded-full text-gray-700 bg-white"
            >
              Animal
            </button>
            <button
              class="px-4 py-2 border rounded-full text-gray-700 bg-white"
            >
              Animal
            </button>
            <button
              class="px-4 py-2 border rounded-full text-gray-700 bg-white"
            >
              Animal
            </button>
            <button
              class="px-4 py-2 border rounded-full text-gray-700 bg-white"
            >
              Animal
            </button>
          </article>
        </div>
      </section>
    </div>
  </main>
  <Reservation />
</template>
