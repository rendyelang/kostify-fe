import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import { QueryProvider } from "./components/providers/QueryProvider";
import ToasterProvider from "./components/providers/ToasterProvider";
import EventBusProvider from "./components/providers/EventBusProvider";
import DashboardLayout from "./components/DashboardLayout";
import Home from "./pages/dashboard/Home";
import Rooms from "./pages/dashboard/rooms/Rooms";
import PaymentReport from "./pages/dashboard/PaymentReport";
import FinancialReports from "./pages/dashboard/FinancialReports";
import Helps from "./pages/Helps";
import DialogDetailRoom from "./components/Rooms/DialogDetailRoom";
import AddRoom from "./pages/dashboard/rooms/AddRoom";
import UpdateRoom from "./pages/dashboard/rooms/UpdateRoom";
import Tenants from "./pages/dashboard/tenants/Tenants";
import AddTenant from "./pages/dashboard/tenants/AddTenant";
import UpdateTenant from "./pages/dashboard/tenants/UpdateTenant";

function App() {
  return (
    <div className="font-poppins">
      <QueryProvider>
        <ToasterProvider>
          <Router>
            <EventBusProvider>
              <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* Dashboard */}
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<Home />} />

                  <Route path="/dashboard/rooms" element={<Rooms />}>
                    <Route
                      path="/dashboard/rooms/:room_id"
                      element={<DialogDetailRoom />}
                    />
                  </Route>
                  <Route path="/dashboard/rooms/add" element={<AddRoom />} />
                  <Route
                    path="/dashboard/rooms/:roomId/edit"
                    element={<UpdateRoom />}
                  />

                  <Route path="/dashboard/tenants" element={<Tenants />} />
                  <Route
                    path="/dashboard/tenants/add"
                    element={<AddTenant />}
                  />
                  <Route
                    path="/dashboard/tenants/:tenantId/edit"
                    element={<UpdateTenant />}
                  />
                  <Route
                    path="/dashboard/payment-reports"
                    element={<PaymentReport />}
                  />
                  <Route
                    path="/dashboard/financial-reports"
                    element={<FinancialReports />}
                  />
                  <Route path="/dashboard/helps" element={<Helps />} />
                </Route>

              </Routes>
            </EventBusProvider>
          </Router>
        </ToasterProvider>
      </QueryProvider>
    </div>
  );
}

export default App;
