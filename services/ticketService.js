const ticketService = require("../models/ticketModel");

const updateAll = async (selectedTickets) => {
  const result = await ticketService.updateTickets(selectedTickets);
  return result;
};

const getAll = async () => {
  const tickets = await ticketService.getAll();
  return tickets;
};

const updateStatus = async (id, userId) => {
  if (!userId) return "User id not given";
  if (id < 1 || id > 40)
    return "There is no ticket with the given id";
  const result = await ticketService.updateStatus(id, userId);
  return result;
};

const getTicket = async (id) => {
  if (id < 1 || id > 40)
    return "There is no ticket with the given id";
  const ticket = await ticketService.getTicket(id);
  return ticket;
};

const getTicketsWithStatus = async (stat) => {
  const tickets = await ticketService.getTicketsWithStatus(stat);
  return tickets;
};

const clear = async () => {
  const result = await ticketService.reset();
  return result.nModified;
};

module.exports = {
  updateAll,
  getAll,
  updateStatus,
  getTicket,
  getTicketsWithStatus,
  clear,
};
