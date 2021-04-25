import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RestaurantService from "../../../../utils/RestaurantService";

const ListRestaurantComponent = (props) => {
  const [restaurants, setRestaurants] = useState(null);

  const getRestaurants = async () => {
    return RestaurantService.getRestaurants().then((data) => {
      setRestaurants(data);
      return data;
    });
  };

  // Init page with async data
  useEffect(() => {
    // async call
    getRestaurants();
  }, []);

  return (
    <div className="ListRestaurantComponent">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Add Booking - Step 1</h1>
        <Link to="/dashboard/diner/bookings">
          <button className="btn btn-outline-info">Back to List</button>
        </Link>
      </div>

      <table className="table mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Owner</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Public Holiday</th>
            <th>Max Dining Number per Slot</th>
          </tr>
        </thead>

        <tbody>
          {restaurants &&
            restaurants.map((restaurant, idx) => (
              <tr key={idx}>
                <th>
                  <Link
                    to={`/dashboard/diner/bookings/restaurants/${restaurant._id}/create`}
                  >
                    <button className="btn btn-outline-info py-0 m-0">
                      Book
                    </button>
                  </Link>
                </th>
                <th>{restaurant.name}</th>
                <td>{`${restaurant.owner.firstName} ${restaurant.owner.lastName}`}</td>
                <td>{restaurant.address}</td>
                <td>{restaurant.phone}</td>
                <td>{restaurant.publicHoliday ? "Open" : "Close"}</td>
                <td>{restaurant.maxNumberAtTime}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListRestaurantComponent;
