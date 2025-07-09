// const express = require("express");
const express = require("express");
const server = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./routes/user.routes");
const companyRoutes = require("./routes/company.routes");
const transaction_categoriesRoutes = require("./routes/transaction_categories.routes");
const transactionsRoutes = require("./routes/transaction.routes");
const financial_inputRoutes = require("./routes/financial_input.routes");
const reportsRoutes = require("./routes/report.routes");
const authRoutes = require("./routes/auth.routes");
const PORT = process.env.PORT;
const ownerDashboardRoutes = require("./routes/dashboard/owner/ownerOverview.routes");

// import routes

//
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(express.static("public"));
server.use(cors({ origin: "http://localhost:3001", credentials: true }));

// routes
server.use("/users", userRoutes);
server.use("/companies", companyRoutes);
server.use("/transaction_categories", transaction_categoriesRoutes);
server.use("/transactions", transactionsRoutes);
server.use("/financial_inputs", financial_inputRoutes);
server.use("/reports", reportsRoutes);
server.use("/auth", authRoutes);
server.use("/dashboard/owner", ownerDashboardRoutes);


//
server.listen(PORT, function (req, res) {
  console.log(`Server is running on port:http://localhost:${PORT}`);
});
