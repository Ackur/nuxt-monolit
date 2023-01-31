<template>
  <div class="index-page">
    <v-row justify="space-around">
      <v-col cols="auto">
        <v-btn color="primary" dark @click="showAddUserDialog = true">
          Add User
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" dark @click="showRegisterUserDialog = true">
          Register
        </v-btn>
      </v-col>
      <AddUserDialog v-model="showAddUserDialog" />
      <RegisterUserDialog v-model="showRegisterUserDialog" />
    </v-row>
    <v-row>
      <v-col>
        <UserList />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AddUserDialog from '@/components/dialogs/AddUserDialog.vue'
import RegisterUserDialog from '@/components/dialogs/RegisterUserDialog.vue'
import UserList from '@/components/UserList.vue'

export default {
  name: 'IndexPage',
  components: { AddUserDialog, RegisterUserDialog, UserList },
  data() {
    return {
      showAddUserDialog: false,
      showRegisterUserDialog: false,
    }
  },
  methods: {
    showAddUserDialogHandler(val) {
      this.showAddUserDialog = val
    },
  },
}
</script>
