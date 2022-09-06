const util = require("util");
var prompt = require("prompt");
var mysql = require("mysql");
//const { endianness } = require("os");
const conn = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
  multipleStatements: true,
});

function getPopulation(Country, name, code, cb) {
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result);
    }
  );
}

const queryResult = (error, result) => {
  if (error) {
    console.log(error);
  }
  console.table(result);
};
getPopulation("country", "Albania", "ALB  ' OR ' 1=1 ;  ", queryResult);
conn.end();
