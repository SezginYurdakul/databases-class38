import mysql from "mysql";
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_Recipe",
});

const runQueries =[
  //All the vegetarian recipes with potatoes
  `SELECT  * FROM  tbl_recipe
WHERE (tbl_recipe.category1_Id = 
(SELECT  category_Id FROM tbl_category
        WHERE tbl_category.category_Name = 'Vegetarian')
        OR tbl_recipe.category2_Id = (SELECT  category_Id  FROM tbl_category
        WHERE tbl_category.category_Name = 'Vegetarian')  OR tbl_recipe.category3_Id = (SELECT   category_Id
        FROM tbl_category  WHERE tbl_category.category_Name = 'Vegetarian'))
AND (tbl_recipe.recipe_Id = (SELECT  recipe_Id FROM tbl_ingredient_records
        WHERE food_Id = (SELECT food_Id FROM tbl_food_list WHERE food_Desc = 'Potatoes')))`,
  //All the cakes that do not need baking
  `SELECT * FROM tbl_recipe WHERE (tbl_recipe.category1_Id = (SELECT  category_Id  FROM tbl_category
    WHERE tbl_category.category_Name = 'Cake')
            OR tbl_recipe.category2_Id = (SELECT  category_Id FROM tbl_category
            WHERE tbl_category.category_Name = 'Cake')
            OR tbl_recipe.category3_Id = (SELECT category_Id FROM tbl_category
            WHERE tbl_category.category_Name = 'Cake'))
    AND (tbl_recipe.category1_Id = (SELECT category_Id
            FROM tbl_category WHERE tbl_category.category_Name = 'No-Bake')
            OR tbl_recipe.category2_Id = (SELECT category_Id FROM tbl_category
            WHERE tbl_category.category_Name = 'No-Bake')
            OR tbl_recipe.category3_Id = (SELECT category_Id  FROM tbl_category
            WHERE tbl_category.category_Name = 'No-Bake'))`,
    //All the vegan and Japanese recipes
  `SELECT  * FROM tbl_recipe WHERE (tbl_recipe.category1_Id = 
    (SELECT category_Id  FROM tbl_category WHERE tbl_category.category_Name = 'Vegan')
       OR tbl_recipe.category2_Id = (SELECT category_Id FROM tbl_category WHERE tbl_category.category_Name = 'Vegan')
       OR tbl_recipe.category3_Id = (SELECT category_Id FROM tbl_category WHERE tbl_category.category_Name = 'Vegan'))
     AND (tbl_recipe.category1_Id = (SELECT category_Id FROM tbl_category WHERE tbl_category.category_Name = 'Japanese')
       OR tbl_recipe.category2_Id = (SELECT category_Id FROM tbl_category WHERE tbl_category.category_Name = 'Japanese')
       OR tbl_recipe.category3_Id = (SELECT category_Id FROM tbl_category WHERE tbl_category.category_Name = 'Japanese'))`,
];


runQueries.forEach((query) => {
  connection.query(query, (err, result) => {
  if(err) throw err;
  console.log(query);
  console.table(result);
});
});
connection.end();