import { useState } from "react";
import { url } from "../App";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Button, useToast } from "@chakra-ui/react";
import LoadingToast from "../Pages/LoadingToast";
const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch(`${url}/users/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await res.json();
    if (data.token) {
      setIsLoading(false);
      toast({
        title: "Successfully Logged In.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      dispatch({
        type: "LOGIN",
        payload: { username: data.user.username, token: data.token },
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } else {
      setIsLoading(false);
      toast({
        title: `${data.msg}`,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      {isLoading && <LoadingToast />}
      <div id="loginForm">
        <form id="form">
          <label>Enter Email</label>
          <input
            type="email"
            placeholder="Enter User Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Enter Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button id="loginButton" onClick={(e) => handleLogin(e)}>
            Login
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
