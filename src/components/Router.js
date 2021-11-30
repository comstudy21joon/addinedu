// npm install react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Auth from "routes/Auth";
import EditProfile from "routes/EditProfile";
import Nav from "components/Nav";

export default function AppRouter({ isLoggedIn, userObj }) {
  return (
    <BrowserRouter>
      <Nav isLoggedIn={isLoggedIn} />
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path="/" element={<Home userObj={userObj} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit" element={<EditProfile />} />
          </>
        ) : (
          <Route exact path="*" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}
