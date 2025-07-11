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
              <PrivateRoute role="owner">
                <OwnerLayout />
              </PrivateRoute>
            }
          >
            {/* 🔥 Route con để hiển thị trong <Outlet /> */}
            <Route index element={<OwnerDashboard />} />
            <Route path="transactions" element={<TransactionPage />} />
            <Route path="reports" element={<ReportsPage />} />
          </Route>

          {/* 404 page */}
          <Route
            path="*"
            element={
              <div className="text-center mt-20">404 - Không tìm thấy</div>
            }
          />
        </Routes>
      </Router>
    </GlobalStyles>
  );
}

export default App;
