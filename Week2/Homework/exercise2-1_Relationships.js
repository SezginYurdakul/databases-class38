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
  PRIMARY KEY (paper_id)
);`;

const query2 = `CREATE TABLE junction_authors_research_Papers (
  paper_id INT NOT NULL,
  author_no INT NOT NULL,
  FOREIGN KEY (author_no) REFERENCES authors(author_no),
  FOREIGN KEY (paper_id) REFERENCES research_Papers(paper_id)
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
