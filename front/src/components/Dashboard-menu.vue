<template>
  <div>
    <div class="flex flex-col p-10 gap-y-6 bg-gray-100 h-screen">
      <div class="flex items-center gap-x-6">
        <img src="https://picsum.photos/200" alt="logoTatoueurs" class="w-20 h-20">
        <p class="text-lg font-bold">Nom du tatoueur</p>
      </div>
      <div class="w-full h-[1px] bg-gray-500"></div>
      <div v-for="item in menu" @click="goTo(item.routeName)" class="flex items-center gap-x-4 cursor-pointer p-4"
           :class="item.selected ? 'bg-primary rounded-full' : ''">
        <svg-icon :class="item.selected ? 'text-white' : ''" :path="item.icon" type="mdi" />
        <p :class="item.selected ? 'text-white' : ''">{{item.text}}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiBookOutline, mdiAccountBoxOutline } from '@mdi/js';
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()

const menu = ref([
      {
        text: "Rendez-vous",
        routeName:"meeting",
        icon: mdiBookOutline,
        selected:false,
      },
      {
        text:"Profil",
        routeName:"profile",
        icon: mdiAccountBoxOutline,
        selected:false,
      }
    ]
)

menu.value.find(x => x.routeName == route.name).selected = true

const goTo = function (routeName){
  router.push({name: routeName})
}

</script>