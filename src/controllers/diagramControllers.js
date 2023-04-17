const { STATUS_CODE } = require("../utils/enums");

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
function getDiagrams(req, res, next) {
  console.log(STATUS_CODE);
  res.status(STATUS_CODE.SUCCESS).json({ diagrams });
}
function getDiagramById(req, res, next) {
  const diagram = diagrams.find((diagram) => diagram.id == req.params.id);
  if (!diagram) {
    return next({
      statusCode: STATUS_CODE.NOT_FOUND,
      message: "This diagram doesn't exist",
    });
  }
  res.status(STATUS_CODE.SUCCESS).send(diagram);
}
function setDiagram(value, res, next) {
  const newDiagram = { id: diagrams.length + 1, ...value };
  diagrams.push(newDiagram);
  res.status(STATUS_CODE.SUCCESS).send(newDiagram);
}

function deleteDiagram(req, res, next) {
  const diagram = diagrams.find((diagram) => diagram.id == req.params.id);
  if (!diagram) {
    return next({
      statusCode: STATUS_CODE.NOT_FOUND,
      message: "This diagram doesn't exist",
    });
  }
  diagrams = diagrams.filter((d) => d.id !== diagram.id);
  res.status(STATUS_CODE.SUCCESS).send(diagram);
}

module.exports = {
  getDiagrams,
  getDiagramById,
  setDiagram,
  deleteDiagram,
};
