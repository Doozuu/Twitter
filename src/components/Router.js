import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "./Navigation";
import Profile from "../routes/Profile";

function AppRouter({ refreshUser, isLoggedIn, userObj }) {
  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <div
        style={{
          maxWidth: 890,
          width: "100%",
          margin: "0 auto",
          marginTop: 80,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home userObj={userObj} />}></Route>
              <Route
                path="/profile"
                element={
                  <Profile refreshUser={refreshUser} userObj={userObj} />
                }
              ></Route>
            </>
          ) : (
            <>
              <Route path="/" element={<Auth />}></Route>
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
