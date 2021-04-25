import "./Owner.css";
import { Route, Switch } from "react-router-dom";
import ListRestaurantComponent from "./components/ListRestaurant/ListRestaurantComponent";
import AddRestaurantComponent from "./components/AddRestaurant/AddRestaurantComponent";
import EditRestaurantComponent from "./components/EditRestaurant/EditRestaurantComponent";

const Owner = () => {
  return (
    <div className="Owner">
      <Switch>
        <Route
          exact
          path="/dashboard/owner/restaurants"
          component={ListRestaurantComponent}
        ></Route>

        <Route
          exact
          path="/dashboard/owner/restaurants/create"
          component={AddRestaurantComponent}
        ></Route>

        <Route
          path="/dashboard/owner/restaurants/:restaurantId"
          component={EditRestaurantComponent}
        ></Route>
      </Switch>
    </div>
  );
};

export default Owner;
