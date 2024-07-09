<template>
  <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
      <table class="min-w-full divide-y divide-gray-300" v-if="props.data.length > 0">
        <thead>
        <tr>
          <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Name</th>
          <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Mail</th>
          <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Téléphone</th>
          <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Créneaux</th>
          <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
        <tr v-for="item in props.data" :key="item.email">
          <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
            <div class="flex flex-col gap-y-1">
              <div class="font-medium text-gray-900">{{ item.name_client }} {{ item.lastname_client }}</div>
            </div>
          </td>
          <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
            <div class="flex flex-col gap-y-1">
              <div class="mt-1 text-gray-500">{{ item.email_client }}</div>
            </div>
          </td>
          <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
            <div class="flex flex-col gap-y-1">
              <div class="mt-1 text-gray-500">{{ item.phone_client }}</div>
            </div>
          </td>
          <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
            <div class="flex flex-col gap-y-1">
              <div class="mt-1 text-gray-500">{{setFormat(item)}}</div>
            </div>
          </td>
          <td class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
            <div @click="openDialog(item)" class="text-red-600 hover:text-red-900 cursor-pointer">
              <svg-icon type="mdi" :path="mdiCancel"></svg-icon>
            </div
            >
          </td>
        </tr>
        </tbody>
      </table>
      <div v-else class="flex justify-center">
        <p class="font-bold text-lg">Pas de rendez-vous à cette date</p>
      </div>
    </div>
    <Dialog ref="DialogConfirmDelete">
      <template #title>
        <p class="text-red-500">Supprimer la réservation</p>
      </template>
      <template #content>
        <div class="mb-4">
          <p>Voulez vous supprimer la réservation du {{format(infosDialogDelete.start_date,"dd MMMM'",{locale : fr})}} de {{setFormat(infosDialogDelete)}} </p>
        </div>
        <div class="flex justify-end">
          <div @click="cancelMeeting(infosDialogDelete)" class="p-2 bg-red-500 rounded-md text-white cursor-pointer hover:bg-red-800">Confirmer</div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiCancel } from '@mdi/js';
import {ref} from "vue";
import Dialog from "@/components/Dialog.vue";
import { format,parseISO } from "date-fns";
import {fr} from "date-fns/locale/fr";

const props = defineProps({
  data:{type:Array,required: true}
})

const emits = defineEmits(['refresh'])

const DialogConfirmDelete = ref(null)
const infosDialogDelete = ref(null)

const openDialog = function(item){
  infosDialogDelete.value = item
  DialogConfirmDelete.value.open()
}

const cancelMeeting = async function (infosDialogDelete){
  await fetch(`http://localhost:3000/api/reservations/${infosDialogDelete._id}`, {
    method: "delete",
  })
  emits('refresh',infosDialogDelete.start_date)
  DialogConfirmDelete.value.close()
}

const setFormat = function (item){
  return format(parseISO(item.start_date),"HH'h'") + " à " + format(parseISO(item.end_date),"HH'h'")
}

</script>