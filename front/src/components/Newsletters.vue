<template>
  <div id="news" class="relative bg-black text-white rounded-lg overflow-hidden" style="height: 400px;">
    <img src="../assets/img/fond.jpg" alt="Tattoo Background" class="absolute inset-0 w-full h-full object-cover opacity-30">
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div class="relative z-10 flex flex-col justify-center items-center h-full text-center p-8">
      <h2 class="text-4xl font-bold mb-4">Rejoignez la communauté FlashArt</h2>
      <p class="text-lg mb-6">Recevez gratuitement le guide de votre premier tatouage, ainsi que le meilleur de l'actu et des bons plans flashs.</p>
      <div class="flex w-full max-w-md">
        <input type="email" placeholder="Adresse email" class="flex-1 p-3 rounded-l-full focus:outline-none text-black">
        <button class="bg-orange-500 text-white p-3 rounded-r-full hover:bg-orange-600">Enregistrer</button>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>