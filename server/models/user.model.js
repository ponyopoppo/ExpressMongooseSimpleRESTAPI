import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    unique: true,
    required: true,
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  history: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

UserSchema.statics = {
  get(id) {
    return this.findById(id)
      .exec()
      .then(user => user || Promise.reject("no such user exists"))
  },

  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }
};

export default mongoose.model('User', UserSchema);
