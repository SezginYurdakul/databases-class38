export const CREATE_TABLE_tbl_category = `
CREATE TABLE IF NOT EXISTS tbl_category(
category_Id VARCHAR(20) NOT NULL,
category_Name VARCHAR(100) NOT NULL,
PRIMARY KEY (category_Id));`;

export const CREATE_TABLE_tbl_food_list = `
CREATE TABLE IF NOT EXISTS tbl_food_list(
food_Id VARCHAR(20) NOT NULL,
food_Desc VARCHAR(500) NOT NULL,
is_Available BOOLEAN NOT NULL,
PRIMARY KEY (food_Id));`;

export const CREATE_TABLE_tbl_unit_list = `
CREATE TABLE IF NOT EXISTS tbl_unit_list(
unit_Id VARCHAR(2) NOT NULL,
unit_Description VARCHAR(10) NOT NULL,
PRIMARY KEY (unit_Id));`;

export const CREATE_TABLE_tbl_recipe = `
CREATE TABLE IF NOT EXISTS tbl_recipe(
recipe_Id VARCHAR(20) NOT NULL,
recipe_Description VARCHAR(500) NOT NULL,
recipe_Created_Date DATE NOT NULL,
servings_Number  INT NOT NULL,
PRIMARY KEY (recipe_Id)
);`;


export const CREATE_TABLE_tbl_junction_recipe_category = `
CREATE TABLE IF NOT EXISTS tbl_junction_recipe_category(
junction_Id VARCHAR(20) NOT NULL,
recipe_Id VARCHAR(20) NOT NULL,
category_Id VARCHAR(20) NOT NULL,
PRIMARY KEY (junction_Id),
CONSTRAINT tbl_junction_recipe_category_ibfk_1
  FOREIGN KEY (recipe_Id)
  REFERENCES tbl_recipe(recipe_Id),
CONSTRAINT tbl_junction_recipe_category_ibfk_2
  FOREIGN KEY (category_Id)
  REFERENCES tbl_category(category_Id)
);`;


export const CREATE_TABLE_tbl_ingredient_records = `
CREATE TABLE IF NOT EXISTS tbl_ingredient_records(
record_Id VARCHAR(20) NOT NULL,
recipe_Id VARCHAR(20) NOT NULL,
food_Id VARCHAR(20) NOT NULL,
unit_Id VARCHAR(2) NOT NULL,
amount  INT NOT NULL,
PRIMARY KEY (record_Id),
CONSTRAINT tbl_ingredient_records_ibfk_1
  FOREIGN KEY (recipe_Id)
  REFERENCES tbl_recipe (recipe_Id),
CONSTRAINT tbl_ingredient_records_ibfk_2
  FOREIGN KEY (food_Id)
  REFERENCES tbl_food_list(food_Id),
CONSTRAINT tbl_ingredient_records_ibfk_3
  FOREIGN KEY (unit_Id)
  REFERENCES tbl_unit_list(unit_Id));`;

export const CREATE_TABLE_tbl_step_records = `
CREATE TABLE IF NOT EXISTS tbl_step_records(
record_Id VARCHAR(20) NOT NULL,
recipe_Id VARCHAR(20) NOT NULL,
step_Seq_No  INT NOT NULL,
step_Definition VARCHAR(500) NOT NULL,
step_Duration_Min  INT NOT NULL,
PRIMARY KEY (record_Id),
CONSTRAINT tbl_step_records_ibfk_1
  FOREIGN KEY (recipe_Id)
  REFERENCES tbl_recipe(recipe_Id));`;