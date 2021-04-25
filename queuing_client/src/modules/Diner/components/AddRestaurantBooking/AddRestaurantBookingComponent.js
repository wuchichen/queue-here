import { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import BookingService from "../../../../utils/BookingService";
import RestaurantService from "../../../../utils/RestaurantService";
import DatePicker from "react-datepicker";
import moment from "moment";

const AddRestaurantBookingComponent = (props) => {
  const params = useParams();
  const history = useHistory();

  const [restaurant, setRestaurant] = useState(null);
  const [booking, setBooking] = useState(() => {
    return {
      restaurant: params.restaurantId,
      reservedDate: null,
      slot: { hour: null },
      numberOfCustomer: 1,
    };
  });
  const [slots, setSlots] = useState([]);

  const getRestaurant = async (restaurantId) => {
    return RestaurantService.getRestaurant(restaurantId).then((data) => {
      setRestaurant(data);
      return data;
    });
  };

  useEffect(() => {
    getRestaurant(params.restaurantId);
  }, []);

  useEffect(() => {
    if (restaurant) {
      handleReserveDateChange(restaurant._id, new Date());
    }
  }, [restaurant]);

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

  function handleReserveDateChange(restaurantId, date) {
    // remove time part
    date = moment(date).startOf("day").toDate();

    // call API to get available slots
    RestaurantService.getRestaurantSlots(restaurantId, date.toISOString()).then(
      (data) => {
        setSlots(data);
        setBooking((prev) => {
          return { ...prev, slot: { hour: null }, reservedDate: date };
        });
      }
    );
  }

  function checkSlotAvailability(slot) {
    const total = parseInt(slot.count) + parseInt(booking.numberOfCustomer);
    return total > restaurant.maxNumberAtTime ? true : false;
  }

  function onSubmitBtnClick(e) {
    var reqBody = {
      ...booking,
      reservedDate: booking.reservedDate.toISOString(),
    };
    BookingService.createBooking(reqBody).then((data) => {
      toast.success("Create successfully");
      history.push("/dashboard/diner/bookings");
    });
  }

  return (
    <div className="AddRestaurantBookingComponent">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Add Booking - Step 2</h1>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">{restaurant?.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {restaurant?.address}
          </h6>
          <p className="card-text">{restaurant?.description}</p>
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
                handleReserveDateChange(restaurant?._id, date)
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
                    key={i}
                    disabled={checkSlotAvailability(slot)}
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

export default AddRestaurantBookingComponent;
