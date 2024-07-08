<script setup lang="ts">
import { RouterView } from "vue-router";
import { decodeCredential, GoogleLogin } from "vue3-google-login";
import type { CallbackTypes } from "vue3-google-login";

const callback: CallbackTypes.CredentialCallback = (response) => {
  const userData = decodeCredential(response.credential);
  console.log("Handle the response", response);
  console.log("💅 decoded user data", userData);
};
</script>

<template>
  <RouterView />
</template>