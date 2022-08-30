const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "hyfweek2",
});

connection.connect();

const selectQueries = [
  {query_Text : "1-Write a query that prints names of all authors and their corresponding mentors.",
  SQL_query: `SELECT 
    authors.author_no,
    authors.author_name,
    Mentor.author_name AS "Mentor Name"
  FROM authors Mentor
  INNER JOIN authors
    ON authors.mentor = Mentor.author_no;`},
  {query_Text : `2-Write a query that prints all columns of authors and their published paper_title.
                 If there is an author without any research_Papers, print the information of that author too.`,
  SQL_query: 
  `SELECT
    authors.author_no,
    authors.author_name,
    authors.mentor,
    authors.university,
    authors.date_of_birth,
    authors.h_index,
    authors.gender,
    research_papers.paper_title
  FROM junction_authors_research_papers
  RIGHT OUTER JOIN authors
    ON junction_authors_research_papers.author_no = authors.author_no
  LEFT OUTER JOIN research_papers
    ON junction_authors_research_papers.paper_id = research_papers.paper_id;`}
];


selectQueries.forEach((query) => {
  connection.query(query.SQL_query, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(query.query_Text);
    console.log(query.SQL_query);
    console.table(results);
  });
});
connection.end();


