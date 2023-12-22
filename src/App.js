import { Routes,useNavigate,Route,useLocation } from "react-router-dom";
import Navbar from "./components/Navbar"
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductPage from "./pages/ProductPage";
import Profile from "./pages/Profile";
import  DefaultPage  from "./pages/DefaultPage";
import { useState,useEffect } from "react";
import CreateProduct from "./pages/CreateProduct";


import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,

} from "@clerk/clerk-react";

import { useUser } from "@clerk/clerk-react";


if(!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY)
{
  throw new Error("Missing Publishable Key");
}


const clerkkey= process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;


function ClerkWithRoutes(){

const navigate =useNavigate();
const [filterbox, setfilterbox] = useState(false);
const location=useLocation();
const inSignIn =location.pathname==='/sign-in';
const indefault=location.pathname==='/';
const [loading, setLoading] = useState(true);
const [admin,setadmin]=useState(false);




return (

  
<ClerkProvider publishableKey={clerkkey} navigate={(to)=>navigate(to)} >


<div className="bg-slate-900">

   {(!inSignIn || !indefault  ) && !loading &&

     <Navbar setfilterbox={setfilterbox} admin={admin}    filterbox={filterbox} />
     }
      </div>
       <Routes>
        <Route path='/' element={<DefaultPage/>} />
        <Route path='/createproduct' element={<CreateProduct/>} />
        <Route path="/home" element={<Home setLoading={setLoading} loading={loading} setadmin={setadmin} filterbox={filterbox} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/sign-in/*"
          element={
            <div className="flex w-screen h-screen items-center justify-center">
              <SignIn routing="path" path="/sign-in" />
            </div>
          }
          />
        <Route
          path="/sign-up/*"
          element={
            <div className="flex w-screen h-screen items-center justify-center">
              <SignUp routing="path" path="/sign-up" />
            </div>
          }
        />
         <Route
          path="/protected"
          element={
            <>
              <SignedIn>
                <Home filterbox={filterbox}/>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

      </Routes>




</ClerkProvider>



);



}

const App = () => {
  
  

  return (
    <ClerkWithRoutes />
  );
};

export default App;
