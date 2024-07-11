<template>
  <li
    :class="
      flash.is_booked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    "
    class="inline-flex w-64 flex-col text-center lg:w-auto"
  >
    <div class="group relative">
      <div
        class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200"
      >
        <img
          :src="
            flash.img ||
            'https://tailwindui.com/img/ecommerce-images/home-page-02-product-01.jpg'
          "
          :alt="flash.name"
          :class="flash.is_booked ? '' : 'group-hover:opacity-75'"
          class="h-full w-full object-cover object-center"
        />
      </div>
      <div
        v-if="!onArtistPage && !disableControls"
        @click="openEditDialog(flash)"
        class="absolute top-0 left-0 rounded-full z-10 p-2 bg-primary m-2 cursor-pointer"
      >
        <svg-icon :path="mdiPencil" type="mdi" class="text-white" size="20" />
      </div>
      <div
        v-if="!onArtistPage && !disableControls"
        @click="openAdminDialog(flash)"
        class="absolute top-0 z-10 right-0 rounded-full p-2 bg-red-500 m-2 cursor-pointer"
      >
        <svg-icon
          :path="mdiTrashCanOutline"
          type="mdi"
          class="text-white"
          size="20"
        />
      </div>
      <div class="mt-6">
        <h3 class="mt-1 font-semibold text-gray-900">
          <a :href="flash.href">
            <span class="absolute inset-0" />
            {{ flash.name }}
          </a>
        </h3>
        <p class="mt-1 text-gray-900">{{ flash.price }}</p>
      </div>
    </div>
    <Dialog ref="DialogConfirmDelete" v-if="!onArtistPage && !disableControls">
      <template #title>
        <p class="text-red-500">Supprimer le flash</p>
      </template>
      <template #content>
        <div class="mb-4">
          <p>Voulez-vous supprimer ce flash ?</p>
        </div>
        <div class="flex justify-end">
          <div
            @click="deleteFlash"
            class="p-2 bg-red-500 rounded-md text-white cursor-pointer hover:bg-red-800"
          >
            Confirmer
          </div>
        </div>
      </template>
    </Dialog>

    <EditFlash
      :show="showEditDialog"
      :flash="selectedFlash"
      @confirm="updateFlash"
      @cancel="closeEditDialog"
    />
  </li>
</template>

<script setup>
import { defineProps, ref } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPencil, mdiTrashCanOutline } from "@mdi/js";
import Dialog from "@/components/Dialog.vue";
import EditFlash from "@/components/EditFlash.vue";

const props = defineProps({
  flash: {
    type: Object,
    required: true,
  },
  disableControls: {
    type: Boolean,
    required: false,
    default: false,
  },
  onArtistPage: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emits = defineEmits(["refresh"]);
const DialogConfirmDelete = ref(null);
const flashToDelete = ref(null);

const showEditDialog = ref(false);
const selectedFlash = ref(null);

const openAdminDialog = (item) => {
  flashToDelete.value = item;
  DialogConfirmDelete.value.open();
};

const deleteFlash = async () => {
  if (flashToDelete.value) {
    await fetch(`http://localhost:3000/api/flashs/${flashToDelete.value._id}`, {
      method: "DELETE",
    });
    emits("refresh");
    DialogConfirmDelete.value.close();
  }
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
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedFlash),
  });
  emits("refresh");
  closeEditDialog();
};
</script>
