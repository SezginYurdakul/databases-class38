const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

runQueries = [
  // 1-What are the names of countries with population greater than 8 million?
  (query1 = `SELECT Name , Population FROM world.country where Population >8000000 ; `),
  // 2-What are the names of countries that have “land” in their names?
  (query2 = `SELECT Name FROM world.country where Name like "%land%" ; `),
  //3- What are the names of the cities with population in between 500,000 and 1 million?
  (query3 = `SELECT  Name, Population FROM city WHERE Population BETWEEN 500000 AND 1000000 ;`),
  //4- What's the name of all the countries on the continent ‘Europe’?
  (query4 = `SELECT Name FROM country where Continent="Europe" order by Name;`),
  //5-List all the countries in the descending order of their surface areas.
  (query5 = `SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC;`),
  // 6-What are the names of all the cities in the Netherlands?
  (query6 = `SELECT city.Name FROM world.city where CountryCode=(select country.Code from country where country.Name="Netherlands");`),
  // 7-What is the population of Rotterdam?
  (query7 = `SELECT Name , Population FROM world.city where Name="Rotterdam";`),
  // 8-What's the top 10 countries by Surface Area?
  (query8 = `SELECT Name , SurfaceArea FROM world.country order by SurfaceArea desc limit 10;`),
  // 9-What's the top 10 most populated cities?
  (query9 = `SELECT Name , Population FROM world.city order by Population Limit 10;`),
  // 10-What is the population number of the world?
  (query10 = `SELECT sum(Population) as World_Population FROM world.country;`),
];

runQueries.forEach((query) => {
    connection.query(query, (err, result) => {
    if(err) throw err;
    console.log(query);
    console.table(result);
  });
});
connection.end();
