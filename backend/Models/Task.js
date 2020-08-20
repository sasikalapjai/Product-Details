const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let taskSchema = new Schema({
  name: {
    type: String
  },
  status: {
    type: String
  },
  shopName: {
    type: String
  },
  date: {
    timestamp: { type: Number, default: Date.now}
  }
}, {
    collection: 'task'
  })

module.exports = mongoose.model('Task', taskSchema)