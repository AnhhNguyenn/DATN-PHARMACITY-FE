import "./App.css";
import LayoutUserSide from "./Layout/LayoutUserSide";
import HomeAdmin from "./adminSide/HomeAdmin";
import HomeEmployee from "./EmployeeSide/HomeEmployee"; // Import thành phần dành cho Employee
import { Progress } from "reactstrap";
import { useSelector } from "react-redux";

function App() {
  const loading = useSelector((state) => state.user.status);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {loading === "loading" ? (
        <Progress animated value="100" className="progress"></Progress>
      ) : (
        ""
      )}

      {currentUser !== null ? (
        currentUser.role === "Guest" ? (
          <LayoutUserSide />
        ) : currentUser.role === "Employee" ? ( // Thêm điều kiện cho Employee
          <HomeEmployee />
        ) : (
          <HomeAdmin />
        )
      ) : (
        <LayoutUserSide />
      )}
    </>
  );
}

export default App;
