const express = require("express");
const server = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./routes/user.routes");
const companyRoutes = require("./routes/company.routes");

const PORT = process.env.PORT;

// import routes

//
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(express.static("public"));

// routes
server.use("/users", userRoutes);
server.use("/companies", companyRoutes);

//
server.listen(PORT, function (req, res) {
  console.log(`Server is running on port:http://localhost:${PORT}`);
});
