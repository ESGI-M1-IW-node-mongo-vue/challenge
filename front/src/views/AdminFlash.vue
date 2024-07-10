<template>
  <div class="grid grid-cols-12">
    <DashboardMenu class="col-span-3" />
    <div class="col-span-9">
      <div class="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8">
        <div class="flex items-center justify-between px-4 sm:px-6 lg:px-0">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900">Liste des Flashs</h2>
        </div>

        <div class="relative mt-8">
          <div class="relative -mb-6 w-full overflow-x-auto pb-6">
            <ul role="list" class="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0">
              <FlashCard v-for="flash in flashs" :key="flash._id" :flash="flash" @refresh="fetchFlashs" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Dialog ref="DialogConfirmDelete">
    <template #title>
      <p class="text-red-500">Supprimer le flash</p>
    </template>
    <template #content>
      <div class="mb-4">
        <p>Voulez-vous supprimer ce flash ?</p>
      </div>
      <div class="flex justify-end">
        <button @click="deleteFlash" class="p-2 bg-red-500 rounded-md text-white cursor-pointer hover:bg-red-800">Confirmer</button>
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import DashboardMenu from "@/components/Dashboard-menu.vue";
import FlashCard from "@/components/FlashCard.vue";
import Dialog from "@/components/Dialog.vue";
import { ref, onMounted } from "vue";

const flashs = ref([]);
const DialogConfirmDelete = ref(null);
const flashToDelete = ref(null);

const fetchFlashs = () => {
  fetch("http://localhost:3000/api/flashs")
      .then((res) => res.json())
      .then((data) => {
        flashs.value = data;
      })
      .catch((error) => {
        console.error("Error fetching flashs:", error);
      });
};

const deleteFlash = async () => {
  if (flashToDelete.value) {
    await fetch(`http://localhost:3000/api/flashs/${flashToDelete.value._id}`, {
      method: "DELETE",
    });
    fetchFlashs();
    DialogConfirmDelete.value.close();
  }
};

onMounted(fetchFlashs);
</script>

