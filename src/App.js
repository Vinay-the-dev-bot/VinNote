import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import AllRoutes from "./Router/AllRoutes";
import NavBar from "./Pages/NavBar";
import store from "./Store/store";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "./Pages/Footer";
// export const url = "http://localhost:4500";
export const url = "https://vinnote-server.onrender.com";

function App() {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <NavBar />
            <AllRoutes />
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  );
}

export default App;
