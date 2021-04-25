import Ajax from "./ajax";
import AuthService from "./AuthService";

const createRestaurant = async (restaurant) => {
  var url = "http://localhost:8080/api/v1/restaurants";

  return Ajax.restCall(url, "post", {
    token: AuthService.getJWT(),
    data: restaurant,
  });
};

/**
 * Get available slots of restaurant on particular date
 * @param {String} restaurantId restaurant id
 * @param {String} reservedDate reserved date in ISO string
 * @returns {Promise<any>} slots promise
 */
const getRestaurantSlots = async (restaurantId, reservedDate) => {
  var url = `http://localhost:8080/api/v1/restaurants/${restaurantId}/slots?reservedDate=${reservedDate}`;

  return Ajax.restCall(url, "get", {
    token: AuthService.getJWT(),
  });
};

const getRestaurants = async () => {
  var url = "http://localhost:8080/api/v1/restaurants";

  return Ajax.restCall(url, "get", {
    token: AuthService.getJWT(),
  });
};

const getRestaurant = async (restaurantId) => {
  var url = `http://localhost:8080/api/v1/restaurants/${restaurantId}`;

  return Ajax.restCall(url, "get", {
    token: AuthService.getJWT(),
  });
};

const updateRestaurant = async (restaurant) => {
  var url = `http://localhost:8080/api/v1/restaurants/${restaurant._id}`;

  return Ajax.restCall(url, "put", {
    token: AuthService.getJWT(),
    data: restaurant,
  });
};

const RestaurantService = {
  createRestaurant,
  getRestaurants,
  getRestaurant,
  updateRestaurant,
  getRestaurantSlots,
};
export default RestaurantService;
