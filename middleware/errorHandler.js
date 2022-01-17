const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500);
  res.json({ message: err.message, error: err });
};

module.exports = errorHandler;
