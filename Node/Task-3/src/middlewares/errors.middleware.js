function errorHandler(err, req, res, next) {
  res.json({
    code: err.statusCode,
    message: err.message
  });
}

function pageNotFound(req, res, next) {
  res.status(404).json({
    code: res.statusCode
  })
}

module.exports = {
  errorHandler,
  pageNotFound
}
