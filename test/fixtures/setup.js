const mongoose = require("mongoose");
mongoose.connection.startSession = jest.fn(() => ({
  startSession: jest.fn(),
  withTransaction: jest.fn(fn => fn()),
  endSession: jest.fn()
}));
jest.setMock("mongoose", mongoose);
