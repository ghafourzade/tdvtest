import { Route, Routes } from "react-router-dom";
import EnterNumber from "../EnterNumber/EnterNumber";
import EnterVerifyCode from "../EnterVerifyCode/EnterVerifyCode";
import Profile from "../Profile/Profile";

const Login = () => {
  return (
    <Routes>
      <Route index element={<EnterNumber />} />
      <Route path="verify" element={<EnterVerifyCode />} />
      <Route path="profile" element={<Profile />} />
    </Routes>
  );
};

export default Login;
