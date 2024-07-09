<template>
  <div class="h-screen relative">
    <div>
      <img src="../assets/img/fond.jpg" alt="fond tattoo" class="w-full h-full object-cover" style="height: calc(100vh - 80px)">
      <div class="absolute top-0 left-0 w-full bg-black opacity-50" style="height: calc(100vh - 80px)"></div>
    </div>
    <div class="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
      <h1 class="text-white mb-4 text-5xl">Trouver votre flash et votre tatoueur</h1>
      <h2 class="text-white mb-10">La plus grande sélection de flash prêts à vous accueillir</h2>
      <div class="flex bg-white rounded-full">
        <input type="text" placeholder="Ville, code postal, tatoueur" class="p-3 rounded-full rounded-r-none pl-4 border-r-2 sm:w-96 w-20 focus:outline-none">
        <select class="p-[14px] rounded-full rounded-l-none sm:w-56 w-20 focus:outline-none">
          <option v-for="option in options" :key="option.value" :value="option.value">{{ option.text }}</option>
        </select>
        <button class="flex bg-primary p-3 m-1 rounded-full text-white">
          <svg-icon type="mdi" :path="mdiMagnify"></svg-icon>
          Recherchez
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import {mdiMagnify} from '@mdi/js';

const options = [
  {value: 'option1', text: 'Tous les styles'},
  {value: 'option2', text: 'Option 2'},
  {value: 'option3', text: 'Option 3'}
];
</script>