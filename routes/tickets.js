const express = require('express');
const ticketService = require('../services/ticketService');

const router = express.Router();
router.put('/update', async (req, res) => {
  const selectedTickets = req.body;
  const result = await ticketService.updateAll(selectedTickets);
  return res.send(result);
});

router.put('/reset', async (req, res) => {
  const result = await ticketService.clear();
  return res.send(`${result} Modified`);
});

router.get('/', async (req, res) => {
  const tickets = await ticketService.getAll();
  return res.send(tickets);
});

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.send('Check URL or ticket id');
  const { userId } = req.body;
  const result = await ticketService.updateStatus(id, userId);
  return res.send(result);
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.send('Check URL or ticket id');
  const ticket = await ticketService.getTicket(id);
  return res.send(ticket);
});

router.get('/status/:stat', async (req, res) => {
  const { stat } = req.params;
  const tickets = await ticketService.getTicketsWithStatus(stat);
  return res.send(tickets);
});

module.exports = router;
