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

  // Sending data to DB
  // ! Querytext
  const queryText = `
       INSERT INTO "todos" ("text", "isComplete")
       VALUES
           ($1, $2);
       `;

  let queryParams = [newTodo.text, newTodo.isComplete];
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
});
// PUT route for completing a todo
router.put("/complete/:id", (req, res) => {
  const id = req.params.id;
  const queryText = `UPDATE "todos" SET "isComplete" = TRUE WHERE "id" = $1`;
  pool
    .query(queryText, [id])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.error("Error in PUT", err);
      res.sendStatus(500);
    });
});
// DELETE route
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const queryText = `DELETE FROM "todos" WHERE "id" = $1`;
  pool
    .query(queryText, [id])
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.error("Error in DELETE", err);
      res.sendStatus(500);
    });
});
module.exports = router;
