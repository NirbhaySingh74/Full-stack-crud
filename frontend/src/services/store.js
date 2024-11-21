import { reactive } from "vue";

export const store = reactive({
  user: null, // Initially, no user is logged in
  setUser(data) {
    this.user = data; // Set the user data
  },
  clearUser() {
    this.user = null; // Clear the user data
  },
});
