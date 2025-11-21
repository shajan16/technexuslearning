// backend/models/Session.js
const mongoose = require('mongoose');

const BreakSchema = new mongoose.Schema({
  start: { type: Date, required: true },
  end: { type: Date, required: true },
});

const SessionSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  date: { type: Date, required: true, index: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  breaks: { type: [BreakSchema], default: [] },
  currentBreakStart: { type: Date, default: null },
  totalBreakSeconds: { type: Number, default: 0 },
  totalWorkSeconds: { type: Number, default: 0 }, 
  netSeconds: { type: Number, default: 0 },        
}, { timestamps: true });

module.exports = mongoose.model('Session', SessionSchema);
