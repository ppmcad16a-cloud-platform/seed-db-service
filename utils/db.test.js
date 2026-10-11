const mongoose = require('mongoose');

const setupDB = require('./db');

afterEach(() => {
  jest.restoreAllMocks();
});

describe('setupDB', () => {
  it('connects and logs the success message', async () => {
    jest.spyOn(mongoose, 'connect').mockResolvedValue({});
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await setupDB();

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('MongoDB Connected'));
  });

  it('logs and re-throws when the connection attempt fails', async () => {
    jest.spyOn(mongoose, 'connect').mockRejectedValue(new Error('conn failed'));
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await expect(setupDB()).rejects.toThrow('conn failed');
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('MongoDB connection failed'));
  });
});
