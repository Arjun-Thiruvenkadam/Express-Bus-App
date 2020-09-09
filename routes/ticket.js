const express = require("express");
const router = express.Router();
const ticketController = require("../services/ticketService");

//Update multiple tickets
router.put("/update", ticketController.updateAll);

//Clear all tickets
router.put("/clear", ticketController.clear);

//View all tickets
router.get("/", ticketController.getAll);

//Update ticket status(open/close + adding user details)
router.put("/:id", ticketController.updateStatus);

//View ticket status
router.get("/:id", ticketController.getTicket);

//View ticket Status
router.get("/status/:stat", ticketController.getTicketsWithStatus);

module.exports = router;
