<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiStar } from "@mdi/js";
import { mdiMapMarker } from "@mdi/js";
</script>

<template>
  <main class="bg-gray-100">
    <div
      class="bg-[url('.././assets/img/searchBackgroud.png')] h-72 flex items-center justify-center"
    >
      <h1 class="text-3xl text-white">Trouvez un tatoueur près de chez vous</h1>
    </div>

    <section class="mx-40 mt-10">
      <div>
        <div>
          <h2 class="text-2xl font-semibold">Tatoueurs en France</h2>
          <p class="text-lg">
            <span class="text-orange-500">2912</span> tatoueurs trouvés
          </p>
        </div>
        <div class="mt-2 mb-5">
          <hr class="h-0 bg-slate-400 rounded-lg" />

          <div class="grid grid-cols-2 mt-6">
            <article class="flex flex-col gap-4 bg-white">
              <img
                class="h-48 object-cover object-center"
                src="../assets/img/exempleArtist.jpg"
                alt=""
              />
              <p class="font-semibold text-center">Elena</p>
              <div class="flex gap-4 justify-center">
                <div class="flex gap-2">
                  <svg-icon
                    type="mdi"
                    :path="mdiMapMarker"
                    class="text-orange-500"
                  ></svg-icon>
                  <p>Annecy</p>
                </div>
                <div class="flex gap-2">
                  <svg-icon
                    type="mdi"
                    :path="mdiStar"
                    class="text-orange-500"
                  ></svg-icon>
                  <p>5.0 (7 avis)</p>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Assumenda, repellendus dolorem, deleniti sint accusamus ad nemo
                numquam tempore provident, nobis maiores inventore non natus
                vero?
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
