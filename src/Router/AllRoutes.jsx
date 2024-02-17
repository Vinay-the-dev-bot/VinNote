import { Route, Routes } from "react-router";
import UserRegForm from "../Pages/UserRegForm";
import Login from "../Pages/Login";
import Notes from "../Pages/Notes";
import AddNotes from "../Pages/AddNotes";
import Home from "../Pages/Home";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<UserRegForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Notes />} />
        <Route path="/addnote" element={<AddNotes />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
