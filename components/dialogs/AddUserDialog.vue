<template>
  <v-dialog v-model="show" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Add User</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="form.name"
            :rules="[rules.required]"
            label="Name*"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.email"
            :rules="[rules.required, rules.email]"
            label="Email*"
            required
          ></v-text-field>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close"> Close </v-btn>
        <v-btn color="blue darken-1" text @click="submit"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AddUserDialog',
  props: {
    value: {
      type: Boolean,
      default: false,
      description: 'show dialog',
    },
  },
  data() {
    return {
      valid: true,
      form: {
        name: '',
        email: '',
      },
      rules: {
        required: (v) => !!v.trim() || 'rules.required',
        email: (v) => /.+@.+/.test(v) || 'rules.email',
      },
    }
  },
  computed: {
    show: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
  methods: {
    async submit() {
      const valid = this.$refs.form.validate()
      if (valid) {
        try {
          const { data } = await this.$axios.post('api/user', this.form)
          const users = await this.$store.getters['user/USERS']
          this.$store.commit('user/SET_USERS', [data, ...users])
          this.resetForm()
          this.show = false
        } catch (err) {
          console.log(err);
        }
      }
    },
    resetForm() {
      this.form.name = ''
      this.form.email = ''
      this.$refs.form.resetValidation()
    },
    close() {
      this.resetForm()
      this.show = false
    }
  },
}
</script>

<style></style>
