<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Invite New User Form -->
    <section class="mb-6">
      <form @submit.prevent="inviteUser" class="flex flex-wrap space-x-4 items-center">
        <input
          v-model="newUser.name"
          type="text"
          placeholder="Name"
          class="px-4 py-2 border rounded w-full sm:w-1/3"
        />
        <input
          v-model="newUser.email"
          type="email"
          placeholder="Email"
          class="px-4 py-2 border rounded w-full sm:w-1/3"
        />
        <select
          v-model="newUser.role"
          class="px-4 py-2 border rounded w-full sm:w-1/6"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full sm:w-auto"
        >
          Invite
        </button>
      </form>
    </section>

    <!-- Users Table -->
    <section>
      <table class="w-full bg-white shadow rounded-lg overflow-hidden">
        <thead class="bg-gray-200">
          <tr>
            <th class="text-left px-4 py-2">Name</th>
            <th class="text-left px-4 py-2">Email</th>
            <th class="text-left px-4 py-2">Role</th>
            <th class="text-center px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
            class="hover:bg-gray-100 transition"
          >
            <td class="px-4 py-2">{{ user.name }}</td>
            <td class="px-4 py-2">{{ user.email }}</td>
            <td class="px-4 py-2">{{ user.role }}</td>
            <td class="px-4 py-2 text-center space-x-2">
              <button
                @click="editUser(user)"
                class="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                @click="deleteUser(user.id)"
                class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Update User Modal -->
    <div
      v-if="editingUser"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 class="text-2xl mb-4">Update User</h2>
        <form @submit.prevent="updateUser">
          <input
            v-model="editingUser.name"
            type="text"
            placeholder="Name"
            class="mb-4 px-4 py-2 border rounded w-full"
          />
          <input
            v-model="editingUser.email"
            type="email"
            placeholder="Email"
            class="mb-4 px-4 py-2 border rounded w-full"
          />
          <select
            v-model="editingUser.role"
            class="mb-4 px-4 py-2 border rounded w-full"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <div class="flex justify-between">
            <button
              @click="closeEditModal"
              type="button"
              class="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllUsers, deleteUser, updateUser, inviteUser } from "../services/api";

export default {
  data() {
    return {
      users: [],
      newUser: { name: "", email: "", role: "user" },
      editingUser: null,
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await getAllUsers();
        this.users = response.data;
      } catch (error) {
        alert("Failed to fetch users");
      }
    },
    async inviteUser() {
      try {
        await inviteUser(this.newUser);
        this.newUser = { name: "", email: "", role: "user" };
        this.fetchUsers();
      } catch (error) {
        alert("Failed to invite user");
      }
    },
    async deleteUser(id) {
      if (!confirm("Are you sure you want to delete this user?")) return;
      try {
        await deleteUser(id);
        this.fetchUsers();
      } catch (error) {
        alert("Failed to delete user");
      }
    },
    editUser(user) {
      this.editingUser = { ...user }; 
    },
    async updateUser() {
      try {
        await updateUser(this.editingUser.id, this.editingUser);
        this.fetchUsers();
        this.closeEditModal();
      } catch (error) {
        alert("Failed to update user");
      }
    },
    closeEditModal() {
      this.editingUser = null; 
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>

</style>
