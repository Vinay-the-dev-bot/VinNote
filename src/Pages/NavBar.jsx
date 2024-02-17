import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const state = useSelector((state) => state);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    toast({
      title: "User Logged Out",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <>
      <div id="navbar">
        <p>
          <Link to="/">Home</Link>
        </p>
        <p>
          <Link to="/dashboard">DashBoard</Link>
        </p>
        <p>{state.username || <Link to="/login">Login</Link>}</p>
        <p>
          {state.username ? (
            <button id="logoutButton" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/signup">Sign Up</Link>
          )}
        </p>
      </div>
    </>
  );
};

export default NavBar;
