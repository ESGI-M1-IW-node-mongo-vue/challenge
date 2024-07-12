<template>
  <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <div class="flex flex-col gap-y-2">
          <p class="font-bold text-3xl">Liste de vos rendez-vous :</p>
          <p class="text-gray-500 text-lg"><span class="text-primary font-bold">{{ props.data.length }}</span> au total</p>
        </div>
        <div class="flex items-center gap-x-2">
          <p class="font-bold">Bloquer des créneaux à cette date : </p>
          <select v-model="blockHours">
            <option v-for="item in hours" :value="item.value" :disabled="item.available">{{item.text}}</option>
          </select>
          <div @click="block()" class="p-2 bg-red-500 text-white cursor-pointer">Bloquer</div>
        </div>
      </div>
      <table class="min-w-full divide-y divide-gray-300" v-if="props.data.length > 0">
        <thead>
        <tr>
          <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Name</th>
          <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Mail</th>
          <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Téléphone</th>
          <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Créneaux</th>
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
import {ref, watch} from "vue";
import Dialog from "@/components/Dialog.vue";
import {addHours, format, formatISO, getHours, parseISO, setHours, setMinutes} from "date-fns";
import {fr} from "date-fns/locale/fr";

const props = defineProps({
  data:{type:Array,required: true},
  date:{type:Date,required:true}
})

const emits = defineEmits(['refresh'])

const DialogConfirmDelete = ref(null)
const infosDialogDelete = ref(null)
const blockHours = ref(null)

const hours = ref([
  {
    text:"8h à 9h",
    value: 8,
    available: true
  },
  {
    text:"9h à 10h",
    value: 9,
    available: true
  },
  {
    text:"10h à 11h",
    value: 10,
    available: true
  },
  {
    text:"11h à 12h",
    value: 11,
    available: true
  },
  {
    text:"13h à 14h",
    value: 13,
    available: true
  },
  {
    text:"14h à 15h",
    value: 14,
    available: true
  },
  {
    text: "15h à 16h",
    value: 15,
    available: true
  },
  {
    text: "16h à 17h",
    value: 16,
    available: true
  }
])

const openDialog = function(item){
  infosDialogDelete.value = item
  DialogConfirmDelete.value.open()
}

const cancelMeeting = async function (infosDialogDelete){
  await fetch(`http://localhost:3000/api/reservations/${infosDialogDelete._id}`, {
    method: "delete",
  })
  await fetch(`http://localhost:3000/api/flashs/${infosDialogDelete.flash}`,{
    method: "PATCH",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "is_booked":false
    })
  })
  emits('refresh',parseISO(infosDialogDelete.start_date))
  DialogConfirmDelete.value.close()
}

const setFormat = function (item){
  return format(parseISO(item.start_date),"HH'h'") + " à " + format(parseISO(item.end_date),"HH'h'")
}

watch(props,(newVal) => {
  const reservations = newVal.data
  const tabHours = reservations.map(x => {
    return getHours(parseISO(x.start_date))
  })
  hours.value = hours.value.map(x => {
    return {
      text: x.text,
      value: x.value,
      available: tabHours.includes(x.value)
    }
  })
})

const artistId = ref(null)

const block = function (){
  if(!!blockHours.value){

    fetch("https://localhost:3000/api/auth/me",{
      method:"GET",
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(async(result) => {
      const resultJson = await result.json()
      artistId.value = resultJson._id
    })

    const body = {
      "start_date": formatISO(setMinutes(setHours(props.date,blockHours.value),0)),
      "end_date": formatISO(addHours(setMinutes(setHours(props.date,blockHours.value),0),1)),
      "name_client": "BLOQUER",
      "lastname_client": "BLOQUER",
      "email_client": "BLOQUER",
      "phone_client": 1,
      "artist" : artistId.value
    }
    fetch("http://localhost:3000/api/reservations",{
      method:"post",
      body: JSON.stringify(body)
    })
  }
}

</script>