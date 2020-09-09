const ticketService = require("../access/ticketService");

const updateAll = async (req, res) => {
  const selectedTickets = req.body;
  const result = await ticketService.updateTickets(selectedTickets);
  return res.send(result);
};

const getAll = async (req, res) => {
  const tickets = await ticketService.getAll();
  return res.send(tickets);
};

const updateStatus = async (req, res) => {
  const id = parseInt(req.params.id);
  const userId = req.query.userId;
  if (!userId) return res.send("User id not given");
  if (id < 1 || id > 40)
    return res.send("There is no ticket with the given id");

  const result = await ticketService.updateStatus(id, userId);
  return res.send(result);
};

const getTicket = async (req, res) => {
  const id = parseInt(req.params.id);
  if (id < 1 || id > 40)
    return res.send("There is no ticket with the given id");
  const ticket = await ticketService.getTicket(id);
  return res.send(ticket);
};

const getTicketsWithStatus = async (req, res) => {
  const stat = req.params.stat;
  const tickets = await ticketService.getTicketsWithStatus(stat);
  return res.send(tickets);
};

const clear = async (req, res) => {
  await ticketService.reset();
  res.send("Success");
};

module.exports = {
  updateAll,
  getAll,
  updateStatus,
  getTicket,
  getTicketsWithStatus,
  clear,
};
