<script setup lang="ts">
import { type CallbackTypes, GoogleLogin } from "vue3-google-login";
import { decodeCredential } from "vue3-google-login";

const callback: CallbackTypes.CredentialCallback = (response) => {
  const userData = decodeCredential(response.credential);
  console.log("Handle the response", response);
  console.log("💅 decoded user data", userData);
};
</script>

<template>
  <GoogleLogin :callback="callback" prompt auto-login />
</template>
