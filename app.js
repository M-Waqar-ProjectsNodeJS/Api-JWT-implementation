require("dotenv").config();
require("express-async-errors");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const routeNotFound = require("./middleware/routeNotFound");
const errorHandler = require("./middleware/errorHandler");
const mainRoute = require("./routes/main");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));

app.use("/api", mainRoute);

app.use(routeNotFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on Port: ${port}`);
});
