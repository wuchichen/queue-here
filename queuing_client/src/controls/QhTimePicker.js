const QhTimePicker = (props) => {
  return (
    <>
      <select
        className="form-select py-2"
        value={props.value.hour || ""}
        onChange={(e) => props.pickTime(e, props.week, props.idx, props.attr)}
      >
        <option selected value="">
          -
        </option>
        <option value="6">06:00</option>
        <option value="7">07:00</option>
        <option value="8">08:00</option>
        <option value="9">09:00</option>
        <option value="10">10:00</option>
        <option value="11">11:00</option>
        <option value="12">12:00</option>
        <option value="13">13:00</option>
        <option value="14">14:00</option>
        <option value="15">15:00</option>
        <option value="16">16:00</option>
        <option value="17">17:00</option>
        <option value="18">18:00</option>
        <option value="19">19:00</option>
        <option value="20">20:00</option>
        <option value="21">21:00</option>
        <option value="22">22:00</option>
        <option value="23">23:00</option>
        <option value="24">24:00</option>
      </select>
    </>
  );
};

export default QhTimePicker;
