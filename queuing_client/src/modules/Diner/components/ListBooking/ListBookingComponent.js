import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookingService from "../../../../utils/BookingService";
import moment from "moment";

const ListBookingComponent = (props) => {
  const [bookings, setBookings] = useState(null);

  const getBookings = async () => {
    return BookingService.getBookings().then((data) => {
      setBookings(data);
      return data;
    });
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div className="ListBookingComponent">
      <div className="d-flex justify-content-between align-items-center">
        <h1>List Bookings</h1>
        <Link to="/dashboard/diner/restaurants">
          <button className="btn btn-outline-info">Add Booking</button>
        </Link>
      </div>

      <table className="table mt-4">
        <thead>
          <tr>
            <th>#</th>

            <th>Restaurant</th>
            <th>Reserved Date</th>
            <th>Time Slot</th>
            <th>Number of Diner</th>
            <th>Address</th>
          </tr>
        </thead>

        <tbody>
          {bookings &&
            bookings.map((booking, idx) => (
              <tr key={idx}>
                <th>
                  <Link to={`/dashboard/diner/bookings/${booking._id}`}>
                    <button className="btn btn-outline-info py-0 m-0">
                      Edit
                    </button>
                  </Link>
                </th>
                <th>{booking.restaurant.name}</th>
                <td>{moment(booking.reservedDate).format("DD MMM YYYY")}</td>
                <td>{`${booking.slot.hour}:00`}</td>
                <td>{booking.numberOfCustomer}</td>
                <td>{booking.restaurant.address}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListBookingComponent;
