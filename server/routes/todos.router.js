// express constants
const express = require("express");
//const todoRouter = express.Router();
const router = express.Router();
// DB CONNECTION
// Import pool
const pool = require("../modules/pool.js");

// GET
// initial GET request

router.get("/", (req, res) => {
    let queryText = 'SELECT * FROM "todos";'; //select all from "todos" table
  
    // ! use the pool to send query
    pool
      .query(queryText)
      .then((result) => {
        console.log(result.rows);
        console.log("todos is running!!");
        res.send(result.rows);
      })
      .catch((error) => {
        console.log("Woops, error making query: ", queryText);
        console.error(error);
        res.sendStatus(500);
      });
  });

// POST
// making a todo
router.post("/", (req, res) => {
    console.log("req.body", req.body);
  
    const newTodo = req.body;
  //   newTodo is declared
  
    // Sending data to DB
    // ! Querytext
    const queryText = `
       INSERT INTO "todos" ("text", "isComplete")
       VALUES
           ($1, $2);
       `;
  
    let queryParams = [
      newTodo.text,
      newTodo.isComplete,
    ];
    console.log("QueryText:", queryText);
    console.log("QueryParams:", queryParams);
  
    pool
      .query(queryText, queryParams)
      .then((result) => {
        console.log("QueryText:", queryText);
        res.sendStatus(201);
      })
  
      .catch((error) => {
        console.log("Woops, error making query: ", queryText);
        console.error(error);
        res.sendStatus(500);
      });
  
  })
// PUT
router.put("/:id", (req, res) => {
    let todoId = req.params.id;
    console.log("todoID", todoId);
    let queryText;
    let queryParams = [todoId];
    pool
      .query(queryText, queryParams)
      .then((result) => {
        res.sendStatus(204);
      })
      .catch((error) => {
        console.log("Woops, error making query: ", queryText);
        console.error(error);
        res.sendStatus(500);
      });
  });
// DELETE
//
// Request must include a parameter indicating what book to update - the id
router.delete("/:id", (req, res) => {
    // Accessing the ID directly from req.params
    // No need to assign it to another variable like reqId
    let todoId = req.params.id;
    console.log("todo id:", todoId);
  
    // SQL query to delete the book with the specified ID
    let sqlText = "DELETE FROM todos WHERE id=$1;";
  
    // Executing the query using the pool object
    pool
      .query(sqlText, [todoId])
      .then((result) => {
        console.log("todo ElImInAtEd");
        res.sendStatus(200); // Send success status
      })
      .catch((error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500); // Send error status if there's a problem
      });
  });

module.exports = router;

// DROP TABLE IF EXISTS "todos";

// CREATE TABLE "todos" (
// 	"id" SERIAL PRIMARY KEY,
// 	"text" TEXT,
// 	"isComplete" BOOLEAN DEFAULT FALSE
// );

// INSERT INTO "todos"
//   ("text")
//   VALUES 
//   ('Build a CRUD app'),
//   ('Make my app look nice');
