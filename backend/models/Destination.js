const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  tagText: { type: String, required: true },
  img: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  bestTime: { type: String },
  avgCost: { type: String },
  language: { type: String },
  currency: { type: String },
  visa: { type: String },
  mustSee: [{ type: String }],
  food: [{ type: String }],
  funFact: { type: String },
  safety: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Destination', destinationSchema);
