<template>
  <div>
    <div class="grid grid-cols-12">
      <DashboardMenu class="col-span-3" />
      <div class="col-span-9 p-10 flex flex-col gap-y-6">
        <VueDatePicker v-model="date" :format="dateFormatted" :enable-time-picker="false" auto-apply />
        <ListingMeeting :data="reservationsByDays" @refresh="getReservations" />
      </div>
    </div>
  </div>
</template>
<script setup>
import DashboardMenu from "@/components/Dashboard-menu.vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {ref, watch} from "vue";
import {format, isSameDay} from "date-fns";
import { fr } from 'date-fns/locale/fr'
import ListingMeeting from "@/components/ListingMeeting.vue";

const date = ref(new Date())

const dateFormatted = function (date){
  return format(date,"eeee dd MMMM u", {
    locale: fr
  })
}

const sortAndFilterResas = function (day){
  reservationsByDays.value = allReservations.value.filter(x => isSameDay(day,x.start_date)).sort(function(a, b) {
    return (a.start_date < b.start_date) ? -1 : ((a.start_date > b.start_date) ? 1 : 0);
  })
}

watch(date,(newValue) => {
  sortAndFilterResas(newValue)
})

const allReservations = ref([])
const reservationsByDays = ref([])

const getReservations = function (filterDate){
  fetch("http://localhost:3000/api/reservations", {
    method: "get",
  }).then(async(result) => {
    allReservations.value = await result.json()
    sortAndFilterResas(filterDate)
  })
}

getReservations(new Date())

</script>