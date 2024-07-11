<template>
  <div class="grid grid-cols-12">
    <DashboardMenu class="col-span-3" />
    <div class="col-span-9">
      <div class="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8">
        <div class="flex items-center justify-between px-4 sm:px-6 lg:px-0">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900">Liste des Flashs</h2>
          <button @click="openDialogCreate()" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500">
            Ajouter un Flash
          </button>
        </div>

        <div class="relative mt-8">
          <div class="relative -mb-6 w-full overflow-x-auto pb-6">
            <ul role="list" class="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0">
              <FlashCard v-for="flash in flashs" :key="flash._id" :flash="flash" @refresh="fetchFlashs" @edit="openEditDialog(flash)" />
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Dialog ref="DialogCreateFlash">
      <template #title>
        Ajouter un flash
      </template>
      <template #content>
        <div class="mx-auto mt-3 max-w-xl sm:mt-5">
          <p v-if="error" class="p-2 bg-red-500 text-white mb-4">Veuillez remplir tous les champs </p>
          <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                  for="first-name"
                  class="block text-sm font-semibold leading-6 text-gray-900"
              >Nom</label
              >
              <div class="mt-2.5">
                <input
                    type="text"
                    v-model="form.name"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                  for="last-name"
                  class="block text-sm font-semibold leading-6 text-gray-900"
              >Prix</label
              >
              <div class="mt-2.5">
                <input
                    type="text"
                    v-model="form.price"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label
                  for="last-name"
                  class="block text-sm font-semibold leading-6 text-gray-900"
              >Image</label
              >
              <div class="mt-2.5">
                <input
                    type="file"
                    id="flashImage"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label
                  for="last-name"
                  class="block text-sm font-semibold leading-6 text-gray-900"
              >Description</label
              >
              <div class="mt-2.5">
                <input
                    type="text"
                    v-model="form.description"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label
                  for="phone-number"
                  class="block text-sm font-semibold leading-6 text-gray-900"
              >Style</label
              >
              <div class="relative mt-2.5">
                <select v-model="form.style" class="w-full">
                  <option v-for="item in allStyles" :value="item._id">{{item.name}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="mt-10">
            <button
                @click="create()"
                class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Ajouter
            </button>
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import DashboardMenu from "@/components/Dashboard-menu.vue";
import FlashCard from "@/components/FlashCard.vue";
import {onMounted, ref} from "vue";
import Dialog from "@/components/Dialog.vue";

const flashs = ref([]);
const showEditDialog = ref(false);
const selectedFlash = ref(null);
const DialogCreateFlash = ref(null)
const allStyles = ref([])
const form = ref({
  name:null,
  description:null,
  img:null,
  price:null,
  style:null,
  is_booked: false
})
const error = ref(false)

const fetchFlashs = async () => {
  await fetch("http://localhost:3000/api/artists",{
    method:"get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }}).then(async (res) => {
      const resultJson = await res.json()
      flashs.value = resultJson[0].flashs
    })
};

const getStyles = async () => {
  await fetch("http://localhost:3000/api/styles",{
    method:"get",
    }).then(async (res) => {
    allStyles.value = await res.json()
  })
}

const openEditDialog = (flash) => {
  selectedFlash.value = flash;
  showEditDialog.value = true;
};

const closeEditDialog = () => {
  showEditDialog.value = false;
  selectedFlash.value = null;
};

const openDialogCreate = () => {
  getStyles()
  DialogCreateFlash.value.open()
}

const closeDialogCreate = () => {
  DialogCreateFlash.value.close()
}

const updateFlash = async (updatedFlash) => {
  await fetch(`http://localhost:3000/api/flashs/${selectedFlash.value._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedFlash)
  });
  fetchFlashs();
  closeEditDialog();
};

const createFlash = async (newFlash) => {
  await fetch("http://localhost:3000/api/flashs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newFlash)
  });
  fetchFlashs();
};

const create = async () => {
  form.value.img = document.getElementById("flashImage").files[0]
  if(!!form.value.img && !!form.value.name && !!form.value.description && !!form.value.price && !!form.value.style){
    error.value = false
    const formData = new FormData();
    formData.append("name", form.value.name)
    formData.append("description", form.value.description)
    formData.append("img", form.value.img)
    formData.append("price", form.value.price)
    formData.append("style", form.value.style)
    formData.append("is_booked", false)

    await fetch("http://localhost:3000/api/artists/flashs",{
      method:"POST",
      body: formData,
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    await fetchFlashs()
    closeDialogCreate()
    form.value = {
      name:null,
      description:null,
      img:null,
      price:null,
      style:null,
      is_booked: false
    }
  } else {
    error.value = true
  }
}

onMounted(fetchFlashs);
</script>
