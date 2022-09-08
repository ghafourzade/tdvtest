import { createContext, useState } from "react";

const LoginContext = createContext({
  phoneNumber: "",
  setPhoneNumber: phoneNumber => {},
});

export const LoginProvider = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const providerValue = { phoneNumber, setPhoneNumber };
  return <LoginContext.Provider value={providerValue}>{children}</LoginContext.Provider>;
};

export default LoginContext;
