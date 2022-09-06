const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "hyfweek3",
});

const execQuery = util.promisify(connection.query.bind(connection));

async function proceedMoneyTransaction() {
  connection.connect();

  try {
    await execQuery("START TRANSACTION");
    await execQuery(
      `INSERT INTO account_changes values(1006,101,-1000,'2022-09-01','Transfer to account No :102')`
    );
    await execQuery(
      `INSERT INTO account_changes values(1007,102,1000,'2022-09-01','Transfer from account No :101')`
    );
    await execQuery(
      "UPDATE account SET  account.balance= (account.balance - 1000) WHERE account.account_number = 101;"
    );
    await execQuery(
      `UPDATE account SET  account.balance= (account.balance + 1000) WHERE account.account_number = 102;`
    );

    await execQuery("COMMIT");
    console.log("All changes have been made");
  } catch (error) {
    console.error(error);
    await execQuery("ROLLBACK");
    console.log("All changes are rolled back");
    connection.end();
  }

  connection.end();
}

proceedMoneyTransaction();
