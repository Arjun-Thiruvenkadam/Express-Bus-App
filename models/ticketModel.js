const { Ticket } = require('../schemas/ticketSchema');
const { getUserWithId } = require('../services/userService');

const createRes = (id, flag) => {
  const updateStatus = {
    ticketId: id,
    updated: flag,
  };
  return updateStatus;
};

const validatePersonId = async (personId) => {
  const user = await getUserWithId(personId);
  if (user === 'Invalid Id') return false;
  if (user === 'No User Available with the given id') return false;
  return true;
};

const updateStatus = async (id, userId) => {
  if (await validatePersonId(userId)) {
    const result = await Ticket.updateOne(
      { ticketId: id, status: 'open' },
      { status: 'closed', personId: userId }
    );
    if (result.nModified === 1) return 'Success';
    return 'Already Booked';
  }
  return 'Check User Id';
};

const updateTickets = async (Tickets) => {
  const result = [];
  await Promise.all(
    Tickets.map(async (ticket) => {
      const val = await updateStatus(ticket.ticketId, ticket.personId);
      result.push(createRes(ticket.ticketId, val));
    })
  );
  return result;
};

const getAll = () => {
  const tickets = Ticket.find({}, '-_id -__v');
  return tickets;
};

const getTicket = (id) => {
  const ticket = Ticket.findOne({ ticketId: id }, '-_id -__v');
  return ticket;
};

const getTicketsWithStatus = (stat) => {
  const tickets = Ticket.find({ status: stat });
  return tickets;
};

const reset = async () => {
  const result = await Ticket.updateMany(
    {},
    { status: 'open', personId: null }
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
