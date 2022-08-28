import mysql from "mysql";
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "recipe_db",
});

const runQueries =[
  //All the vegetarian recipes with potatoes
  `SELECT
  tbl_recipe.recipe_Id,
  tbl_recipe.recipe_Description,
  tbl_recipe.servings_Number,
  tbl_category.category_Name,
  tbl_food_list.food_Desc
FROM tbl_junction_recipe_category
  INNER JOIN tbl_recipe
    ON tbl_junction_recipe_category.recipe_Id = tbl_recipe.recipe_Id
  INNER JOIN tbl_category
    ON tbl_junction_recipe_category.category_Id = tbl_category.category_Id
  INNER JOIN tbl_ingredient_records
    ON tbl_ingredient_records.recipe_Id = tbl_recipe.recipe_Id
  INNER JOIN tbl_food_list
    ON tbl_ingredient_records.food_Id = tbl_food_list.food_Id
WHERE tbl_category.category_Name = "Vegetarian"
AND tbl_food_list.food_Desc = 'Potatoes';`,


  // //All the cakes that do not need baking
  `SELECT tbl_recipe.recipe_Id,
  tbl_recipe.recipe_Description,
  tbl_recipe.recipe_Created_Date,
  tbl_recipe.servings_Number,
  tbl_category.category_Name
FROM tbl_junction_recipe_category
  INNER JOIN tbl_category
    ON tbl_junction_recipe_category.category_Id = tbl_category.category_Id
  INNER JOIN tbl_recipe
    ON tbl_junction_recipe_category.recipe_Id = tbl_recipe.recipe_Id
WHERE tbl_category.category_Name = "No-Bake"
  OR  tbl_category.category_Name="Cake"
   GROUP BY tbl_recipe.recipe_Id
   HAVING COUNT(tbl_category.category_Name)=2;`,

  //   //All the vegan and Japanese recipes

  `SELECT  tbl_recipe.recipe_Id,
  tbl_recipe.recipe_Description,
  tbl_recipe.recipe_Created_Date,
  tbl_recipe.servings_Number,
  tbl_category.category_Name
FROM tbl_junction_recipe_category
  INNER JOIN tbl_category
    ON tbl_junction_recipe_category.category_Id = tbl_category.category_Id
  INNER JOIN tbl_recipe
    ON tbl_junction_recipe_category.recipe_Id = tbl_recipe.recipe_Id
WHERE tbl_category.category_Name = "Vegan"
OR  tbl_category.category_Name="Japanese"
 GROUP BY tbl_recipe.recipe_Id`,
];


runQueries.forEach((query) => {
  connection.query(query, (err, result) => {
  if(err) throw err;
  console.log(query);
  console.table(result);
});
});
connection.end();