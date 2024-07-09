<template>
  <div>
    <Header />
    <div class="sm:mx-24 mx-10 mt-[500px] sm:mt-9">
      <list-style-accueil />
      <newsletters class="mt-9" />
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import ListStyleAccueil from "@/components/ListStyleAccueil.vue";
import Newsletters from "@/components/Newsletters.vue";
</script>