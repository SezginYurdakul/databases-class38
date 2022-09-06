const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "hyfweek3",
});

connection.connect();

const query1=`INSERT INTO account values(101,5500),(102,4500),(103,4750),(104,6750),(105,7300);`;
const query2=`INSERT INTO account_changes values(1001,101,300,'2022-09-01','Some extra notes'),
(1002,102,500,'2022-09-02','Some extra notes'),(1003,101,750,'2022-09-03','Some extra notes'),
(1004,103,250,'2022-09-02','Some extra notes'),(1005,105,800,'2022-09-03','Some extra notes');`
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