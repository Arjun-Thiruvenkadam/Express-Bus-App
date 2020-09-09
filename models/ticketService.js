const { Ticket } = require("../schemas/ticket");

const createRes = (id, flag) => {
  const updateStatus = {
    ticketId: id,
    updated: flag,
  };
  return updateStatus;
};

const updateTickets = async (selectedTickets) => {
  const result = [];
  for (const ticketIndex in selectedTickets) {
    const ticketObj = selectedTickets[ticketIndex];
    const res = await Ticket.updateOne(
      { ticketId: ticketObj.ticketId, status: "open" },
      { status: "closed", personId: ticketObj.personId }
    );
    if (res.nModified == 1) result.push(createRes(ticketObj.ticketId, true));
    else result.push(createRes(ticketObj.ticketId, false));
  }
  return result;
};

const getAll = () => {
  const tickets = Ticket.find({}, "-_id -__v");
  return tickets;
};

const updateStatus = async (id, userId) => {
  const result = await Ticket.updateOne(
    { ticketId: id, status: "open" },
    { status: "closed", personId: userId }
  );
  if (result.nModified == 1) return "Success";
  return "Already Booked";
};

const getTicket = (id) => {
  const ticket = Ticket.findOne({ ticketId: id });
  return ticket;
};

const getTicketsWithStatus = (stat) => {
  const tickets = Ticket.find({ status: stat });
  return tickets;
};

const reset = async () => {
  const result = await Ticket.updateMany(
    {},
    { status: "open", personId: null }
  );
  return result;
};

module.exports = {
  updateTickets,
  getAll,
  updateStatus,
  getTicket,
  getTicketsWithStatus,
  reset,
};
