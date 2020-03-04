const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserFileSchema = new Schema({
  height: Number,
  weight: Number,
  age: Number,
  activityLevel: String,
  goal: String,
  city: String,
  intolerances: [String],
  foodpreferences: [String],
  user: { type: Schema.Types.ObjectId, ref: "User" },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const UserFile = mongoose.model('UserFile', UserFileSchema);
module.exports = UserFile