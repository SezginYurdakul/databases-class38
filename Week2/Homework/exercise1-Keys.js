const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "hyfweek2",
});

connection.connect();

const query1 = `CREATE TABLE authors (
  author_no INT NOT NULL,
  author_name varchar(100) NOT NULL,
  university varchar(100) NOT NULL,
  date_of_birth DATE NOT NULL,
  h_index INT NOT NULL,
  gender VARCHAR(10) NOT NULL,
  PRIMARY KEY (author_no)
);`;

const query2 = `ALTER TABLE authors
ADD COLUMN mentor  INT AFTER author_name,
ADD FOREIGN KEY (mentor) REFERENCES authors(author_no);`;

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
