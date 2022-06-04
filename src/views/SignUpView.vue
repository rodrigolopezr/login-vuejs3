<template>
  <div class="signup flex items-center justify-center">
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      class="w-full max-w-sm"
    >
      <h1>Sign Up, please fill data</h1>
      <p />
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-full-name"
          >
            Username
          </label>
        </div>
        <div class="md:w-2/3">
          <Field
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-user-name"
            type="text"
            placeholder="username"
            name="username"
            v-model="username"
          />
          <ErrorMessage name="username" class="text-red-700" />
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-full-name"
          >
            Email
          </label>
        </div>
        <div class="md:w-2/3">
          <Field
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-email"
            type="email"
            placeholder="mail@mail.com"
            name="mail"
            v-model="mail"
          />
          <ErrorMessage name="mail" class="text-red-700" />
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-password"
          >
            Password
          </label>
        </div>
        <div class="md:w-2/3">
          <Field
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-password"
            type="password"
            placeholder="******************"
            v-model="password"
            name="password"
          />
          <ErrorMessage name="password" class="text-red-700" />
        </div>
      </div>
      <div class="md:flex md:items-center">
        <div class="md:w-1/3">
          <a href="/sign-in" class="text-blue-500">Sign In</a>
        </div>
        <div class="md:w-2/3">
          <button
            class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { Ref } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";

const username: Ref<string> = ref("");
const mail: Ref<string> = ref("");
const password: Ref<string> = ref("");

const router = useRouter();

const schema = yup.object().shape({
  username: yup.string().required().min(8).label("User Name"),
  mail: yup.string().email().required().label("Email Address"),
  password: yup.string().required().min(8).label("Password"),
});

const onSubmit = () => {
  const users = eval(localStorage.getItem("users") ?? JSON.stringify([]));

  users.push({
    username: username.value,
    mail: mail.value,
    password: password.value,
  });

  localStorage.setItem("users", JSON.stringify(users));

  router.push("sign-in");
};
</script>
