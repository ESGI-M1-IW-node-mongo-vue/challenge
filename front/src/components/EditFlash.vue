<template>
  <div v-if="show" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
        <div class="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div class="bg-white p-6 sm:p-6 sm:pb-4">
            <div class="">
              <div class="mt-3 bg-white text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Éditer le Flash</h3>
                <div class="mt-2">
                  <form @submit.prevent="submitForm">
                    <div class="mb-4">
                      <label for="name" class="block text-sm font-medium text-gray-700">Nom</label>
                      <input type="text" v-model="form.name" id="name" class="mt-1 block h-10 w-full border-[1px] pl-3 rounded-md border-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required>
                    </div>
                    <div class="mb-4">
                      <label for="img" class="block text-sm font-medium text-gray-700">Image URL</label>
                      <input type="text" v-model="form.img" id="img" class="mt-1 block h-10 w-full border-[1px] pl-3 rounded-md border-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required>
                    </div>
                    <div class="mb-4">
                      <label for="price" class="block text-sm font-medium text-gray-700">Prix</label>
                      <input type="text" v-model="form.price" id="price" class="mt-1 block h-10 w-full border-[1px] pl-3 rounded-md border-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required>
                    </div>
                    <div class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button type="submit" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto">Sauvegarder</button>
                      <button @click="cancel" type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Annuler</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
  show: Boolean,
  flash: Object,
});

const emit = defineEmits(['confirm', 'cancel']);

const form = ref({
  name: '',
  img: '',
  price: ''
});

watch(props.flash, (newFlash) => {
  if (newFlash) {
    form.value = {
      name: newFlash.name || '',
      img: newFlash.img || '',
      price: newFlash.price || ''
    };
  }
}, { immediate: true });

function submitForm() {
  emit('confirm', form.value);
  resetForm();
}

function cancel() {
  emit('cancel');
  resetForm();
}

function resetForm() {
  form.value = {
    name: '',
    img: '',
    price: ''
  };
}
</script>
