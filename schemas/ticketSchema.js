const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketId: Number,
  status: String,
  personId: String,
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = {
  Ticket,
};
