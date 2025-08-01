import "./Alert.css";

function Alert({
  alert: { alert_id, ticker, price, direction },
  deleteHandler,
}) {
  return (
    <div className="alert">
      {/* Format alert as: "TICKER > $PRICE" or "TICKER < $PRICE" */}
      <span>
        {ticker + (direction === "above" ? " > " : " < ") + "$" + price}
      </span>
      <button className="delete-button" onClick={() => deleteHandler(alert_id)}>
        Delete
      </button>
    </div>
  );
}

export default Alert;
