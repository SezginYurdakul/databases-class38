const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "hyfweek2",
});

connection.connect();
const insertQueries = [
  `INSERT INTO authors (author_no, author_name ,mentor, university,date_of_birth,h_index ,gender)VALUES(1,'AUTHOR_1','MENTOR_1','UNIVERSITY_1' , '1970-01-01',1,'male');`,
  `INSERT INTO authors (author_no, author_name ,mentor, university,date_of_birth,h_index ,gender)VALUES(2,'AUTHOR_2','MENTOR_1','UNIVERSITY_2' , '1970-01-02',2,'female');`,
  `INSERT INTO authors (author_no, author_name ,mentor, university,date_of_birth,h_index ,gender)VALUES(3,'AUTHOR_3','MENTOR_2','UNIVERSITY_3' , '1970-01-03',3,'male');`,
  `INSERT INTO authors (author_no, author_name ,mentor, university,date_of_birth,h_index ,gender)VALUES(4,'AUTHOR_4','MENTOR_2','UNIVERSITY_4' , '1970-01-04',4,'male');`,
  `INSERT INTO authors (author_no, author_name ,mentor, university,date_of_birth,h_index ,gender)VALUES(5,'AUTHOR_5','MENTOR_2','UNIVERSITY_5' , '1970-01-05',5,'female');`,
  `INSERT INTO authors (author_no, author_name ,mentor, university,date_of_birth,h_index ,gender)VALUES(6,'AUTHOR_6','MENTOR_3','UNIVERSITY_6' , '1970-01-06',6,'male');`,
  `INSERT INTO authors (author_no, author_name ,mentor, university,date_of_birth,h_index ,gender)VALUES(7,'AUTHOR_7','MENTOR_3','UNIVERSITY_7' , '1970-01-07',7,'female');`,
  `INSERT INTO authors (author_no, author_name ,mentor, university,date_of_birth,h_index ,gender)VALUES(8,'AUTHOR_8','MENTOR_3','UNIVERSITY_8' , '1970-01-08',8,'female');`,
  `INSERT INTO authors (author_no, author_name ,mentor, university,date_of_birth,h_index ,gender)VALUES(9,'AUTHOR_9','MENTOR_4','UNIVERSITY_9' , '1970-01-09',9,'male');`,
  `INSERT INTO authors (author_no, author_name ,mentor, university,date_of_birth,h_index ,gender)VALUES(10,'AUTHOR_10','MENTOR_4','UNIVERSITY_10' , '1970-01-10',10,'male');`,
  `INSERT INTO authors (author_no, author_name ,mentor, university,date_of_birth,h_index ,gender)VALUES(11,'AUTHOR_11','MENTOR_4','UNIVERSITY_11' , '1970-01-11',11,'female');`,
  `INSERT INTO authors (author_no, author_name ,mentor, university,date_of_birth,h_index ,gender)VALUES(12,'AUTHOR_12','MENTOR_3','UNIVERSITY_12' , '1970-01-12',12,'female');`,
  `INSERT INTO authors (author_no, author_name ,mentor, university,date_of_birth,h_index ,gender)VALUES(13,'AUTHOR_13','MENTOR_5','UNIVERSITY_13' , '1970-01-13',13,'male');`,
  `INSERT INTO authors (author_no, author_name ,mentor, university,date_of_birth,h_index ,gender)VALUES(14,'AUTHOR_14','MENTOR_5','UNIVERSITY_14' , '1970-01-14',14,'female');`,
  `INSERT INTO authors (author_no, author_name ,mentor, university,date_of_birth,h_index ,gender)VALUES(15,'AUTHOR_15','MENTOR_5','UNIVERSITY_15' , '1970-01-15',15,'male');`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(1,'Paper_Title_1', 2 , '2020-01-01',1 );`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(2,'Paper_Title_2', 0 , '2020-01-02',1 );`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(3,'Paper_Title_3', 1 , '2020-01-03',1 );`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(4,'Paper_Title_4', 5 , '2020-01-04',2 );`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(5,'Paper_Title_5', 3 , '2020-01-05',2 );`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(6,'Paper_Title_6', 2 , '2020-01-06',3 );`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(7,'Paper_Title_7', 0 , '2020-01-07',4 );`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(8,'Paper_Title_8', 1 , '2020-01-08',4 );`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(9,'Paper_Title_9', 5 , '2020-01-09',4 );`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(10,'Paper_Title_10', 3 , '2020-10-05',5 );`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(11,'Paper_Title_11', 2 , '2020-01-12',6 );`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(12,'Paper_Title_12', 0 , '2020-01-15',7 );`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(13,'Paper_Title_13', 1 , '2020-02-03',7 );`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(14,'Paper_Title_14', 5 , '2020-03-04',8 );`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(15,'Paper_Title_15', 3 , '2020-01-16',9 );`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(16,'Paper_Title_16', 2 , '2020-01-17',9 );`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(17,'Paper_Title_17', 0 , '2020-01-18',10 );`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(18,'Paper_Title_18', 1 , '2020-01-19',10 );`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(19,'Paper_Title_19', 5 , '2020-01-20',11 );`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(20,'Paper_Title_20', 3 , '2020-01-21',12 );`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(21,'Paper_Title_21', 2 , '2020-01-22',12 );`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(22,'Paper_Title_22', 0 , '2020-01-23',12 );`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(23,'Paper_Title_23', 1 , '2020-01-24',13 );`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(24,'Paper_Title_24', 5 , '2020-01-25',13 );`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(25,'Paper_Title_25', 3 , '2020-01-26',14 );`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(26,'Paper_Title_26', 2 , '2020-01-27',14 );`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(27,'Paper_Title_27', 0 , '2020-01-28',14 );`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(28,'Paper_Title_28', 1 , '2020-01-29',15 );`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(29,'Paper_Title_29', 5 , '2020-01-30',15 );`,
  `INSERT INTO research_Papers (paper_id,  paper_title ,conference , publish_date, author_no) VALUES(30,'Paper_Title_30', 3 , '2020-01-31',15 );`,
];
function queryRunner(query) {
  connection.query(query, function (error) {
    if (error) {
      throw error;
    }
    console.log("Statement is running");
  });
}
insertQueries.forEach((query) => {
  queryRunner(query);
});
connection.end();
