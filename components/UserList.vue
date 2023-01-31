<template>
  <v-card class="mx-auto" max-width="400" tile>
    <v-toolbar dark dense>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-icon left>mdi-account-group</v-icon>

      <v-toolbar-title>USERS</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->
    </v-toolbar>

    <v-list-item v-for="user in users" :key="user.id" two-line>
      <v-list-item-content>
        <v-list-item-title> {{ user.name }} </v-list-item-title>
        <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action>
        <v-btn icon @click="removeUser(user.id)">
          <v-icon small color="red">mdi-delete</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UserList',
  computed: {
    users() {
      return this.$store.getters['user/USERS']
    },
  },
  mounted() {
    this.$store.dispatch('user/GET_USERS')
  },
  methods: {
    async removeUser(id) {
      try {
        await axios.delete('api/user/' + id)
        const users = await this.$store.getters['user/USERS']
        this.$store.commit('user/SET_USERS', users.filter(user => user.id !== id))
      } catch (err) {
        console.log(err)
        throw err
      }
    },
  },
}
</script>

<style></style>
