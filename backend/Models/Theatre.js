const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true, match: [/^\d{6}$/, 'Please enter a 6-digit pin code'] },
});

module.exports = mongoose.model('Theatre', theatreSchema);
