function isProcessed(req, res, next) {
  console.log("going through a middleware");
  req.body.is_processed = true;
  next();
}

module.exports = {
  isProcessed,
};
