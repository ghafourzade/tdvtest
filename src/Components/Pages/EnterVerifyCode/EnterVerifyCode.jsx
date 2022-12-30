import { useNavigate } from "react-router-dom";
import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../../store/loginSlice";
import server from "../../../Server/Server";

import Button from "../../UI/Button/Button/Button";
import Card from "../../UI/Card/Card";
import Input from "../../UI/Form/Input/Input/Input";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./EnterVerifyCode.module.css";
import { Box, CircularProgress } from "@mui/material";

const EnterVerifyCode = () => {
  const navigate = useNavigate();

  const phoneNumber = useSelector(state => state.login.phoneNumber);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [verifyCodeTouched, setVerifyCodeTouched] = useState(false);

  const verifyCodeChangeHandler = useCallback(event => {
    const verCode = event.target.value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1");
    setVerifyCode(verCode ? verCode : "");
  }, []);

  useEffect(() => {
    if (phoneNumber) {
      const number = phoneNumber.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1");
      server.sendVerifyCode({ mobileNum: number });
    }
  }, [phoneNumber]);

  const sendCodeAgainBtnClickHandler = useCallback(() => {
    if (phoneNumber) {
      const number = phoneNumber.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1");
      server.sendVerifyCode({ mobileNum: number });
    }
  }, [phoneNumber]);

  const changeNumBtnClickHandler = useCallback(
    event => {
      event.preventDefault();
      navigate("../");
    },
    [navigate]
  );

  const verifyFormSubmitHandler = useCallback(
    async event => {
      event.preventDefault();
      setLoading(true);
      const res = await server.enterVerifyCode({ verifyCode: verifyCode });
      if (res === true) {
        const userSession = await server.getUser();
        const user = await userSession.json();
        dispatch(loginActions.login(user));
        if (user["UserName"] === user["MobileNo"]) {
          navigate("../profile");
        } else {
          navigate("/exams");
        }
      } else {
        setVerifyCodeTouched(true);
      }
      setLoading(false);
    },
    [dispatch, navigate, verifyCode]
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", inset: "0" }}>
      <Card className={classes["enter-number__card"]}>
        {loading ? (
          <CircularProgress sx={{ margin: "auto" }} size={80} />
        ) : (
          <form className={classes["card__inner"]}>
            <div className={classes["card-icon"]}>
              <FontAwesomeIcon icon="fa-regular fa-envelope" className={classes["card-icon-fa"]} />
            </div>
            <h1 className={classes["card-title"]}>اعتبار سنجی</h1>
            <p className={classes["card-desc"]}>کد اعتبار سنجی برای شما ارسال شد .</p>
            <button className={classes["card-link"]} onClick={sendCodeAgainBtnClickHandler} type="button">
              کد را دریافت نکردم
            </button>
            <Input
              type="text"
              className={classes["card-input__phone"]}
              placeholder="xxxx"
              maxLength="4"
              valid={false}
              touched={verifyCodeTouched}
              value={verifyCode}
              onChange={verifyCodeChangeHandler}
            />
            <div className={classes["card-layout__btns"]}>
              <Button className={classes["card-btn"] + " " + classes["card-btn__secondry"]} onClick={changeNumBtnClickHandler} type="button">
                اصلاح شماره
              </Button>
              <Button className={classes["card-btn"]} onClick={verifyFormSubmitHandler} type="submit">
                تایید
                <FontAwesomeIcon icon="fa-regular fa-circle-check" className={classes["card-btn__icon"]} />
              </Button>
            </div>
          </form>
        )}
      </Card>
    </Box>
  );
};

export default EnterVerifyCode;
