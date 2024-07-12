<template>
  <div class="absolute top-4 right-4 rounded-md bg-green-50 p-4 w-96 border border-green-200">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg-icon class="text-green-700" :path="mdiCheckCircle" type="mdi" />
      </div>
      <div class="ml-3 text-green-600">
        <slot name="title" />
      </div>
      <div class="ml-auto pl-3">
        <div class="-mx-1.5 -my-1.5">
          <div @click="close()" class="cursor-pointer inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50">
            <svg-icon :path="mdiClose" type="mdi" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiClose, mdiCheckCircle } from '@mdi/js';

const emits = defineEmits(['close'])

const close = function (){
  emits('close')
}
</script>