const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (conPas) {
        return conPas === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date,
});

// doc middleware to encrypt the pass
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  //to remove this from doc
  this.passwordConfirm = undefined;
  next();
});

// instance models
userSchema.methods.checkPassword = async function (comingPass, pass) {
  return await bcrypt.compare(comingPass, pass);
};

userSchema.methods.changedPasswordAfter = function (iat) {
  if (this.passwordChangedAt) {
    const secondPassChang = parseInt(this.passwordChangedAt.getTime() / 1000);
    return iat < secondPassChang;
  }

  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
