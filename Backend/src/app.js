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
const analysesRoutes = require("./routes/dashboard/owner/analyses.routes");
const settingsRoutes = require("./routes/dashboard/owner/settings.routes");
const fileRoutes = require("./routes/files.route");
const exportRoutes = require("./routes/dashboard/owner/export.routes");
const path = require("path");
const SetupCompanyRoutes = require("./routes/dashboard/owner/setupCompanyFirst.routes");
const setupRoutes = require("./routes/dashboard/admin/setup.routes");
const internalRoutes = require("./routes/dashboard/admin/internal.routes");
const activityLogRoutes = require("./routes/dashboard/admin/activityLog.routes");
// admin
const adminOverview = require("./routes/dashboard/admin/overview.routes");
const adminUser = require("./routes/dashboard/admin/users/users.routes");
const adminCompanyRoutes = require("./routes/dashboard/admin/companies/companies.routes");
const admincategoriesRoutes = require("./routes/dashboard/admin/categories/categories.routes");
const adminActivityLogsRoutes = require("./routes/dashboard/admin/activity-logs/activityLogs.routes");

// import routes

//
server.use(
  "/uploads",
  express.static(path.join(__dirname, "public", "uploads"))
);
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
server.use("/dashboard/owner", analysesRoutes);
server.use("/dashboard/owner/settings", settingsRoutes);
server.use("/dashboard/owner/settings/files", fileRoutes);
server.use("/dashboard/owner", exportRoutes);
server.use("/dashboard/owner", SetupCompanyRoutes);
server.use("/setup", setupRoutes);
server.use("/internal", internalRoutes);
server.use("/activity-logs", activityLogRoutes);
server.use("/admin/overview", adminOverview);
server.use("/admin/users", adminUser);
server.use("/admin/companies", adminCompanyRoutes);
server.use("/admin/categories", admincategoriesRoutes);
server.use("/admin/activity-logs", adminActivityLogsRoutes);

//
server.listen(PORT, function (req, res) {
  console.log(`Server is running on port:http://localhost:${PORT}`);
});
