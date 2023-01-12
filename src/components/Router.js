import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "./Navigation";
// import EditProfile from "../routes/EditProfile";
import Profile from "../routes/Profile";

function AppRouter({ isLoggedIn, userObj }) {
  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />}></Route>
            <Route
              path="/profile"
              element={<Profile userObj={userObj} />}
            ></Route>
          </>
        ) : (
          <>
            <Route path="/" element={<Auth />}></Route>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
