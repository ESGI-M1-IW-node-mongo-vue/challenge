<template>
  <div>
    <div class="grid grid-cols-12">
      <DashboardMenu class="col-span-3" />
      <div class="col-span-9 p-10 flex flex-col gap-y-6">
        <VueDatePicker v-model="date" :format="dateFormatted" :enable-time-picker="false" auto-apply :clearable="false" />
        <ListingMeeting :data="allReservations" @refresh="getReservations" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import DashboardMenu from "@/components/Dashboard-menu.vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {ref, watch} from "vue";
import {format, isSameDay,formatISO} from "date-fns";
import { fr } from 'date-fns/locale/fr'
import ListingMeeting from "@/components/ListingMeeting.vue";

const date = ref(new Date())

const dateFormatted = function (date: Date){
  return format(date,"eeee dd MMMM u", {
    locale: fr
  })
}

watch(date,(newValue) => {
  getReservations(newValue)
})

const allReservations = ref([])

const getReservations = function (filterDate: Date){
  const dateIso = filterDate.toISOString()
  fetch(`http://localhost:3000/api/reservations?date=${dateIso}`, {
    method: "get",
  }).then(async(result) => {
    const resultJson = await result.json()
    allReservations.value = resultJson.sort(function(a, b) {
      return (a.start_date < b.start_date) ? -1 : ((a.start_date > b.start_date) ? 1 : 0);
    })
  })
}

getReservations(new Date())

</script>