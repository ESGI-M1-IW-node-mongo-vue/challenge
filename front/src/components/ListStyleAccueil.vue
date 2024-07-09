<template>
  <div class="sm:mt-32">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h4 class="font-bold" style="font-size: calc(1.325rem + 0.9vw)">Trouver votre style</h4>
        <p class="text-xl">Découvrez toutes nos inspirations de tatouages</p>
      </div>
      <button class="bg-white border-2 border-primary rounded-full px-6 h-1/2 py-2 hover:bg-primary hover:text-white transition-all ease-in">À Suivre</button>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8 justify-around items-center">
      <div v-for="style in styles" :key="style.name" class="relative rounded-lg shadow-lg overflow-hidden h-52 w-full">
        <img :src="style.image" :alt="style.name" class="w-full h-full object-cover">
        <div class="absolute bottom-0 left-0 w-full bg-white p-2 text-center">
          <h5 class="font-bold text-lg">{{ style.name }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const styles = [
  { name: 'Tribal', image: '/src/assets/img/card.jpg' },
  { name: 'Dot work', image: '/src/assets/img/card.jpg' },
  { name: 'Réaliste', image: '/src/assets/img/card.jpg' },
  { name: 'Asiatique', image: '/src/assets/img/card.jpg' },
  { name: 'Celtique', image: '/src/assets/img/card.jpg' },
  { name: 'Polynésien', image: '/src/assets/img/card.jpg' },
  { name: 'Old school', image: '/src/assets/img/card.jpg' },
  { name: 'New school', image: '/src/assets/img/card.jpg' },
  { name: 'Biomécanique', image: '/src/assets/img/card.jpg' },
  { name: 'Gothique', image: '/src/assets/img/card.jpg' },
  { name: 'Abstrait', image: '/src/assets/img/card.jpg' },
  { name: 'Lettrage', image: '/src/assets/img/card.jpg' }
];
</script>
