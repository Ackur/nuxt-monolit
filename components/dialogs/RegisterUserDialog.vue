<template>
  <v-dialog v-model="show" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Register User</span>
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
          <v-text-field
            v-model="form.password"
            type="password"
            :rules="[rules.required, rules.minLength]"
            label="Password*"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.confirmation_password"
            type="password"
            :rules="[rules.required, rules.mismatch]"
            label="Password confirmation*"
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
import { required, email, minLength, mismatch } from '@/utils/fields-rules.js'

export default {
  name: 'RegisterUserDialog',
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
        password: '',
        confirmation_password: '',
      },
      rules: {
        required: (v) => required(v, 'rules.required'),
        email: (v) => email(v),
        minLength: (v) => minLength(v, 8, 'rules.minLength'),
        mismatch: (v) => mismatch(v, this.form.password, 'rules.mismatch'),
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
          const { data } = await this.$axios.post('api/auth/register', this.form)
          console.log(data);
          this.resetForm()
          this.show = false
        } catch (err) {
          console.log(err);
        }
      }
    },
    resetForm() {
      Object.keys(this.form).forEach(el => {
        this.form[el] = ''
      })

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
