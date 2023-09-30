import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Home from "../layout/Home";
import Navbar from "../layout/Navbar";
import Login from "../userManagement/authentication/Login";
import Register from "../userManagement/authentication/Register";
import Verify from "../userManagement/authentication/Verify";
import AuthContext from "../userManagement/context/UserContext";
import Profile from "../userManagement/user/Profile";
import AddEvent from "../eventManagement/AddEvent";
import ViewEvent from "../eventManagement/ViewEvent";
import ViewListEvents from "../eventManagement/ViewListEvents";
import UpdateEvent from "../eventManagement/UpdateEvent";
import ContextProvider from "../eventManagement/context/ContextProvider";
import EventReport from "../eventManagement/EventReport";
import ViewReservationList from "../reservationManagement/ViewReservationList";
import AddReservation from "../reservationManagement/AddReservation";
import AddRoom from "../roomMangement/AddRoom";
import ViewRooms from "../roomMangement/ViewRooms";
import UpdateRoom from "../roomMangement/UpdateRoom";
import ReservationReport from "../reservationManagement/ReservationReport";
import UpdateReservation from "../reservationManagement/UpdateReservation";
import Reserve from "../reservationManagement/Reserve";
import ConfirmReserve from "../reservationManagement/ConfirmReserve";
import Footer from "../layout/Footer";
import Dashboard from "../layout/Dashboard";
import AvailableEventsForCustomer from "../eventManagement/AvailableEventsForCustomer";
import EventForCustomer from "../eventManagement/EventForCustomer";
import RoomReport from "../roomMangement/RoomReport";
import UpdateProfile from "../userManagement/user/UpdateProfile";
import ChangePassword from "../userManagement/user/ChangePassword";
import AddUser from "../userManagement/user/AddUser";
import UserList from "../userManagement/user/UserList";
import UpdateUser from "../userManagement/user/UpdateUser";
import UserReport from "../userManagement/user/UserReport";
import ViewAllAvailableRoom from "../roomMangement/ViewAllAvailableRoom";
import RoomDetailsView from "../roomMangement/RoomDetailsView";

function Router() {
  /* Getting the userType from the AuthContext. */
  const { userType } = useContext(AuthContext);

  return (
    <div className="App">
      <ContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/verify/:id/:token" element={<Verify />} />
            <Route exact path="/" element={<Home />} />
            {userType === null && (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/viewAllAvailableRoom"
                  element={<ViewAllAvailableRoom />}
                />
                <Route
                  path="/roomDetailsView"
                  element={<RoomDetailsView />}
                />
                <Route
                  path="/roomDetailsView/:id"
                  element={<RoomDetailsView />}
                />
                <Route
                  path="/AvailableEventsForCustomer"
                  element={<AvailableEventsForCustomer />}
                />
                <Route
                  exact
                  path="/EventForCustomer/:id"
                  element={<EventForCustomer />}
                />
              </>
            )}

            {userType === "Admin" && (
              <>
                <Route exact path="/dashboard" element={<Dashboard />} />

                {/*User Routes for Admin*/}
                <Route path="/users/add" element={<AddUser />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/users/update" element={<UpdateUser />} />
                <Route path="/users/report" element={<UserReport />} />

                {/*Reservation Routes for Admin*/}
                <Route
                  exact
                  path="/reservations"
                  element={<ViewReservationList />}
                />
                <Route
                  exact
                  path="/reservations/add"
                  element={<AddReservation />}
                />
                <Route
                  exact
                  path="/reservations/update"
                  element={<UpdateReservation />}
                />
                <Route
                  exact
                  path="/reservations/report"
                  element={<ReservationReport />}
                />
                {/* Event routes for admin */}
                <Route exact path="/view" element={<ViewListEvents />} />
                <Route exact path="/event/new" element={<AddEvent />} />
                <Route exact path="/edit/:id" element={<UpdateEvent />} />
                <Route exact path="/view/:id" element={<ViewEvent />} />
                <Route path="/eventreport" element={<EventReport />} />
                <Route
                  path="/AvailableEventsForCustomer"
                  element={<AvailableEventsForCustomer />}
                />
                <Route
                  exact
                  path="/EventForCustomer/:id"
                  element={<EventForCustomer />}
                />

                {/*Rooms Routes*/}
                <Route path="/addRoom" element={<AddRoom />} />
                <Route path="/viewRooms" element={<ViewRooms />} />
                <Route path="/updateRoom" element={<UpdateRoom />} />
                <Route path="/roomReport" element={<RoomReport />} />
                <Route path="/viewAllAvailableRoom" element={<ViewAllAvailableRoom />} />
                <Route path="/roomDetailsView/:id" element={<RoomDetailsView />} />
              </>
            )}

            {userType === "Customer" && (
              <>
                {/*Reservation Routes for Customer*/}
                <Route exact path="/reserve" element={<Reserve />} />
                <Route
                  exact
                  path="/reserve/confirm"
                  element={<ConfirmReserve />}
                />
                {/*Room Routes for Customer*/}
                <Route
                  path="/viewAllAvailableRoom"
                  element={<ViewAllAvailableRoom />}
                />
                <Route
                  path="/roomDetailsView/:id"
                  element={<RoomDetailsView />}
                />
                {/* Event Routes for Customer */}
                <Route
                  path="/AvailableEventsForCustomer"
                  element={<AvailableEventsForCustomer />}
                />
                <Route
                  exact
                  path="/EventForCustomer/:id"
                  element={<EventForCustomer />}
                />
              </>
            )}

            {userType === "Customer" || userType === "Admin" ? (
              <>
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/update" element={<UpdateProfile />} />
                <Route
                  path="/profile/change-password"
                  element={<ChangePassword />}
                />
              </>
            ) : (
              ""
            )}

            <Route exact path="*" element={<Home />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default Router;
