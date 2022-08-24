import { queries } from "./recipeInserts.js";
import {
  CREATE_TABLE_tbl_category,
  CREATE_TABLE_tbl_food_list,
  CREATE_TABLE_tbl_unit_list,
  CREATE_TABLE_tbl_recipe,
  CREATE_TABLE_tbl_ingredient_records,
  CREATE_TABLE_tbl_step_records,
} from "./createRecipeTables.js";

import mysql from "mysql";
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_Recipe",
});

async function createAndInsertDatabase() {
  connection.connect();
  try {
    await Promise.all[
      (connection.query(CREATE_TABLE_tbl_category),
      connection.query(CREATE_TABLE_tbl_food_list),
      connection.query(CREATE_TABLE_tbl_unit_list),
      connection.query(CREATE_TABLE_tbl_recipe),
      connection.query(CREATE_TABLE_tbl_ingredient_records),
      connection.query(CREATE_TABLE_tbl_step_records))
    ];
    console.log("Database created");
    await Promise.all(queries.map((query) => connection.query(query)));
    console.log("Database data inserted");
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

createAndInsertDatabase();
