import Menu from "./components/Menu";
import AllRoutes from "./components/AllRoutes";
import Footer from "./components/Footer";
import Notification from "./components/Notification";
import { getBlogsFromDb } from "./reducers/blogsReducer";
import { getUsersFromDb } from "./reducers/usersReducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogsFromDb());
    dispatch(getUsersFromDb());
  }, [dispatch]);

  return (
    <div>
      <h1>Software blogs</h1>
      <Menu />
      <Notification />
      <AllRoutes />
      <Footer />
    </div>
  );
};

export default App;
