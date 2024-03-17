import Menu from "./components/Menu";
import AllRoutes from "./components/AllRoutes";
import Footer from "./components/Footer";
import Notification from "./components/Notification";
import { getAnecdotesFromDb } from "./reducers/anecdotesReducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnecdotesFromDb());
  }, [dispatch]);

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification />
      <AllRoutes />
      <Footer />
    </div>
  );
};

export default App;
