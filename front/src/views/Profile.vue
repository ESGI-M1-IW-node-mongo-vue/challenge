<template>
  <div>
    <div class="grid grid-cols-12">
      <DashboardMenu class="col-span-3" />
      <div class="col-span-9 p-10">
        <div class="bg-white">
          <form>
            <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  class="block text-sm font-semibold leading-6 text-gray-900"
                  >Nom</label
                >
                <div class="mt-2.5">
                  <input
                    v-model="infosUser.name"
                    type="text"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  class="block text-sm font-semibold leading-6 text-gray-900"
                  >Email</label
                >
                <div class="mt-2.5">
                  <input
                    v-model="infosUser.email"
                    type="email"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  class="block text-sm font-semibold leading-6 text-gray-900"
                  >Adresse</label
                >
                <div class="mt-2.5">
                  <input
                    v-model="infosUser.address"
                    type="text"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  class="block text-sm font-semibold leading-6 text-gray-900"
                  >Téléphone</label
                >
                <div class="mt-2.5">
                  <input
                    v-model="infosUser.tel"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div class="sm:col-span-2">
                <label
                  class="block text-sm font-semibold leading-6 text-gray-900"
                  >Description</label
                >
                <div class="mt-2.5">
                  <textarea
                    v-model="infosUser.description"
                    rows="4"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div @click="save()" class="mt-10">
              <button
                class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import DashboardMenu from "@/components/Dashboard-menu.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const jwt = localStorage.getItem("token");

const googleId = ref(null);
const infosUser = ref([]);

function getGoogleId(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );

  googleId.value = JSON.parse(jsonPayload).sub;
}

getGoogleId(jwt);

fetch(`http://localhost:3000/api/artists?googleId=${googleId.value}`, {
  method: "get",
}).then(async (result) => {
  const resultJson = await result.json();
  infosUser.value = resultJson[0];
});

const save = async function () {
  const body = {
    name: infosUser.value.name || "",
    email: infosUser.value.email || "",
    profile_img: infosUser.value.profile_img || "",
    google_id: infosUser.value.google_id,
    styles: infosUser.value.styles,
    flashs: infosUser.value.flashs,
    address: infosUser.value.address || "",
    tel: infosUser.value.tel || "",
    description: infosUser.value.description || "",
    lastname: "",
  };
  await fetch(`http://localhost:3000/api/artists/${infosUser.value._id}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then(async (result) => {
    console.log(result);
  });

  await router.push({ name: "profile" });
};
</script>
