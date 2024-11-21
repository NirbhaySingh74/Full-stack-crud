<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-6">
      <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            v-model="email"
            id="email"
            type="email"
            placeholder="Enter your email"
            class="mt-1 px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            v-model="password"
            id="password"
            type="password"
            placeholder="Enter your password"
            class="mt-1 px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <p class="mt-4 text-center text-sm text-gray-600">
        Don't have an account?
        <router-link to="/signup" class="text-blue-500 hover:underline"
          >Sign up here</router-link
        >.
      </p>
    </div>
  </div>
</template>

<script>
import { login } from "../services/api";
import { store } from "../services/store";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await login({
          email: this.email,
          password: this.password,
        });

        const { token, user } = response.data;

        localStorage.setItem("authToken", token);

        store.setUser(user);

        console.log("Logged in user:", user);

        this.$router.push("/dashboard");
      } catch (error) {
        alert("Login failed. Please check your credentials.");
      }
    },
  },
};
</script>
