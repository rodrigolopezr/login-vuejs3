<template>
  <div
    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
    role="alert"
    v-if="alert"
  >
    <strong class="font-bold">Login Wrong!</strong>
    <span class="block sm:inline">User or password wrong, try again!</span>
    <span
      class="absolute top-0 bottom-0 right-0 px-4 py-3"
      @click="alert = !alert"
    >
      <svg
        class="fill-current h-6 w-6 text-red-500"
        role="button"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <title>Close</title>
        <path
          d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
        />
      </svg>
    </span>
  </div>
  <div
    class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <a
            href="sign-up"
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign Up
          </a>
        </p>
      </div>
      <Form
        class="mt-8 space-y-6"
        @submit="onSubmit"
        :validation-schema="schema"
      >
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">User Name</label>
            <Field
              id="user-name"
              name="username"
              type="text"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="User Name"
              v-model="username"
            />
            <ErrorMessage name="username" class="text-red-700" />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <Field
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              v-model="password"
            />
            <ErrorMessage name="password" class="text-red-700" />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <!-- Heroicon name: solid/lock-closed -->
              <svg
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            Sign in
          </button>
          <a
            href="lost-password"
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Lost password?
          </a>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";

const alert = ref(false);

const username = ref("");
const password = ref("");
const router = useRouter();

const schema = yup.object().shape({
  username: yup.string().required().min(8).label("User Name"),
  password: yup.string().required().min(8).label("Password"),
});

const onSubmit = () => {
  const users = eval(localStorage.getItem("users") ?? JSON.stringify([]));

  const index = users.findIndex(
    (user) =>
      user.username === username.value && user.password === password.value
  );

  if (index !== -1) {
    localStorage.setItem(
      "user",
      JSON.stringify({ ...users[index], id: index })
    );

    router.push("profile");
  } else {
    alert.value = true;
  }
};
</script>
