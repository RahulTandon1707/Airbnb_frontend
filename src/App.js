import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Admin pages
import AddAdmin from "./pages/admin/AddAdmin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import ViewAdmin from "./pages/admin/ViewAdmin";
import ChangeAdminPassword from "./pages/admin/ChangeAdminPassword";
import AdminLogin from "./pages/admin/AdminLogin";
import EditAdmin from "./pages/admin/EditAdmin";
import ViewPendingOwner from "./pages/admin/ViewPendingOwners";
import SetOwnerActions from "./pages/admin/SetOwnerActions";
import { AdminProtectedRoute } from "./pages/admin/AdminProtectedRoute";
import { AdminOnly } from "./pages/admin/AdminOnly";
import ViewPendingOwnerProperties from "./pages/admin/ViewPendingOwnerProperties";
import SetOwnerPropertyActions from "./pages/admin/SetOwnerPropertyActions";
import AllBookings from "./pages/admin/AllBookings";
import ViewUsers from "./pages/admin/ViewUsers";
import ViewQueries from "./pages/admin/ViewQueries";

// Owner(Rental) pages
import OwnerLayout from "./pages/owner/OwnerLayout";
import OwnerHome from "./pages/owner/OwnerHome";
import OwnerSignup from "./pages/owner/OwnerSignup";
import OwnerLogin from "./pages/owner/OwnerLogin";
import OwnerProtectedRoute from "./pages/owner/OwnerProtectedRoute";
import ChangeOwnerPassword from "./pages/owner/ChangeOwnerPassword";
import AddProperty from "./pages/owner/AddProperty";
import ViewProperty from "./pages/owner/ViewProperty";
import EditOwnerProperty from "./pages/owner/EditOwnerProperty";
import ViewBookings from "./pages/owner/ViewBookings";
import ViewAllBookings from "./pages/owner/ViewAllBookings";

// User pages
import UserLayout from "./pages/user/UserLayout";
import UserHome from "./pages/user/UserHome";
import UserSignup from "./pages/user/UserSignup";
import UserLogin from "./pages/user/UserLogin";
import UserProfile from "./pages/user/UserProfile";
import About from "./pages/user/About";
import Contact from "./pages/user/Contact";
import EditProfile from "./pages/user/EditProfile";
import UserChangePassword from "./pages/user/UserChangePassword";
import UserProtectedRoute from "./pages/user/UserProtectedRoute";
import Services from "./pages/user/Services";
import Packages from "./pages/user/Packages";
import Cart from "./pages/user/Cart";
import CheckOut from "./pages/user/CheckOut";
import ThankYouForBooking from "./pages/user/ThankYouForBooking";
import MyBookings from "./pages/user/MyBookings";
import ErrorPage from "./pages/user/ErrorPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/admin/admin-login"} element={<AdminLogin />} />
          <Route
            path={"/admin"}
            element={<AdminProtectedRoute Component={AdminLayout} />}
          >
            <Route index element={<AdminHome />} />
            <Route
              path={"add-admin"}
              element={<AdminOnly Component={AddAdmin} />}
            />
            <Route
              path={"view-admin"}
              element={<AdminOnly Component={ViewAdmin} />}
            />
            <Route
              path={"change-admin-password"}
              element={<ChangeAdminPassword />}
            />
            <Route path={"edit-admin/:username"} element={<EditAdmin />} />
            <Route path={"view-pending-owner"} element={<ViewPendingOwner />} />
            <Route path={"actions-owner"} element={<SetOwnerActions />} />
            <Route
              path={"pending-owner-properties"}
              element={<ViewPendingOwnerProperties />}
            />
            <Route
              path={"activated-owner-properties"}
              element={<SetOwnerPropertyActions />}
            />
            <Route path={"all-bookings"} element={<AllBookings />} />
            <Route path={"view-users"} element={<ViewUsers />} />
            <Route path={"view-queries"} element={<ViewQueries />} />
            <Route path={"*"} element={<Navigate to={"/error"} />} />
          </Route>

          {/*Owner Routes*/}
          <Route path={"/owner/owner-login"} element={<OwnerLogin />} />
          <Route path={"/owner/owner-signup"} element={<OwnerSignup />} />
          <Route path="/owner" element={<OwnerLayout />}>
            <Route
              index
              element={<OwnerProtectedRoute Component={OwnerHome} />}
            />
            <Route
              path={"change-owner-password"}
              element={<OwnerProtectedRoute Component={ChangeOwnerPassword} />}
            />
            <Route
              path={"add-property"}
              element={<OwnerProtectedRoute Component={AddProperty} />}
            />
            <Route
              path={"view-property"}
              element={<OwnerProtectedRoute Component={ViewProperty} />}
            />
            <Route
              path={"edit-property/:room_id"}
              element={<OwnerProtectedRoute Component={EditOwnerProperty} />}
            />
            <Route
              path={"view-bookings/:property_name"}
              element={<OwnerProtectedRoute Component={ViewBookings} />}
            />
            <Route
              path={"view-all-bookings"}
              element={<OwnerProtectedRoute Component={ViewAllBookings} />}
            />
            <Route path={"*"} element={<Navigate to={"/error"} />} />
          </Route>

          {/*User Routes*/}
          <Route path={"user-signup"} element={<UserSignup />} />
          <Route path={"user-login"} element={<UserLogin />} />
          <Route path={"/"} element={<UserLayout />}>
            <Route index element={<UserHome />} />
            <Route path={"about"} element={<About />} />
            <Route path={"contact"} element={<Contact />} />
            <Route path={"services"} element={<Services />} />
            <Route path={"packages"} element={<Packages />} />
            <Route
              path={"user-profile"}
              element={<UserProtectedRoute Component={UserProfile} />}
            />
            <Route
              path={"edit-profile/:user_id"}
              element={<UserProtectedRoute Component={EditProfile} />}
            />
            <Route
              path={"change-user-password"}
              element={<UserProtectedRoute Component={UserChangePassword} />}
            />
            <Route
              path={"cart/:room_id"}
              element={<UserProtectedRoute Component={Cart} />}
            />
            <Route
              path={"checkout"}
              element={<UserProtectedRoute Component={CheckOut} />}
            />
            <Route
              path={"booking-done"}
              element={<UserProtectedRoute Component={ThankYouForBooking} />}
            />
            <Route
              path={"mybookings"}
              element={<UserProtectedRoute Component={MyBookings} />}
            />
            <Route path={"*"} element={<Navigate to={"/error"} />} />
          </Route>
          <Route path={"error"} element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
