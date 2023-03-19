import "./SCSingle.css";

function SCSingle(props) {
  return (
    <div className="SCSingle-container">
      <h1 className="SCSingle-username">Username : {props.email}</h1>
      <h2 className="SCSIngle-WPM">WPM : {props.WPM} </h2>
    </div>
  );
}

export default SCSingle;
