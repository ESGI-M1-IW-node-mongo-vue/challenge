<template>
  <div>
    <div class="grid grid-cols-12">
      <DashboardMenu class="col-span-3" />
      <div class="col-span-9 p-10 flex flex-col gap-y-6">
        <VueDatePicker v-model="date" :format="dateFormatted" :enable-time-picker="false" />
        <ListingMeeting />
      </div>
    </div>
  </div>
</template>
<script setup>
import DashboardMenu from "@/components/Dashboard-menu.vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {ref} from "vue";
import { format } from "date-fns";
import { fr } from 'date-fns/locale/fr'
import ListingMeeting from "@/components/ListingMeeting.vue";

const date = ref(new Date())

const dateFormatted = function (date){
  return format(date,"eeee dd MMMM u", {
    locale: fr
  })
}

</script>