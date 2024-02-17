import { useNavigate } from "react-router";
import { url } from "../App";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotesCard from "./NotesCard";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import AddNotes from "./AddNotes";
const Notes = () => {
  const token = useSelector((state) => state.token);
  const notes = useSelector((state) => state.notes);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    isOpen: addIsOpen,
    onOpen: addOnOpen,
    onClose: addOnClose,
  } = useDisclosure();

  const getNotes = async () => {
    const res = await fetch(`${url}/notes`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    dispatch({ type: "NOTES", payload: data });
  };

  useEffect(() => {
    if (token) {
      getNotes();
    }
  }, [notes.length]);

  return (
    <>
      <div className="notesMainDiv">
        {notes.length > 0 ? (
          <div className="notes">
            {notes.map((note, index) => {
              return <NotesCard key={index} note={note} />;
            })}
          </div>
        ) : (
          <p>You have not added any notes Yet </p>
        )}
        {token ? (
          <Button
            id="addNote"
            onClick={() => {
              addOnOpen();
            }}
          >
            + <span>Add A Note</span>
          </Button>
        ) : (
          <h1>
            <Button
              id="loginDashboard"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          </h1>
        )}

        <Modal
          isOpen={addIsOpen}
          onClose={addOnClose}
          style={{ width: "90%" }}
          size="xl"
        >
          <ModalOverlay />
          <ModalContent backgroundColor="#7d94b5">
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <AddNotes addOnClose={addOnClose} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default Notes;
