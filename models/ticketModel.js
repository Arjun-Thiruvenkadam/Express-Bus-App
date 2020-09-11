const { Ticket } = require("../schemas/ticketSchema");
const { getUser } = require("../services/authService");

const createRes = (id, flag) => {
  const updateStatus = {
    ticketId: id,
    updated: flag,
  };
  return updateStatus;
};

const validatePersonId = async (personId) => {
  const user = await getUser(personId);
  if (user == "Invalid Id") return false;
  if (user == "No User Available with the given id") return false;
  return true;
};

const updateTickets = async (Tickets) => {
  const result = [];
  for (const ticketIndex in Tickets) {
    const ticket = Tickets[ticketIndex];
    if (await validatePersonId(ticket.personId)) {
      const res = await Ticket.updateOne(
        { ticketId: ticket.ticketId, status: "open" },
        { status: "closed", personId: ticket.personId }
      );
      if (res.nModified == 1) result.push(createRes(ticket.ticketId, true));
      else result.push(createRes(ticket.ticketId, false));
    } else result.push(createRes(ticket.ticketId, false));
  }
  return result;
};

const getAll = () => {
  const tickets = Ticket.find({}, "-_id -__v");
  return tickets;
};

const updateStatus = async (id, userId) => {
  if (await validatePersonId(userId)) {
    const result = await Ticket.updateOne(
      { ticketId: id, status: "open" },
      { status: "closed", personId: userId }
    );
    if (result.nModified == 1) return "Success";
    return "Already Booked";
  }
  else return "Check User Id";
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
