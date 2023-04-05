function isProcessed(req, res, next) {
  console.log("going through a middleware");
  req.body.isProcessed = true;
  next();
}

module.exports = {
  isProcessed,
};
