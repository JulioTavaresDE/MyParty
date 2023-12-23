import { Outlet } from "react-router-dom";

//components
import NavBar from "./components/NavBar";
import {ToastContainer} from "react-toastify";

//Styles
import './App.css';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
      <div className="App">
        <ToastContainer></ToastContainer>
        <NavBar></NavBar>
        <Outlet />
      </div>
  );
}

export default App;
