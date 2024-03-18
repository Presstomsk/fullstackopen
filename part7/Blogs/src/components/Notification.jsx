import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const style = {
    display: notification !== null ? "" : "none",
  };

  return (
    <div>
      <Alert severity="success" style={style}>
        {notification}
      </Alert>
    </div>
  );
};

export default Notification;
