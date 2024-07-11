<template>
  <div class="isolate bg-white px-6 pt-2 lg:px-8">
    <div
        class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
    >
      <div
          class="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style="
              clip-path: polygon(
                74.1% 44.1%,
                100% 61.6%,
                97.5% 26.9%,
                85.5% 0.1%,
                80.7% 2%,
                72.5% 32.5%,
                60.2% 62.4%,
                52.4% 68.1%,
                47.5% 58.3%,
                45.2% 34.5%,
                27.5% 76.7%,
                0.1% 64.9%,
                17.9% 100%,
                27.6% 76.8%,
                76.1% 97.7%,
                74.1% 44.1%
              );
            "
      />
    </div>
    <div class="mx-auto max-w-2xl text-center">
      <h2
          class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
      >
        Reservation
      </h2>
      <p class="mt-2 text-lg leading-8 text-gray-600">
        Inscription pour le flash : {{props.infoFlash.name}}
      </p>
    </div>
    <div class="mx-auto mt-3 max-w-xl sm:mt-5">
      <p v-if="error" class="p-2 bg-red-500 text-white mb-4">Veuillez remplir tous les champs </p>
      <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div class="sm:col-span-2">
          <label
              for="first-name"
              class="block text-sm font-semibold leading-6 text-gray-900"
          >Créneaux</label
          >
          <div class="flex flex-col gap-y-2">
            <VueDatePicker v-model="date" :format="dateFormatted" auto-apply :clearable="false" :enable-time-picker="false" :disabled-week-days="[6, 0]"/>
            <select v-model="modelHours" v-if="dateIsSet">
              <option v-for="item in hours" :value="item.value" :disabled="item.available">{{item.text}}</option>
            </select>
          </div>
        </div>
        <div>
          <label
              for="first-name"
              class="block text-sm font-semibold leading-6 text-gray-900"
          >Prénom</label
          >
          <div class="mt-2.5">
            <input
                type="text"
                v-model="form.name_client"
                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
              for="last-name"
              class="block text-sm font-semibold leading-6 text-gray-900"
          >Nom</label
          >
          <div class="mt-2.5">
            <input
                type="text"
                v-model="form.lastname_client"
                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label
              for="email"
              class="block text-sm font-semibold leading-6 text-gray-900"
          >Email</label
          >
          <div class="mt-2.5">
            <input
                type="email"
                v-model="form.email_client"
                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label
              for="phone-number"
              class="block text-sm font-semibold leading-6 text-gray-900"
          >Téléphone</label
          >
          <div class="relative mt-2.5">
            <input
                type="tel"
                v-model="form.phone_client"
                class="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
      <div class="mt-10">
        <button
            @click="book()"
            class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Reserver
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, watch} from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import {format, getHours, setHours, setMinutes,formatISO, addHours} from "date-fns";
import {fr} from "date-fns/locale/fr";
import {useRoute} from "vue-router";

const props = defineProps({
  infoFlash:{
    type: Object,
    required: true
  }
})

const DialogConfirmDelete = ref(null);
const date = ref(null)
const dateIsSet = ref(false)
const modelHours = ref(null)
const route = useRoute()
const form = ref({
  name_client: null,
  lastname_client: null,
  email_client: null,
  phone_client: null
})
const error = ref(false)
const emits = defineEmits(['closeDialog'])

const dateFormatted = function (date) {
  return format(date, `eeee dd MMMM u`, {
    locale: fr,
  });
};

watch(date,(newVal) => {
  dateIsSet.value = true
  fetch(`http://localhost:3000/api/reservations?date=${newVal.toISOString()}&userId=${route.params.id}`, {
    method: "get",
  }).then(async (result) => {
    const resultJson = await result.json()
    const tabHours = resultJson.map(x => {
      return getHours(x.start_date)
    })
    hours.value = hours.value.map(x => {
      return {
        text: x.text,
        value: x.value,
        available: tabHours.includes(x.value)
      }
    })
  });
  modelHours.value = null
})

const closeDialog = function () {
  emits('closeDialog')
};

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

const book = async function () {
  if(!!form.value.name_client && !!form.value.lastname_client && !!form.value.email_client && !!form.value.phone_client && !!date.value && !!modelHours.value){
    error.value = false
    const body = {
      "start_date": formatISO(setMinutes(setHours(date.value,modelHours.value),0)),
      "end_date": formatISO(addHours(setMinutes(setHours(date.value,modelHours.value),0),1)),
      "name_client": form.value.name_client,
      "lastname_client": form.value.lastname_client,
      "email_client": form.value.email_client,
      "phone_client": form.value.phone_client,
      "flash": props.infoFlash._id,
      "artist": route.params.id,
    }
    await fetch("http://localhost:3000/api/reservations",{
      method:"post",
      body: JSON.stringify(body)
    })
    const flashBody = {
      "name": props.infoFlash.name,
      "description" :props.infoFlash.description,
      "img" : props.infoFlash.img,
      "is_booked": true,
      "price":props.infoFlash.price,
      "style" : props.infoFlash.style
    }
    await fetch(`http://localhost:3000/api/flashs/${props.infoFlash._id}`,{
      method:"put",
      body: JSON.stringify(flashBody)
    })
    closeDialog()
  } else {
    error.value = true
  }
}




</script>
