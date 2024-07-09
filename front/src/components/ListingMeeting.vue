<template>
  <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
        <tr>
          <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Name</th>
          <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Mail</th>
          <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Téléphone</th>
          <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Crénaux</th>
          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
          <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
        <tr v-for="person in people" :key="person.email">
          <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
            <div class="flex flex-col gap-y-1">
              <div class="font-medium text-gray-900">{{ person.name }}</div>
            </div>
          </td>
          <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
            <div class="flex flex-col gap-y-1">
              <div class="mt-1 text-gray-500">{{ person.email }}</div>
            </div>
          </td>
          <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
            <div class="flex flex-col gap-y-1">
              <div class="mt-1 text-gray-500">{{ person.tel }}</div>
            </div>
          </td>
          <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
            <div class="flex flex-col gap-y-1">
              <div class="mt-1 text-gray-500">Crénaux</div>
            </div>
          </td>
          <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
            <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Active</span>
          </td>
          <td class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
            <div @click="openDialog()" class="text-red-600 hover:text-red-900 cursor-pointer">
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
        <div class="grid grid-cols-2 mb-4">
          <div class="col-span-1 text-center">
            Crénaux
          </div>
          <div class="col-span-1 text-center">
            10h à 11h
          </div>
        </div>
        <div class="flex justify-end">
          <div @click="cancelMeeting()" class="p-2 bg-red-500 rounded-md text-white cursor-pointer hover:bg-red-800">Confirmer</div>
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

const DialogConfirmDelete = ref(null)

const openDialog = function(){
  DialogConfirmDelete.value.open()
}

const cancelMeeting = function (){
  // del meeting
}

const people = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    tel:"0664067809",
    department: 'Optimization',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    image:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    tel:"0664067809",
    department: 'Optimization',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    image:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]
</script>