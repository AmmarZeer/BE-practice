//Modules
const express = require("express");
const { STATUS_CODE } = require("./utils/enums");
const { createDiagramSchema } = require("./utils/schemas");
const { errorHandler } = require("./utils/errorHandler");
const { isProcessed } = require("./utils/middleWares");
const { PrismaClient } = require("@prisma/client");

//initalizations
const app = express();
const prisma = new PrismaClient();

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
app.get("/diagrams", async (req, res, next) => {
  try {
    const diagrams = await prisma.diagrams.findMany();
    res
      .status(STATUS_CODE.SUCCESS)
      .send(diagrams.length === 0 ? "No Diagrams Available" : diagrams);
  } catch (e) {
    next({
      statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: e.message,
    });
  }
});

// fetch 1
app.get("/diagrams/:id", async (req, res, next) => {
  try {
    const diagram = await prisma.diagrams.findFirst({
      where: { id: parseInt(req.params.id) },
    });
    res
      .status(STATUS_CODE.SUCCESS)
      .send(diagram ? diagram : "This Diagram isn't available");
  } catch (e) {
    next({
      statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: e.message,
    });
  }
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
app.post("/diagrams", isProcessed, async (req, res, next) => {
  const { error, value } = createDiagramSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return next({
      statusCode: STATUS_CODE.BAD_REQUEST,
      message: error.message,
    });
  }
  const { name, inHouse, isProcessed } = value;
  try {
    const diagram = await prisma.diagrams.create({
      data: { name, in_house: inHouse, is_processed: isProcessed },
    });
    res.status(STATUS_CODE.SUCCESS).send(diagram);
  } catch (e) {
    next({
      statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: e.message,
    });
  }
});

//Delete
app.delete("/diagrams/:id", async (req, res, next) => {
  try {
    const diagram = await prisma.diagrams.delete({
      where: { id: parseInt(req.params.id) },
    });
    res
      .status(STATUS_CODE.SUCCESS)
      .send(diagram ? diagram : "Diagram doesn't exist");
  } catch (e) {
    next({
      statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: e.message,
    });
  }
});

app.use(errorHandler);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listenning to port ${port}`));
