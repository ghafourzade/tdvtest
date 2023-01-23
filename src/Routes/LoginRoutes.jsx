import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Exams from "../Components/Pages/Exams/Exams";
import Login from "../Components/Pages/Login/Login";
import server from "../Server/Server";
import { loginActions } from "../store/loginSlice";

let checkedLogin = false;

const LoginRoutes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkSession = useCallback(async () => {
    const sessionUser = await server.getUser();
    if (sessionUser.status !== 401) {
      const user = await sessionUser.json();
      dispatch(loginActions.login(user));
      navigate("/exams", { replace: true });
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!checkedLogin) {
      checkSession();
      checkedLogin = true;
    }
  }, [checkSession]);

  return (
    <Routes>
      <Route path="/login/*" element={<Login />} />
      <Route path="/exams/*" element={<Exams />} />
    </Routes>
  );
};

export default LoginRoutes;
