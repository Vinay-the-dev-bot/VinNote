import { useState } from "react";
import { url } from "../App";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button, useToast } from "@chakra-ui/react";

const AddNotes = ({ addOnClose }) => {
  const token = useSelector((state) => state.token);
  const [title, setTitle] = useState("");
  const toast = useToast();
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddNotes = async (e) => {
    e.preventDefault();
    const res = await fetch(`${url}/notes/add`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        body,
      }),
    });
    const data = await res.json();
    if (data.msg == "NOTE ADDED") {
      dispatch({ type: "NOTEADDED", payload: { title, body } });
      toast({
        title: "Note Added",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      addOnClose();
      navigate("/dashboard");
    }
  };

  return (
    <>
      <form className="noteForm">
        <input
          type="text"
          placeholder="Enter notes Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="Enter notes body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <Button onClick={(e) => handleAddNotes(e)}>Add Note</Button>
      </form>
    </>
  );
};

export default AddNotes;
