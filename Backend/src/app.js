const express = require("express");
const server = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./routes/user.routes");
const companyRoutes = require("./routes/company.routes");
const transaction_categoriesRoutes = require("./routes/transaction_categories.routes");
const transactionsRoutes = require("./routes/transaction.routes");
const financial_inputRoutes = require("./routes/financial_input.routes");
const reportsRoutes = require("./routes/report.routes");

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
server.use("/transaction_categories", transaction_categoriesRoutes);
server.use("/transactions", transactionsRoutes);
server.use("/financial_inputs", financial_inputRoutes);
server.use("/reports", reportsRoutes);

//
server.listen(PORT, function (req, res) {
  console.log(`Server is running on port:http://localhost:${PORT}`);
});
