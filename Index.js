//Modules
const express = require("express");
const { STATUS_CODE } = require("./utils/enums");
const { createDiagramSchema } = require("./utils/schemas");
const { errorHandler } = require("./utils/errorHandler");
const { isProcessed } = require("./utils/middleWares");

//initalizations
const app = express();

//Memory
let diagrams = [
  {
    id: 1,
    name: "Random chart",
    inHouse: false,
  },
  {
    id: 2,
    name: "Block diagram",
    inHouse: true,
  },
  {
    id: 3,
    name: "xyz",
    inHouse: true,
  },
];

app.use(express.json());

//Controllers
app.get("/", (req, res) => {
  res.status(STATUS_CODE.SUCCESS).send("Consider this the home page");
});

//fetch all
app.get("/diagrams", (req, res) => {
  res
    .status(STATUS_CODE.SUCCESS)
    .send(
      diagrams.length ? diagrams : "No Diagrams are available at the moment"
    );
});

// fetch 1
app.get("/diagrams/:id", (req, res, next) => {
  const diagram = diagrams.find((diagram) => diagram.id == req.params.id);
  if (!diagram) {
    return next({
      statusCode: STATUS_CODE.NOT_FOUND,
      message: "This diagram doesn't exist",
    });
  }
  res.status(STATUS_CODE.SUCCESS).send(diagram);
});

//create
app.post("/diagrams", isProcessed, (req, res, next) => {
  const { error, value } = createDiagramSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return next({
      statusCode: STATUS_CODE.BAD_REQUEST,
      message: error.message,
    });
  }
  const newDiagram = { id: diagrams.length + 1, ...value };
  diagrams.push(newDiagram);
  res.status(STATUS_CODE.SUCCESS).send(newDiagram);
});

//Delete
app.delete("/diagrams/:id", (req, res, next) => {
  const diagram = diagrams.find((diagram) => diagram.id == req.params.id);
  if (!diagram) {
    return next({
      statusCode: STATUS_CODE.NOT_FOUND,
      message: "This diagram doesn't exist",
    });
  }
  diagrams = diagrams.filter((d) => d.id !== diagram.id);
  res.status(STATUS_CODE.SUCCESS).send(diagram);
});

app.use(errorHandler);
app.listen(3000, () => console.log("Listenning to port 3000"));
