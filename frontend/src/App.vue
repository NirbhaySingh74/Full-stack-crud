<script setup>
import { store } from "./services/store"; 
import { useRouter } from "vue-router"; 
import "./style.css";
const router = useRouter(); 

// Logout function
function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  store.clearUser();
  router.push("/login");
  console.log("clicked");
  
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
    <!-- Navigation Bar -->
    <header class="bg-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div class="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 class="text-3xl font-extrabold tracking-wide">
          <router-link to="/" class="hover:text-gray-200 transition-colors">
            My App
          </router-link>
        </h1>
        <nav class="flex space-x-6 text-lg">
          <!-- Show login and signup links if no user is logged in -->
          <template v-if="!store.user">
            <router-link
              to="/signup"
              class="hover:text-gray-200 transition-colors font-semibold"
            >
              Sign Up
            </router-link>
            <router-link
              to="/login"
              class="hover:text-gray-200 transition-colors font-semibold"
            >
              Login
            </router-link>
          </template>
          <!-- Show user's name and logout button if logged in -->
          <template v-else>
            <span class="font-semibold">Hello, {{ store.user.name }}</span>
            <button
              @click="logout"
              class="hover:text-gray-200 transition-colors font-semibold"
            >
              Logout
            </button>
          </template>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow container mx-auto px-6 py-8">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-6">
      <div class="container mx-auto px-6 text-center space-y-2">
        <p class="text-sm">
          &copy; {{ new Date().getFullYear() }} My App. All rights reserved.
        </p>
        <div class="flex justify-center space-x-4">
          <a
            href="#"
            class="text-gray-400 hover:text-white transition-colors"
            aria-label="Facebook"
          >
            <i class="fab fa-facebook fa-lg"></i>
          </a>
          <a
            href="#"
            class="text-gray-400 hover:text-white transition-colors"
            aria-label="Twitter"
          >
            <i class="fab fa-twitter fa-lg"></i>
          </a>
          <a
            href="#"
            class="text-gray-400 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <i class="fab fa-linkedin fa-lg"></i>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* Custom styles for better UI/UX */
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
}

header {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

footer a {
  transition: color 0.3s ease;
}
</style>
