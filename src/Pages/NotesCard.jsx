import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { url } from "../App";
import { useDispatch, useSelector } from "react-redux";
const NotesCard = ({ note }) => {
  const token = useSelector((state) => state.token);

  const {
    isOpen: editIsOpen,
    onOpen: editOnOpen,
    onClose: editOnClose,
  } = useDisclosure();

  const {
    isOpen: deleteIsOpen,
    onOpen: deleteOnOpen,
    onClose: deleteOnCLose,
  } = useDisclosure();

  const finalRef = React.useRef(null);
  const toast = useToast();
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const dispatch = useDispatch();

  const handleEdit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${url}/notes/${note._id}`, {
      method: "PATCH",
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
    if (data.msg == "Note Edited") {
      dispatch({
        type: "NOTEEDIT",
        payload: { noteID: note._id, title, body },
      });
      toast({
        title: "Note Updated",
        status: "success",
        duration: 1000,
        position: "top-right",
        isClosable: true,
      });
      editOnClose();
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await fetch(`${url}/notes/${note._id}`, {
      method: "DELETE",
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

    if (data.msg == "Note Deleted") {
      dispatch({
        type: "DELETENOTE",
        payload: { noteID: note._id },
      });

      toast({
        title: "Note Deleted",
        status: "warning",
        duration: 1000,
        isClosable: true,
      });

      deleteOnCLose();
    }
  };

  return (
    <>
      <div className="noteCard">
        <div className="note">
          <p className="noteTitle">{note.title}</p>
          <p className="noteBody">{note.body}</p>
        </div>
        <div className="modifyButtons">
          <Button
            className="editNote"
            backgroundColor="#b6c199"
            onClick={editOnOpen}
          >
            EDIT
          </Button>
          <Button
            className="deleteNote"
            backgroundColor="#c29591"
            onClick={deleteOnOpen}
          >
            DELETE
          </Button>
          <Modal
            finalFocusRef={finalRef}
            isOpen={deleteIsOpen}
            onClose={deleteOnCLose}
            style={{ width: "90%" }}
            size="xl"
          >
            <ModalOverlay />
            <ModalContent backgroundColor="#7d94b5">
              <ModalHeader>Delete A Note</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form className="noteForm">
                  <label>Title</label>
                  <input
                    type="text"
                    placeholder="Enter notes Title"
                    value={title}
                    id="deleteTitle"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Body</label>
                  <textarea
                    type="text"
                    id="deleteBody"
                    placeholder="Enter notes body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />
                  <Button
                    backgroundColor="#c29591"
                    onClick={(e) => handleDelete(e)}
                  >
                    Delete Note
                  </Button>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>

          <Modal
            finalFocusRef={finalRef}
            isOpen={editIsOpen}
            onClose={editOnClose}
            style={{ width: "90%" }}
            size="xl"
          >
            <ModalOverlay />
            <ModalContent backgroundColor="#7d94b5">
              <ModalHeader>Update A Note</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form className="noteForm">
                  <input
                    type="text"
                    placeholder="Enter notes Title"
                    value={title}
                    id="editTitle"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <textarea
                    type="text"
                    placeholder="Enter notes body"
                    value={body}
                    id="editBody"
                    onChange={(e) => setBody(e.target.value)}
                  />
                  <Button
                    backgroundColor="#f1fada"
                    onClick={(e) => handleEdit(e)}
                  >
                    Update Note
                  </Button>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default NotesCard;
