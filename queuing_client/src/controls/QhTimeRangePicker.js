import QhTimePicker from "./QhTimePicker";
const QhTimeRangePicker = (props) => {
  return (
    <>
      <ul className="list-group">
        {props.restaurant.opens[props.week].map((value, idx) => {
          return (
            <li className="list-group-item" key={idx}>
              <button
                className="btn btn-outline-danger py-0 px-2"
                onClick={(e) => props.removeTimeSlot(e, props.week, idx)}
              >
                &times;
              </button>
              <span className="ml-4">From </span>
              <QhTimePicker
                value={value.from}
                pickTime={props.pickTime}
                week={props.week}
                idx={idx}
                attr={"from"}
              ></QhTimePicker>
              <span className="ml-4">To </span>
              <QhTimePicker
                value={value.to}
                pickTime={props.pickTime}
                week={props.week}
                idx={idx}
                attr={"to"}
              ></QhTimePicker>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default QhTimeRangePicker;
