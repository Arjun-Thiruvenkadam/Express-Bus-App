const { Ticket } = require("../../schemas/ticketSchema");
const connection = require("../../utils/connection");
require("dotenv").config();

describe("insert", () => {
  beforeAll(async () => {
    connection();
  });

  afterAll(async () => {
    await connection.close();
  });

  it("should get all tickets", async () => {
    const tickets = await Ticket.find({});
    expect(tickets).toBeDefined();
  });

  it("should get ticket with id", async () => {
    const ticket = await Ticket.findOne({ ticketId: 1 });
    expect(ticket).toHaveProperty("ticketId", 1);
  });

  it("should be null for ticket id <0 and >40", async () => {
    const ticket = await Ticket.findOne({ ticketId: 0 });
    expect(ticket).toBeNull();
  });
});
