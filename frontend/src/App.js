import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Unauthorized from "./pages/Unauthorized";
import OwnerDashboard from "./pages/Dashboard/owner/OwnerDashboard";
import PrivateRoute from "./routes/PrivateRoute";
import OwnerLayout from "~/layouts/OwnerLayout";
import GlobalStyles from "./components/GlobalStyles";
import TransactionPage from "./pages/Dashboard/owner/transactions/TransactionPage";
import ReportsPage from "./pages/Dashboard/owner/reports/ReportsPage";
import AnalysesPage from "./pages/Dashboard/owner/analyses/AnalysesPage";
import SettingsPage from "./pages/Dashboard/owner/settings/SettingsPage";
import ExportPage from "~/pages/Dashboard/owner/exports/ExportReportsPage";
import SetupCompany from "./pages/Dashboard/owner/SetupCompany";
// accountant
import AccountantLayout from "~/layouts/AccountantLayout";
import AccountantDashboard from "./pages/Dashboard/accountant/AccountantDashboard";
import AccountantTransactions from "./pages/Dashboard/accountant/AccountantTransactions";
import AccountantReports from "./pages/Dashboard/accountant/AccountantReports";
import AccountantAnalyses from "~/pages/Dashboard/accountant/AccountantAnalyses";
import AccountantExports from "~/pages/Dashboard/accountant/AccountantExports";
import AccountantSettings from "~/pages/Dashboard/accountant/AccountantSettings";
function App() {
  return (
    <GlobalStyles>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* ✅ Route cần bảo vệ */}

          {/* ✅ Protected route with layout */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute role="owner" requireCompanyId={true}>
                <OwnerLayout /> {/* layout bên trong sẽ switch theo role */}
              </PrivateRoute>
            }
          >
            {/* 🔥 Route con để hiển thị trong <Outlet /> */}
            <Route index element={<OwnerDashboard />} />
            <Route path="transactions" element={<TransactionPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="analyses" element={<AnalysesPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="exports" element={<ExportPage />} />
          </Route>

          {/* 404 page */}
          <Route
            path="*"
            element={
              <div className="text-center mt-20">404 - Không tìm thấy</div>
            }
          />

          {/* Route cho owner chưa có công ty */}
          <Route
            path="/setupcompanyFirst"
            element={
              <PrivateRoute role="owner">
                <SetupCompany />
              </PrivateRoute>
            }
          />
          {/* {Route cho accountant} */}
          <Route
            path="/accountant"
            element={
              <PrivateRoute role="accountant">
                <AccountantLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<AccountantDashboard />} />
            <Route path="transactions" element={<AccountantTransactions />} />
            <Route path="reports" element={<AccountantReports />} />
            <Route path="analyses" element={<AccountantAnalyses />} />
            <Route path="exports" element={<AccountantExports />} />
            <Route path="settings" element={<AccountantSettings />} />
          </Route>
        </Routes>
      </Router>
    </GlobalStyles>
  );
}

export default App;
