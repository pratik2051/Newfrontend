import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Authen from "./pages/Authen";
import ForgotPassword from "./pages/Forgotpassword";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import Layout from "./components/Layout";
import NoPageFound from "./pages/NoPageFound";
import AuthContext from "./AuthContext";
import Authen1 from "./pages/Authen1";
import Reset from "./pages/Reset";
import EmployeeList from './pages/EmployeeList';
import EmployeeDetails from './pages/EmployeeDetails';
import Asset from './pages/Asset';
import Room from './pages/Room';
import Location from './pages/Location';
// import Permission from './pages/Permission';
import Report from './pages/Report';
// import Activity from "./pages/Activity";

// import  tectedWrapper from "./ProtectedWrapper";
import { useEffect, useState } from "react";
import Supplier from "./pages/Supplier";
import User from "./pages/User";
import EditSupplier from "./components/EditSupplier";
 
  const App = () => {
  const [user, setUser] = useState("");
  const [loader, setLoader] = useState(true);
  let myLoginUser = JSON.parse(localStorage.getItem("user"));
  // console.log("USER: ",user)

  useEffect(() => {
    if (myLoginUser) {
      setUser(myLoginUser._id);
      setLoader(false);
      // console.log("inside effect", myLoginUser)
    } else {
      setUser("");
      setLoader(false);
    }
  }, [myLoginUser]);


  const signin = (newUser, callback) => {
    setUser(newUser);
    callback();
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  let value = { user, signin, signout };

  if (loader)
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>LOADING...</h1>
      </div>
    );

  return (
    <AuthContext.Provider value={value}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/authen" element={<Authen />} />
          <Route path="/authen1" element={<Authen1 />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/editsupplier/:id" element={EditSupplier}/>
          <Route
            path="/"
            element={
             // <ProtectedWrapper>
                <Layout />
             // </ProtectedWrapper>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="/employeelist" element={<EmployeeList />} />
            <Route path="/employee/:code" element={<EmployeeDetails />} />
            <Route path="/Supplier" element={<Supplier />} />
            <Route path="/user" element={<User />} />
            <Route path="/asset" element={<Asset />} />
            <Route path="/room" element={<Room />} />
            <Route path="/location" element={<Location />} />
            {/* <Route path="/permission" element={<Permission />} /> */}
            <Route path="/report" element={<Report />} />
            {/* <Route path="/activity" element={<Activity />} /> */}
          </Route>
          <Route path="*" element={<NoPageFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;

