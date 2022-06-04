<template>
  <div class="signup flex items-center justify-center">
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      class="w-full max-w-sm"
    >
      <h1>Change password</h1>

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
          <a href="/profile" class="text-blue-500">Profile</a>
        </div>
        <div class="md:w-2/3">
          <button
            class="shadow bg-green-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Change Password
          </button>
        </div>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";

const password = ref("");

const router = useRouter();

const schema = yup.object().shape({
  password: yup.string().required().min(8).label("Password"),
});

const onSubmit = () => {
  const user = JSON.parse(localStorage.getItem("user") ?? JSON.stringify([]));
  const users = JSON.parse(localStorage.getItem("users") ?? JSON.stringify([]));
  user.password = password.value;

  users[user.id] = user;

  localStorage.setItem("users", JSON.stringify(users));

  router.push("sign-out");
};
</script>
