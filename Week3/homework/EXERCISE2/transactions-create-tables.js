const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "hyfweek3",
});

connection.connect();

const query1 = `CREATE TABLE account (
    account_number int NOT NULL,
    balance int NOT NULL DEFAULT '0',
    PRIMARY KEY (account_number)
  );`;

const query2 = `CREATE TABLE account_changes (
    change_number int NOT NULL,
    account_number int NOT NULL,
    amount int NOT NULL,
    changed_date date NOT NULL,
    remark varchar(100) DEFAULT NULL,
    PRIMARY KEY (change_number),
    KEY Account_Number_FK (account_number),
    CONSTRAINT Account_Number_FK FOREIGN KEY (account_number) REFERENCES account (account_number)
  );`;
function queryRunner(query) {
  connection.query(query, function (error) {
    if (error) {
      throw error;
    }
    console.log("Statement is running");
  });
}
queryRunner(query1);
queryRunner(query2);
connection.end();
