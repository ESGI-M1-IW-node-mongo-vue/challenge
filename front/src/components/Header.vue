<template>
  <div class="h-screen relative">
    <div class="flex justify-center items-center">
      <img
        src="../assets/img/fond.jpg"
        alt="fond tattoo"
        class="w-full h-full object-cover"
        style="height: calc(100vh - 80px)"
      />
      <div
        class="absolute top-0 left-0 w-full bg-black opacity-50"
        style="height: calc(100vh - 80px)"
      ></div>

      <div
        class="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center"
      >
        <h1 class="text-white mb-4 text-6xl">
          Trouvez votre flash et votre tatoueur
        </h1>
        <h2 class="text-white mb-10 text-xl">
          La plus grande sélection de flash prêts à vous accueillir
        </h2>
        <SearchBar class="mb-32" />
        <h3 class="text-white text-2xl">
          Réservez votre futur flash en 3 clics
        </h3>
      </div>
    </div>
    <div
      class="absolute left-1/2 bottom-0 -translate-x-1/2 bg-white rounded-lg p-12 w-5/6 flex items-center justify-center gap-4 shadow-lg translate-y-5"
    >
      <div class="flex flex-col items-start text-start">
        <svg-icon
          type="mdi"
          :path="mdiMagnify"
          class="text-primary mb-2"
          size="50"
        ></svg-icon>
        <h4 class="font-bold text-xl mb-2">Recherchez votre flash</h4>
        <p class="text-gray-400">
          Recherchez un flash selon les critères que vous souhaitez.
        </p>
      </div>
      <div class="flex flex-col items-start text-start">
        <svg-icon
          type="mdi"
          :path="mdiMessageFast"
          class="text-primary mb-2"
          size="50"
        ></svg-icon>
        <h4 class="font-bold text-xl mb-2">Entrez en contact</h4>
        <p class="text-gray-400">
          Contactez votre futur tatoueur par téléphone ou via notre formulaire.
        </p>
      </div>
      <div class="flex flex-col items-start text-start">
        <svg-icon
          type="mdi"
          :path="mdiCalendarBlankMultiple"
          class="text-primary mb-2"
          size="50"
        ></svg-icon>
        <h4 class="font-bold text-xl mb-2">Prenez rendez-vous</h4>
        <p class="text-gray-400">
          Convenez d’un rendez-vous avec votre prochain tatoueur.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCalendarBlankMultiple, mdiMagnify, mdiMessageFast } from "@mdi/js";
import SearchBar from "@/components/SearchBar.vue";
</script>
