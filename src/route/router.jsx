import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../home/Home";
import Login from "../authroute/Login";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home/>

        },
        {
            path:'/login',
            element:<Login/>
        }
      ]
    },
  ]);

export default router;