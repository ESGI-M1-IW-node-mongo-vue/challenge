<template>
  <div>
    <div class="flex flex-col p-10 gap-y-6 bg-gray-100 h-screen">
      <div
        v-for="item in back"
        @click="goTo(item.routeName)"
        class="flex gap-2 cursor-pointer"
      >
        <svg-icon type="mdi" :path="mdiKeyboardBackspace"></svg-icon>
        <p>Retour</p>
      </div>
      <div class="flex items-center gap-x-6">
        <img :src="profile.profile_img" alt="logoTatoueurs" class="w-20 h-20" />
        <p class="text-lg font-bold capitalize">{{ profile.name }}</p>
      </div>
      <div class="w-full h-[1px] bg-gray-500"></div>
      <div
        v-for="item in menu"
        @click="goTo(item.routeName)"
        class="flex items-center gap-x-4 cursor-pointer p-4"
        :class="item.selected ? 'bg-primary rounded-full' : ''"
      >
        <svg-icon
          :class="item.selected ? 'text-white' : ''"
          :path="item.icon"
          type="mdi"
        />
        <p :class="item.selected ? 'text-white' : ''">{{ item.text }}</p>
      </div>
      <button
        class="flex items-center gap-x-4 cursor-pointer p-4"
        @click="logout()"
      >
        <svg-icon :path="mdiLogout" type="mdi" class="text-red-500" />
        <p class="text-red-500">Déconnexion</p>
      </button>
    </div>
  </div>
</template>
<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import {
  mdiAccountBoxOutline,
  mdiBookOutline,
  mdiDrawPen,
  mdiKeyboardBackspace,
  mdiLogout,
} from "@mdi/js";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const menu = ref([
  {
    text: "Rendez-vous",
    routeName: "meeting",
    icon: mdiBookOutline,
    selected: false,
  },
  {
    text: "Profil",
    routeName: "profile",
    icon: mdiAccountBoxOutline,
    selected: false,
  },
  {
    text: "Flash",
    routeName: "flash",
    icon: mdiDrawPen,
    selected: false,
  },
]);

const back = ref([
  {
    routeName: "home",
  },
]);

menu.value.find((x) => x.routeName === route.name).selected = true;

const profile = ref({});

fetch("http://localhost:3000/api/auth/me", {
  method: "get",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Cache-Control": "max-age=24000",
  },
})
  .then((res) => res.json())
  .then((result) => {
    profile.value = result;
  });

const goTo = function (routeName) {
  router.push({ name: routeName });
};

function logout() {
  localStorage.removeItem("token");
  router.push({ name: "home" });
}
</script>
