var schema = Schema({
  name: String,
  password: String,
  email: String,
  status: Number
}, {
  timestamps: true
})

schema.methods.logout = (cb)=>{
  cb = cb || function(){}
  this.status = 0
  this.save((err)=>{
    if(err) return cb(err)
    cb(err)
  })
}

User = Model('User', schema)
