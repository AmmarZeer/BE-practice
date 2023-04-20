const express = require("express");
const { STATUS_CODE } = require("../utils/enums");
const { isProcessed } = require("../middlewares/middleWares");
const { createDiagramValidationSchema } = require("../utils/validationSchema");
const {
  getDiagrams,
  getDiagramById,
  setDiagram,
  deleteDiagram,
} = require("../controllers/diagramControllers");
const router = express.Router();

//fetch all
router.get("/", (req, res, next) => {
  getDiagrams(req, res, next);
});

// fetch 1
router.get("/:id", (req, res, next) => {
  getDiagramById(req, res, next);
});

//create
router.post("/", isProcessed, (req, res, next) => {
  const { error, value } = createDiagramValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return next({
      statusCode: STATUS_CODE.BAD_REQUEST,
      message: error.message,
    });
  }
  setDiagram(value, res, next);
});

//update
router.put("/:id", (req, res, next) => {});

//Delete
router.delete("/:id", (req, res, next) => {
  deleteDiagram(req, res, next);
});

module.exports = router;
