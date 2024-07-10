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
              <FlashCard v-for="flash in flashs" :key="flash._id" :flash="flash" @refresh="fetchFlashs" @edit="openEditDialog(flash)" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DashboardMenu from "@/components/Dashboard-menu.vue";
import FlashCard from "@/components/FlashCard.vue";
import EditFlash from "@/components/EditFlash.vue";
import { ref, onMounted } from "vue";

const flashs = ref([]);
const showEditDialog = ref(false);
const selectedFlash = ref(null);

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

const openEditDialog = (flash) => {
  selectedFlash.value = flash;
  showEditDialog.value = true;
};

const closeEditDialog = () => {
  showEditDialog.value = false;
  selectedFlash.value = null;
};

const updateFlash = async (updatedFlash) => {
  await fetch(`http://localhost:3000/api/flashs/${selectedFlash.value._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedFlash)
  });
  fetchFlashs();
  closeEditDialog();
};

onMounted(fetchFlashs);
</script>
