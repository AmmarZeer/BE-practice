//Modules
const express = require("express");
const { STATUS_CODE } = require("./utils/enums");
const { errorHandler } = require("./middlewares/errorHandler");
const connectToDB = require("./config/db");
const dotenv = require("dotenv").config();

//initalizations
connectToDB();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//Controllers
app.get("/", (req, res) => {
  res.status(STATUS_CODE.SUCCESS).send("Consider this the home page");
});

app.use("/diagrams", require("./routes/diagramRoutes"));

app.use(errorHandler);
app.listen(port, () => console.log(`Listenning to port ${port}`));
