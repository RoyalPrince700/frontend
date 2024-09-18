import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login"
import Home from "../Pages/Home";
import ForgotPassword from "../Pages/ForgotPassword";
import SignUp from "../Pages/SignUp";
import AdminPanel from "../Pages/AdminPanel";
import AllUsers from "../Pages/AllUsers";
import AllProducts from "../Pages/AllProducts";
import CategoryProduct from "../Pages/CategoryProduct";
import ProductDetails from "../Pages/ProductDetails";
import Cart from "../Pages/Cart";
import SearchProduct from "../Pages/SearchProduct";
import Success from "../Pages/Success";
import Cancel from "../Pages/Cancel";


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
                },
                { //the /:categoryName is to direct each link to a category page of each category
                    path: "product-category",
                    element: <CategoryProduct/>
                },
                {path : "product/:id",
                    element : <ProductDetails/>

                },
                {
                    path : "cart",
                    element : <Cart/>
                },{
                    path : "success",
                    element : <Success/>
                },{
                    path : "cancel",
                    element : <Cancel/>
                },
                
                {
                    path : "search",
                    element : <SearchProduct/>
                },
                {
                    path: "admin-panel",
                    element: <AdminPanel/>,
                    children : [
                        {
                            path: "all-users",
                            element: <AllUsers/>
                        },
                        {
                            path: "all-products",
                            element: <AllProducts/>
                        }
                    ]
                },

            ]
        }
])

export default router