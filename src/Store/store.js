import { createStore } from "redux";

const initialState = {
  username: "",
  notes: [],
  token: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        username: action.payload.username,
        token: action.payload.token,
      };

    case "NOTES":
      return { ...state, notes: action.payload };

    case "NOTEADDED":
      return { ...state, notes: [...state.notes, action.payload] };
    case "NOTEEDIT":
      const updatedNotes = state.notes.map((note) => {
        if (note._id == action.payload.noteID) {
          note.title = action.payload.title;
          note.body = action.payload.body;
          return note;
        } else {
          return note;
        }
      });
      return { ...state, notes: updatedNotes };

    case "DELETENOTE":
      const updatedNotes2 = state.notes.filter((note) => {
        if (note._id !== action.payload.noteID) {
          return note;
        }
      });
      return { ...state, notes: updatedNotes2 };

    case "LOGOUT":
      return initialState;

    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
