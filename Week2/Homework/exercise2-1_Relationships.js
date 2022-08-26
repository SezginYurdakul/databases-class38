const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "hyfweek2",
});

connection.connect();

const query1 = `CREATE TABLE research_Papers (
  paper_id INT NOT NULL,
  paper_title varchar(100) NOT NULL,
  conference INT NOT NULL,
  publish_date DATE NOT NULL,
  author_no INT NOT NULL,
  PRIMARY KEY (paper_id),
  FOREIGN KEY (author_no) REFERENCES authors(author_no)
);`;

const query2 = `ALTER TABLE authors
ADD COLUMN mentor  VARCHAR(50) AFTER author_name`;

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
