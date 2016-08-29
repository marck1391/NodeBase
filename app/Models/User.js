var schema = Schema({
  name: String,
  password: String,
  email: String,
  status: Number
}, {
  timestamps: true
})

User = Model('User', schema)