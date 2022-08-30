const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "hyfweek2",
});

connection.connect();

const selectQueries = [
  {
    query_Text:
      "1-Write a query that prints names of all authors and their corresponding mentors :",
    SQL_query: `SELECT
  research_papers.paper_id,
  research_papers.paper_title,
  COUNT(authors.author_no) AS "Number Of Author Contributed To Paper"
FROM junction_authors_research_papers
  INNER JOIN authors
    ON junction_authors_research_papers.author_no = authors.author_no
  INNER JOIN research_papers
    ON junction_authors_research_papers.paper_id = research_papers.paper_id
    GROUP BY research_papers.paper_id;`,
  },
  {
    query_Text:
      "2-Sum of the research papers published by all female authors :",
    SQL_query: `SELECT
    count(research_papers.paper_id) AS "Number Of Paper Written By Female Author"
  FROM junction_authors_research_papers
    INNER JOIN authors
      ON junction_authors_research_papers.author_no = authors.author_no
    INNER JOIN research_papers
      ON junction_authors_research_papers.paper_id = research_papers.paper_id
      WHERE gender="female";`,
  },
  {
    query_Text:"3-Average of the h-index of all authors per university :",
    SQL_query: `SELECT
    authors.university,
     ROUND(AVG(authors.h_index),0)
   FROM authors
   GROUP BY authors.university
   ORDER BY university;`,
  },
  {
    query_Text:"4-Sum of the research papers of the authors per university :",
    SQL_query: `SELECT
    authors.university,
    COUNT(research_papers.paper_id) AS "Number Of Paper"
  FROM junction_authors_research_papers
    INNER JOIN authors
      ON junction_authors_research_papers.author_no = authors.author_no
    INNER JOIN research_papers
      ON junction_authors_research_papers.paper_id = research_papers.paper_id
      GROUP BY university
      ORDER BY university;`,
  },
  {
    query_Text:"5-Minimum and maximum of the h-index of all authors per university :",
    SQL_query: `SELECT
    authors.university,
    MIN(h_index) ,
    MAX(h_index)
  FROM junction_authors_research_papers
    INNER JOIN authors
      ON junction_authors_research_papers.author_no = authors.author_no
    INNER JOIN research_papers
      ON junction_authors_research_papers.paper_id = research_papers.paper_id
  GROUP BY authors.university
  ORDER BY university;`,
  },
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
