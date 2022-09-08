import { Route, Router, Routes, useNavigate } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import Login from "./Components/Pages/Login/Login";
import { useEffect } from "react";

const App = () => {
  // useEffect(() => {
  //   const mobileNum = "09027530754";
  //   server.sendVerifyCode({ mobileNum });
  // }, []);
  library.add(fas, far);

  const navigate = useNavigate();
  useEffect(() => {
    navigate("login");
  }, []);
  return (
    <Routes>
      <Route path="/">
        <Route path="login/*" element={<Login />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
