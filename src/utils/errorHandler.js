function errorHandler(err, req, res, next) {
  console.log("handeling error...");
  res.status(err.statusCode).send(err.message);
}

module.exports = {
  errorHandler,
};
