import { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import QhTimeRangePicker from "../../../../controls/QhTimeRangePicker";
import RestaurantService from "../../../../utils/RestaurantService";

const EditRestaurantComponent = (props) => {
  const history = useHistory();

  const params = useParams();

  const [restaurant, setRestaurant] = useState(null);

  const getRestaurant = async (restaurantId) => {
    return RestaurantService.getRestaurant(restaurantId).then((data) => {
      setRestaurant(data);
      return data;
    });
  };

  useEffect(() => {
    getRestaurant(params.restaurantId);
  }, []);

  function onSubmitBtnClick(e) {
    RestaurantService.updateRestaurant(restaurant).then((data) => {
      toast.success("Edit successfully");
      history.push("/dashboard/owner/restaurants");
    });
  }

  function addTimeSlot(e, week) {
    e.preventDefault();

    setRestaurant((prev) => {
      // do not mute the original state
      var current = JSON.parse(JSON.stringify(prev));

      current.opens[week] = [
        ...current.opens[week],
        { from: { hour: null }, to: { hour: null } },
      ];
      return current;
    });
  }

  function removeTimeSlot(e, week, idx) {
    e.preventDefault();

    setRestaurant((prev) => {
      var current = JSON.parse(JSON.stringify(prev));
      current.opens[week].splice(idx, 1);
      return current;
    });
  }

  function pickTime(e, week, idx, attr) {
    // Selected option (string type)
    const value = e.target.value;
    setRestaurant((prev) => {
      var temp = {
        ...prev,
      };
      // Convert to number
      temp.opens[week][idx][attr].hour = parseInt(value);
      return temp;
    });
  }

  function handleChange(e) {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    setRestaurant({
      ...restaurant,
      [name]: value,
    });
  }

  return (
    restaurant && (
      <div className="EditRestaurantComponent">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Edit Restaurant</h1>
        </div>

        <form>
          {/* name */}
          <div className="form-group row mt-4">
            <label htmlFor="name" className="col-sm-2 font-weight-bold">
              Name
            </label>
            <input
              type="text"
              className="form-control col-sm-7"
              name="name"
              value={restaurant.name}
              onChange={handleChange}
            />
          </div>

          {/* address */}
          <div className="form-group row mt-4">
            <label htmlFor="address" className="col-sm-2 font-weight-bold">
              Address
            </label>
            <input
              type="text"
              className="form-control col-sm-7"
              name="address"
              value={restaurant.address}
              onChange={handleChange}
            />
          </div>

          {/* description */}
          <div className="form-group row mt-4">
            <label htmlFor="description" className="col-sm-2 font-weight-bold">
              Description
            </label>
            <input
              type="text"
              className="form-control col-sm-7"
              name="description"
              value={restaurant.description}
              onChange={handleChange}
            />
          </div>

          {/* phone */}
          <div className="form-group row mt-4">
            <label htmlFor="phone" className="col-sm-2 font-weight-bold">
              Phone
            </label>
            <input
              type="text"
              className="form-control col-sm-7"
              name="phone"
              value={restaurant.phone}
              onChange={handleChange}
            />
          </div>

          {/* Week */}
          <>
            {/* day */}
            <div className="row mt-4">
              <label className="col-sm-2 font-weight-bold">Mon</label>
              <div className="pl-0 col-sm-7">
                <button
                  className="mb-2 btn btn-outline-primary"
                  onClick={(e) => addTimeSlot(e, "Mon")}
                >
                  Add time interval
                </button>
                <QhTimeRangePicker
                  restaurant={restaurant}
                  pickTime={pickTime}
                  removeTimeSlot={removeTimeSlot}
                  week={"Mon"}
                ></QhTimeRangePicker>
              </div>
            </div>

            {/* day */}
            <div className="row mt-4">
              <label className="col-sm-2 font-weight-bold">Tue</label>
              <div className="pl-0 col-sm-7">
                <button
                  className="mb-2 btn btn-outline-primary"
                  onClick={(e) => addTimeSlot(e, "Tue")}
                >
                  Add time interval
                </button>
                <QhTimeRangePicker
                  restaurant={restaurant}
                  pickTime={pickTime}
                  removeTimeSlot={removeTimeSlot}
                  week={"Tue"}
                ></QhTimeRangePicker>
              </div>
            </div>

            {/* day */}
            <div className="row mt-4">
              <label className="col-sm-2 font-weight-bold">Wed</label>
              <div className="pl-0 col-sm-7">
                <button
                  className="mb-2 btn btn-outline-primary"
                  onClick={(e) => addTimeSlot(e, "Wed")}
                >
                  Add time interval
                </button>
                <QhTimeRangePicker
                  restaurant={restaurant}
                  pickTime={pickTime}
                  removeTimeSlot={removeTimeSlot}
                  week={"Wed"}
                ></QhTimeRangePicker>
              </div>
            </div>

            {/* day */}
            <div className="row mt-4">
              <label className="col-sm-2 font-weight-bold">Thu</label>
              <div className="pl-0 col-sm-7">
                <button
                  className="mb-2 btn btn-outline-primary"
                  onClick={(e) => addTimeSlot(e, "Thu")}
                >
                  Add time interval
                </button>
                <QhTimeRangePicker
                  restaurant={restaurant}
                  pickTime={pickTime}
                  removeTimeSlot={removeTimeSlot}
                  week={"Thu"}
                ></QhTimeRangePicker>
              </div>
            </div>

            {/* day */}
            <div className="row mt-4">
              <label className="col-sm-2 font-weight-bold">Fri</label>
              <div className="pl-0 col-sm-7">
                <button
                  className="mb-2 btn btn-outline-primary"
                  onClick={(e) => addTimeSlot(e, "Fri")}
                >
                  Add time interval
                </button>
                <QhTimeRangePicker
                  restaurant={restaurant}
                  pickTime={pickTime}
                  removeTimeSlot={removeTimeSlot}
                  week={"Fri"}
                ></QhTimeRangePicker>
              </div>
            </div>

            {/* day */}
            <div className="row mt-4">
              <label className="col-sm-2 font-weight-bold">Sat</label>
              <div className="pl-0 col-sm-7">
                <button
                  className="mb-2 btn btn-outline-primary"
                  onClick={(e) => addTimeSlot(e, "Sat")}
                >
                  Add time interval
                </button>
                <QhTimeRangePicker
                  restaurant={restaurant}
                  pickTime={pickTime}
                  removeTimeSlot={removeTimeSlot}
                  week={"Sat"}
                ></QhTimeRangePicker>
              </div>
            </div>

            {/* day */}
            <div className="row mt-4">
              <label className="col-sm-2 font-weight-bold">Sun</label>
              <div className="pl-0 col-sm-7">
                <button
                  className="mb-2 btn btn-outline-primary"
                  onClick={(e) => addTimeSlot(e, "Sun")}
                >
                  Add time interval
                </button>
                <QhTimeRangePicker
                  restaurant={restaurant}
                  pickTime={pickTime}
                  removeTimeSlot={removeTimeSlot}
                  week={"Sun"}
                ></QhTimeRangePicker>
              </div>
            </div>
          </>

          {/* dining number */}
          <div className="form-group row mt-4">
            <label
              htmlFor="maxNumberAtTime"
              className="col-sm-3 font-weight-bold"
            >
              Max dining number per slot
            </label>
            <input
              type="number"
              className="form-control col-sm-2"
              name="maxNumberAtTime"
              min={1}
              value={restaurant.maxNumberAtTime}
              onChange={handleChange}
            />
          </div>

          {/* public holiday */}
          <div className="form-check mt-4">
            <input
              type="checkbox"
              className="form-check-input"
              name="publicHoliday"
              checked={restaurant.publicHoliday}
              onChange={handleChange}
            />
            <label htmlFor="publicHoliday" className="font-weight-bold">
              Open on public holiday
            </label>
          </div>
        </form>

        <button
          className="btn btn-outline-info my-4 mr-4 px-5"
          onClick={(e) => onSubmitBtnClick(e)}
        >
          Submit
        </button>

        <Link to="/dashboard/owner/restaurants">
          <button className="btn btn-secondary my-4 mr-4 px-5">Cancel</button>
        </Link>
      </div>
    )
  );
};

export default EditRestaurantComponent;
