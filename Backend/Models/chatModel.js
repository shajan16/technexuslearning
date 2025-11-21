const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  userId: String,
  sender: String,
  message: String,
  read: { type: Boolean, default: false },
  time: { 
    type: String, 
    default: () => new Date().toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  },
  date: {
    type: String,
    default: () => new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  },
});

module.exports= mongoose.model("message", messageSchema);