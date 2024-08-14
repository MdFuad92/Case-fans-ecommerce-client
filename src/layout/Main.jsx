import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";


const Main = () => {
    return (
        <div className="font-Roboto">
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;