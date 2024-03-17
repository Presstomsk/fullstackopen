import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const style = {
    display: notification !== null ? "" : "none",
  };

  return (
    <div>
      <p style={style}>{notification}</p>
    </div>
  );
};

export default Notification;
