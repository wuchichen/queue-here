import Ajax from "./ajax";
import AuthService from "./AuthService";

const createBooking = async (booking) => {
  var url = "http://localhost:8080/api/v1/bookings";

  return Ajax.restCall(url, "post", {
    token: AuthService.getJWT(),
    data: booking,
  });
};

const getBookings = async () => {
  var url = "http://localhost:8080/api/v1/bookings";

  return Ajax.restCall(url, "get", {
    token: AuthService.getJWT(),
  });
};

const getBooking = async (bookingId) => {
  var url = `http://localhost:8080/api/v1/bookings/${bookingId}`;

  return Ajax.restCall(url, "get", { token: AuthService.getJWT() });
};

const updateBooking = async (booking) => {
  var url = `http://localhost:8080/api/v1/bookings/${booking._id}`;

  return Ajax.restCall(url, "put", {
    token: AuthService.getJWT(),
    data: booking,
  });
};

const BookingService = {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
};
export default BookingService;
