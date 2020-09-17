/* eslint-disable no-undef */
const { Ticket } = require('../../schemas/ticketSchema');
const { User } = require('../../schemas/userSchema');
const connection = require('../../utils/connection');
require('dotenv').config();

jest.setTimeout(60000);

describe('Integration Test', () => {
  const personId = '5f465cf7a8ecff62f072353e';
  const sampleUser = {
    userName: 'Arjun',
    mail: 'testuser@gmail.com',
    password: 'Arjun@123',
  };

  beforeAll(async () => {
    connection();
  });

  afterAll(async () => {
    await connection.close();
  });

  describe('Tickets Model', () => {
    it('should get all tickets', async () => {
      const tickets = await Ticket.find({});
      expect(tickets).toBeDefined();
    });

    it('should get ticket with id', async () => {
      const ticket = await Ticket.findOne({ ticketId: 1 });
      expect(ticket).toHaveProperty('ticketId', 1);
    });

    it('should be null for ticket id <0 and >40', async () => {
      const ticket = await Ticket.findOne({ ticketId: 0 });
      expect(ticket).toBeNull();
    });

    it('should update ticket based on id and status', async () => {
      const ticketId = 1;
      await Ticket.updateOne(
        { ticketId, status: 'open' },
        { status: 'closed', personId }
      );
      const ticket = await Ticket.findOne({ ticketId });
      expect(ticket.status).toBe('closed');
    });

    it('should not update ticket for invalid id', async () => {
      const ticketId = 56;
      const result = await Ticket.updateOne(
        { ticketId, status: 'open' },
        { status: 'closed', personId }
      );
      expect(result.n).toBe(0);
    });

    it('should match all tickets', async () => {
      const result = await Ticket.updateMany(
        {},
        { status: 'open', personId: null }
      );
      expect(result.n).toBe(40);
    });
  });

  describe('User Model', () => {
    it('should get a user', async () => {
      const user = await User.findOne({
        mail: 'arjunthiru123@gmail.com',
      });
      expect(user).toHaveProperty('mail', 'arjunthiru123@gmail.com');
    });

    it('should get a null', async () => {
      const user = await User.findOne({ mail: '__nomail__@gmail.com' });
      expect(user).toBeNull();
    });

    it('should get a user', async () => {
      const user = await User.findById(personId, '-__v -password');
      expect(user).toBeTruthy();
    });

    it('should create and delete a user', async () => {
      const newUser = await User.create(sampleUser);
      expect(newUser).toBeTruthy();

      const result = await User.deleteOne(sampleUser);
      expect(result.n).toBe(1);
    });
  });
});
