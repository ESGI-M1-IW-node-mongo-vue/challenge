<template>
  <div class="h-screen relative">
    <div class="flex justify-center items-center">
      <img src="../assets/img/fond.jpg" alt="fond tattoo" class="w-full h-full object-cover" style="height: calc(100vh - 80px)">
      <div class="absolute top-0 left-0 w-full bg-black opacity-50" style="height: calc(100vh - 80px)"></div>

      <div class="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
        <h1 class="text-white mb-4 text-6xl">Trouver votre flash et votre tatoueur</h1>
        <h2 class="text-white mb-10 text-xl">La plus grande sélection de flash prêts à vous accueillir</h2>
        <div class="flex bg-white rounded-full mb-20">
          <input type="text" placeholder="Ville, code postal, tatoueur" class="rounded-full rounded-r-none pl-4 border-r-2 sm:w-96 w-20 focus:outline-none">
          <select class="rounded-full rounded-l-none sm:w-56 w-20 focus:outline-none pl-3">
            <option v-for="option in options" :key="option.value" :value="option.value">{{ option.text }}</option>
          </select>
          <button class="flex bg-primary m-1 p-3 rounded-full text-white hover:bg-opacity-50">
            <svg-icon type="mdi" :path="mdiMagnify"></svg-icon>
            Recherchez
          </button>
        </div>
        <h3 class="text-white text-2xl">Réservez votre futur flash en 3 clics</h3>
      </div>
    </div>
    <div class="sm:absolute bottom-0 flex justify-center">
      <div class="bg-white rounded-lg p-12 sm:flex items-start w-11/12 sm:w-8/12 gap-4 shadow-2xl translate-y-7">
        <div class="flex flex-col items-start text-start">
          <svg-icon type="mdi" :path="mdiMagnify" class="text-primary mb-2" size="50"></svg-icon>
          <h4 class="font-bold text-xl mb-2">Recherchez votre flash</h4>
          <p class="text-gray-400"  >Recherchez un flash selon les critères que vous souhaitez.</p>
        </div>
        <div class="flex flex-col items-start text-start">
          <svg-icon type="mdi" :path="mdiMessageFast" class="text-primary mb-2" size="50"></svg-icon>
          <h4 class="font-bold text-xl mb-2">Entrez en contact</h4>
          <p class="text-gray-400">Contactez votre futur tatoueur par téléphone ou via notre formulaire.</p>
        </div>
        <div class="flex flex-col items-start text-start">
          <svg-icon type="mdi" :path="mdiCalendarBlankMultiple" class="text-primary mb-2" size="50"></svg-icon>
          <h4 class="font-bold text-xl mb-2">Prenez rendez-vous</h4>
          <p class="text-gray-400">Convenez d’un rendez-vous avec votre prochain tatoueur.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMagnify, mdiMessageFast, mdiCalendarBlankMultiple } from '@mdi/js';

const options = [
  { value: 'option1', text: 'Tous les styles' },
  { value: 'option2', text: 'Option 2' },
  { value: 'option3', text: 'Option 3' }
];
</script>