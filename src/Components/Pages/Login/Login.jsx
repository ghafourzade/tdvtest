import { Route, Routes } from "react-router-dom";
import { LoginProvider } from "../../../Store/LoginContext";
import EnterNumber from "../EnterNumber/EnterNumber";
import EnterVerifyCode from "../EnterVerifyCode/EnterVerifyCode";
import Profile from "../Profile/Profile";

const Login = () => {
  return (
    <LoginProvider>
      <Routes>
        <Route path="/">
          <Route index element={<EnterNumber />} />
          <Route path="verify" element={<EnterVerifyCode />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </LoginProvider>
  );
};

export default Login;
