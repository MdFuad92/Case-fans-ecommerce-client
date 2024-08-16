import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";


const Main = () => {
    return (
        <div className="font-Roboto ">
            <Navbar></Navbar>
            <div className='min-h-[calc(100vh-84px)]'>
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;