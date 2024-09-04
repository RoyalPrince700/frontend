import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login"
import Home from "../Pages/Home";
import ForgotPassword from "../Pages/ForgotPassword";
import SignUp from "../Pages/SignUp";


const router = createBrowserRouter ([
        {
            path: "/",
            element: <App/>,
            children : [
                {
                    path : "",
                    element : <Home/>
                },
                {
                    path: "login",
                    element: <Login/>
                },
                {
                    path: "forgot-password",
                    element: <ForgotPassword/>
                },
                {
                    path: "sign-up",
                    element: <SignUp/>
                }
            ]
        }
])

export default router