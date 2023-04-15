//Modules
const express = require("express");
const { Client } = require("pg");
const { STATUS_CODE } = require("./utils/enums");
const { createDiagramSchema } = require("./utils/validateSchemas");
const { errorHandler } = require("./utils/errorHandler");
const { isProcessed } = require("./utils/middleWares");

//initalizations
const app = express();
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "testDB",
  port: 5432,
});
client.connect(() => console.log("connected to DB"));

app.use(express.json());

//Controllers
app.get("/", (req, res) => {
  res.status(STATUS_CODE.SUCCESS).send("Consider this the home page");
});

//fetch all
app.get("/diagrams", async (req, res) => {
  try {
    const { rows, rowCount } = await client.query("select * from diagrams");
    if (!rowCount) {
      return next({
        statusCode: STATUS_CODE.NOT_FOUND,
        message: "This diagram doesn't exist",
      });
    }
    res.status(STATUS_CODE.SUCCESS).send(rows);
  } catch (e) {
    next({ statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR, message: e.message });
  }
});

// fetch 1
app.get("/diagrams/:id", async (req, res, next) => {
  try {
    const { rows, rowCount } = await client.query(
      "SELECT * FROM diagrams WHERE id=($1)",
      [req.params.id]
    );
    if (!rowCount) {
      return next({
        statusCode: STATUS_CODE.NOT_FOUND,
        message: "This diagram doesn't exist",
      });
    }
    res.status(STATUS_CODE.SUCCESS).send(rows);
  } catch (e) {
    next({ statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR, message: e.message });
  }
});

//create
app.post("/diagrams", isProcessed, async (req, res, next) => {
  //validate user input
  const { error, value } = createDiagramSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return next({
      statusCode: STATUS_CODE.BAD_REQUEST,
      message: error.message,
    });
  }
  //add input to table row
  const { name, inHouse, isProcessed } = value;
  console.log(name, inHouse, isProcessed);
  try {
    const newDiagram = await client.query(
      " INSERT INTO diagrams (name,in_house,is_processed) VALUES ($1,$2,$3)",
      [name, inHouse, isProcessed]
    );
    res.status(STATUS_CODE.SUCCESS).send(newDiagram);
  } catch (e) {
    next({ statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR, message: e.message });
  }
});

//Delete
app.delete("/diagrams/:id", async (req, res, next) => {
  try {
    const { row, rowCount } = await client.query(
      "DELETE FROM diagrams WHERE id = ($1)",
      [req.params.id]
    );
    res
      .status(STATUS_CODE.SUCCESS)
      .send(rowCount === 0 ? "This diagram doesn't exist" : row);
  } catch (e) {
    next({ statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR, message: e.message });
  }
});

app.use(errorHandler);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listenning to port ${port}`));
