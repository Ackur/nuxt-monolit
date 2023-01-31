const required = (v, message = 'rules.required') => !!v || message
const email = (v, message = 'rules.email') => /.+@.+/.test(v) || message
const minLength = (v, minLength, message = 'rules.pswMismatch') =>
  v.length >= minLength || message + minLength
const mismatch = (value1, value2, message = 'rules.mismatch') => value1 === value2 || message

export { required, email, minLength, mismatch }
