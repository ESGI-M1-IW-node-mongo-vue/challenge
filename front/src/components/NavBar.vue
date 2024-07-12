<template>
  <header class="bg-white">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <a href="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img class="h-14 w-auto" src="../assets/img/logo.png" alt="" />
        </a>
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <svg-icon type="mdi" :path="mdiMenu"></svg-icon>
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <RouterLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          class="text-sm font-semibold leading-6 text-gray-900"
          >{{ item.name }}
        </RouterLink>
        <a href="/#news" class="text-sm font-semibold leading-6 text-gray-900"
          >Newsletters</a
        >
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <RouterLink
          to="/admin/meeting"
          class="text-sm font-semibold leading-6 text-gray-900"
          >Vous êtes tatoueurs
          <span aria-hidden="true">&rarr;</span></RouterLink
        >
      </div>
    </nav>
    <Dialog
      class="lg:hidden"
      @close="mobileMenuOpen = false"
      :open="mobileMenuOpen"
    >
      <div class="fixed inset-0 z-10" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      >
        <div class="flex items-center justify-between">
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Close menu</span>
            <svg-icon type="mdi" :path="mdiClose"></svg-icon>
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <RouterLink
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >{{ item.name }}
              </RouterLink>
            </div>
            <div class="py-6">
              <RouterLink
                to="/admin/meeting"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >Vous êtes tatoueurs
              </RouterLink>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiClose, mdiMenu } from "@mdi/js";
import { ref } from "vue";
import { Dialog, DialogPanel } from "@headlessui/vue";

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Recherche", href: "/result" },
  { name: "Découvrir", href: "/discover" },
];

const mobileMenuOpen = ref(false);
</script>
