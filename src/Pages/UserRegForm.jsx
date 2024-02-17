import { useState } from "react";
import { url } from "../App";
import { Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router";

const UserRegForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();

    if (email && password && name && confirmPassword) {
      if (
        (password != "" || confirmPassword != "") &&
        confirmPassword === password
      ) {
        const res = await fetch(`${url}/users/register`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            username: name,
            email: email,
            password: password,
          }),
        });
        const data = await res.json();
        if (data.USER) {
          toast({
            title: "Account created.",
            description: "Please login to start taking notes ",
            status: "success",
            duration: 1000,
            isClosable: true,
          });

          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else {
          toast({
            title: "Account already in Use.",
            status: "error",
            duration: 1000,
            isClosable: true,
          });
        }
      } else {
        toast({
          title: "Passwords are Not Matching.",
          description: "Please Check both passwords once",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Enter All Fields.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  const handlePWDvisib = () => {
    const passwordInput = document.getElementById("password");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  };
  const handleCNFMPWDvisib = () => {
    const passwordInput = document.getElementById("confirmpassword");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  };
  return (
    <>
      <form id="form">
        <label>Enter Username</label>
        <input
          type="text"
          placeholder="Enter User Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Enter Email</label>
        <input
          type="email"
          placeholder="Enter User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Enter Password</label>

        <div className="inpdiv">
          <input
            className="passwordInp"
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="material-symbols-outlined" onClick={handlePWDvisib}>
            visibility
          </p>
        </div>
        <label>Confirm Password</label>

        <div className="inpdiv">
          <input
            className="passwordInp"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            id="confirmpassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <p className="material-symbols-outlined" onClick={handleCNFMPWDvisib}>
            visibility
          </p>
        </div>
        <Button id="regButton" onClick={(e) => handleRegister(e)}>
          Register
        </Button>
      </form>
    </>
  );
};

export default UserRegForm;
