<script setup lang="ts">
import { type CallbackTypes, GoogleLogin } from "vue3-google-login";
import { useRouter } from "vue-router";

const router = useRouter();

console.log(router.currentRoute);

const callback: CallbackTypes.CredentialCallback = async (response) => {
  const res = await fetch("http://localhost:3000/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  });

  const { token } = await res.json();
  localStorage.setItem("token", token);

  const redirectTo = new URLSearchParams(window.location.search).get(
    "redirectTo",
  );

  if (!redirectTo) {
    await router.push("/");
    return;
  }

  await router.push(redirectTo);
};
</script>

<template>
  <GoogleLogin :callback="callback" prompt auto-login />
</template>
