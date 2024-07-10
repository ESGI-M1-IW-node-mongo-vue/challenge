<template>
  <li class="inline-flex w-64 flex-col text-center lg:w-auto">
    <div class="group relative">
      <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200">
        <img :src="console.log(flash.img) || flash.img || 'https://tailwindui.com/img/ecommerce-images/home-page-02-product-01.jpg'" :alt="flash.name" class="h-full w-full object-cover object-center group-hover:opacity-75" />
      </div>
      <div class="absolute top-0 left-0 rounded-full p-2 bg-primary m-2">
        <svg-icon :path="mdiPencil" type="mdi" class="text-white" size="20"/>
      </div>
      <div @click="openDialog(flash)" class="absolute top-0 right-0 rounded-full p-2 bg-red-500 m-2 cursor-pointer">
        <svg-icon :path="mdiTrashCanOutline" type="mdi" class="text-white" size="20"/>
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
  </li>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiPencil, mdiTrashCanOutline } from '@mdi/js';

const props = defineProps({
  flash: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(['refresh']);
const DialogConfirmDelete = ref(null);
const flashToDelete = ref(null);

const openDialog = (item) => {
  flashToDelete.value = item;
  DialogConfirmDelete.value.open();
};

const deleteFlash = async () => {
  if (flashToDelete.value) {
    await fetch(`http://localhost:3000/api/flashs/${flashToDelete.value._id}`, {
      method: "DELETE",
    });
    emits('refresh', flashToDelete.value);
    DialogConfirmDelete.value.close();
  }
};
</script>
