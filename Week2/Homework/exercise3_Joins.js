const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "hyfweek2",
});

connection.connect();

const insertQueries = [
  `SELECT author_name , mentor FROM hyfweek2.authors;`,
  `SELECT authors.* , research_papers.paper_title from authors LEFT OUTER JOIN research_papers 
ON authors.author_no=research_papers.author_no;`,
];

function queryRunner(query) {
  connection.query(query, function (error, result) {
    if (error) {
      throw error;
    }
    console.log(query)
    console.table(result);
  });
}
insertQueries.forEach((query) => {
  queryRunner(query);
});
connection.end();
