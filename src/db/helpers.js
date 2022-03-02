const { connection } = require("mongoose");

module.exports = {
  withTransaction: async withTransactionCallback => {
    const session = await connection.startSession();
    let result;
    await session.withTransaction(async () => {
      result = await withTransactionCallback(session);
    });
    session.endSession();
    return result;
  }
};
