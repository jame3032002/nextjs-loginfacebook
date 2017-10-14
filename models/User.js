const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  facebookId: String,
  displayName: String
})

mongoose.model('users', userSchema)
