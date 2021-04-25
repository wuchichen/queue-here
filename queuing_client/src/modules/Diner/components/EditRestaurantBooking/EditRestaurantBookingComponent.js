import { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import BookingService from "../../../../utils/BookingService";
import DatePicker from "react-datepicker";
import moment from "moment";
import RestaurantService from "../../../../utils/RestaurantService";

const EditRestaurantBookingComponent = (props) => {
  const params = useParams();
  const history = useHistory();

  const [prevNumberOfCustomer, setPrevNumberOfCustomer] = useState(0);

  const [slots, setSlots] = useState([]);

  const [booking, setBooking] = useState(null);

  const getBooking = async (bookingId) => {
    return BookingService.getBooking(bookingId).then((data) => {
      // format reserved date
      data.reservedDate = new Date(data.reservedDate);

      // set states
      setPrevNumberOfCustomer(data.numberOfCustomer);
      setBooking(data);
      handleReserveDateChange(data.restaurant._id, data.reservedDate);
      return data;
    });
  };

  useEffect(() => {
    getBooking(params.bookingId);
  }, []);

  function handleChange(e) {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    setBooking({
      ...booking,
      [name]: value,
    });
  }

  function selectSlot(e, hour) {
    setBooking((prev) => {
      return { ...prev, slot: { hour: hour } };
    });
  }

  function handleReserveDateChange(restaurantId, reservedDate) {
    // remove time part
    reservedDate = moment(reservedDate).startOf("day").toDate();

    // call API to get available slots
    RestaurantService.getRestaurantSlots(
      restaurantId,
      reservedDate.toISOString()
    ).then((data) => {
      setSlots(data);
      setBooking((prev) => {
        if (moment(prev.reservedDate).isSame(reservedDate)) {
          return prev;
        } else {
          return { ...prev, slot: { hour: null }, reservedDate: reservedDate };
        }
      });
    });
  }

  function checkSlotAvailability(slot) {
    const total =
      parseInt(slot.count) +
      parseInt(booking.numberOfCustomer) -
      parseInt(prevNumberOfCustomer);

    return total > booking.restaurant.maxNumberAtTime ? true : false;
  }

  function onSubmitBtnClick(e) {
    var reqBody = {
      ...booking,
      reservedDate: booking.reservedDate.toISOString(),
    };
    BookingService.updateBooking(reqBody).then((data) => {
      toast.success("Edit successfully");
      history.push("/dashboard/diner/bookings");
    });
  }

  return (
    <div className="EditRestaurantBookingComponent">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Edit Booking</h1>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">{booking?.restaurant?.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {booking?.restaurant?.address}
          </h6>
          <p className="card-text">{booking?.restaurant?.description}</p>
        </div>
      </div>

      <form>
        {/* reservation date */}
        <div className="row mt-4">
          <label className="col-sm-3 font-weight-bold">Reservation Date</label>

          <div className="col-sm-7 pl-0">
            <DatePicker
              dateFormat="d MMM yyyy"
              selected={booking?.reservedDate}
              onChange={(date) =>
                handleReserveDateChange(booking.restaurant._id, date)
              }
            />
          </div>
        </div>

        <div className="row mt-4">
          <label className="col-sm-3 font-weight-bold">Choose Time Slot</label>
          <div className="col-sm-6 pl-0">
            {!!slots?.length &&
              slots.map((slot, i) => {
                return (
                  <Button
                    disabled={checkSlotAvailability(slot)}
                    key={i}
                    className={
                      booking.slot.hour === slot.hour
                        ? "btn-highlight-1 btn-slot"
                        : "btn-slot"
                    }
                    variant="outline-info"
                    onClick={(e) => selectSlot(e, slot.hour)}
                  >
                    {`${slot.hour}:00`}
                  </Button>
                );
              })}

            {!slots?.length && <div>Not Available</div>}
          </div>
        </div>

        {/* customer number */}
        <div className="form-group row mt-4">
          <label className="col-sm-3 font-weight-bold">
            Number of Customer
          </label>
          <input
            type="number"
            className="form-control col-sm-3"
            name="numberOfCustomer"
            min={1}
            value={booking?.numberOfCustomer || ""}
            onChange={handleChange}
          />
        </div>
      </form>

      <button
        className="btn btn-outline-info my-4 mr-4 px-5"
        onClick={(e) => onSubmitBtnClick(e)}
      >
        Submit
      </button>

      <Link to="/dashboard/diner/bookings">
        <button className="btn btn-secondary my-4 mr-4 px-5">Cancel</button>
      </Link>
    </div>
  );
};

export default EditRestaurantBookingComponent;
