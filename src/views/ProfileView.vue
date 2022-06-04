<template>
  <nav>
    <router-link to="/sign-out">LOG OUT</router-link> |
    <router-link to="/change-password">CHANGE PASSWORD</router-link>
  </nav>
  <div>WELCOME {{ username }} to your profile</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import type { Ref } from "vue";

const username: Ref<string> = ref("");

onMounted(() => {
  const user = JSON.parse(localStorage.getItem("user") ?? JSON.stringify([]));

  username.value = user.username;
});
</script>
