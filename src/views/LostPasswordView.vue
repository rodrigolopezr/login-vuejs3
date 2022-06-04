<template>
  <div class="signup flex items-center justify-center">
    <template v-if="!route.query.mail && !route.query.code">
      <Form
        @submit="onSubmitMail"
        :validation-schema="schemaMail"
        class="w-full max-w-sm"
      >
        <h1>Reset password</h1>

        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-mail"
            >
              Mail
            </label>
          </div>
          <div class="md:w-2/3">
            <Field
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-mail"
              type="email"
              placeholder="email"
              v-model="mail"
              name="mail"
            />
            <ErrorMessage name="mail" class="text-red-700" />
          </div>
        </div>
        <div class="md:flex md:items-center">
          <div class="md:w-1/3">
            <a href="/sign-in" class="text-blue-500">Sign-in</a>
          </div>
          <div class="md:w-2/3">
            <button
              class="shadow bg-green-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              RESET
            </button>
          </div>
        </div>
      </Form>
    </template>
    <template v-if="route.query.mail || route.query.code">
      <div>
        Clic on next code to reset password
        <button class="text-blue-500" @click="signinResetPass">
          {{ code }}
        </button>
      </div>
    </template>
    <template v-if="route.query.mail && route.query.code">
      <Form
        @submit="signinResetPass"
        :validation-schema="schemaPassword"
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
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { Ref } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useRouter, useRoute } from "vue-router";

const mail: Ref<string> = ref("");
const password: Ref<string> = ref("");

const router = useRouter();
const route = useRoute();

const code = Math.random();

const schemaMail = yup.object().shape({
  mail: yup.string().required().email().label("Email"),
});

const schemaPassword = yup.object().shape({
  password: yup.string().required().min(8).label("Password"),
});

const onSubmitMail = () => {
  localStorage.setItem(
    "lostPassword",
    JSON.stringify({
      mail: mail.value,
      code: code,
    })
  );
  router.push({ path: "/lost-password", query: { mail: mail.value } });
};

const signinResetPass = () => {
  const users = eval(localStorage.getItem("users") ?? JSON.stringify([]));
  const lostPassword = JSON.parse(
    localStorage.getItem("lostPassword") ?? JSON.stringify([])
  );

  console.log("entra");
  const index = users.findIndex(
    (element) => element.mail === lostPassword.mail
  );

  if (index !== -1) {
    localStorage.setItem(
      "user",
      JSON.stringify({ ...users[index], id: index })
    );
    router.push("change-password");
  }
};
</script>
