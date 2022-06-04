<template>
  <nav>
    <router-link to="/sign-in">SIGN IN</router-link> |
    <router-link to="/sign-up">SIGN UP</router-link>
  </nav>

  <div
    class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <span class="text-6xl">Welcome to Login With VueJS3 + Typescript</span>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";

onMounted(() => {
  //if (localStorage.getItem("users") === null) {
  //localStorage.setItem("users", "");
  //}
});
</script>
