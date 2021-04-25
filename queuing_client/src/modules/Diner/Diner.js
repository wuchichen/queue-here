import "react-datepicker/dist/react-datepicker.css";
import "./Diner.css";
import { Route, Switch } from "react-router-dom";
import ListBookingComponent from "./components/ListBooking/ListBookingComponent";
import ListRestaurantComponent from "./components/ListRestaurant/ListRestaurantComponent";
import AddRestaurantBookingComponent from "./components/AddRestaurantBooking/AddRestaurantBookingComponent";
import EditRestaurantBookingComponent from "./components/EditRestaurantBooking/EditRestaurantBookingComponent";

const Diner = () => {
  return (
    <div className="Diner">
      <Switch>
        <Route
          exact
          path="/dashboard/diner/restaurants"
          component={ListRestaurantComponent}
        ></Route>

        <Route
          exact
          path="/dashboard/diner/bookings/restaurants/:restaurantId/create"
          component={AddRestaurantBookingComponent}
        ></Route>

        <Route
          exact
          path="/dashboard/diner/bookings"
          component={ListBookingComponent}
        ></Route>

        <Route
          path="/dashboard/diner/bookings/:bookingId"
          component={EditRestaurantBookingComponent}
        ></Route>
      </Switch>
    </div>
  );
};

export default Diner;
