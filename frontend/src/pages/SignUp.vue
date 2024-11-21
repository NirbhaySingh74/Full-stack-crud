<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-6">
      <h1 class="text-2xl font-bold mb-6 text-center">Sign Up</h1>
      <form @submit.prevent="signUp">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <input
            v-model="name"
            id="name"
            type="text"
            placeholder="Enter your name"
            class="mt-1 px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
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
          Sign Up
        </button>
      </form>
      <p class="mt-4 text-center text-sm text-gray-600">
        Already have an account?
        <router-link to="/login" class="text-blue-500 hover:underline"
          >Login here</router-link
        >.
      </p>
    </div>
  </div>
</template>

<script>
import { signUp } from "../services/api";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async signUp() {
      try {
        console.log(this.name);

        await signUp({
          name: this.name,
          email: this.email,
          password: this.password,
        });
        this.$router.push("/login");
      } catch (error) {
        alert("Sign Up failed. Please try again.");
      }
    },
  },
};
</script>
