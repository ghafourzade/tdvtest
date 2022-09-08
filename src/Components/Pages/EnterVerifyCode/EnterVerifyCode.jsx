import * as server from "../../../Server/Server";
import { useEffect, useContext, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginContext from "../../../Store/LoginContext";
import Button from "../../UI/Button/Button/Button";
import Card from "../../UI/Card/Card";
import Input from "../../UI/Form/Input/Input/Input";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./EnterVerifyCode.module.css";
import Spinner from "../../UI/Loading/Spinner/Spinner";

const EnterVerifyCode = () => {
  const navigate = useNavigate();
  const { phoneNumber } = useContext(LoginContext);

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
  }, []);

  const changeNumBtnClickHandler = useCallback(() => {
    navigate("../");
  }, []);

  const verifyFormSubmitHandler = useCallback(
    async event => {
      event.preventDefault();
      setLoading(true);
      const res = await server.enterVerifyCode({ verifyCode: verifyCode });
      setLoading(false);
      if (res === true) {
        navigate("../profile");
      } else {
        setVerifyCodeTouched(true);
      }
    },
    [verifyCode]
  );

  return (
    <Card className={classes["enter-number__card"]}>
      {loading ? (
        <Spinner />
      ) : (
        <form className={classes["card__inner"]} onSubmit={verifyFormSubmitHandler}>
          <div className={classes["card-icon"]}>
            <FontAwesomeIcon icon="fa-regular fa-envelope" className={classes["card-icon-fa"]} />
          </div>
          <h1 className={classes["card-title"]}>اعتبار سنجی</h1>
          <p className={classes["card-desc"]}>کد اعتبار سنجی برای شما ارسال شد .</p>
          <a className={classes["card-link"]} onClick={sendCodeAgainBtnClickHandler}>
            کد را دریافت نکردم
          </a>
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
            <Button className={classes["card-btn"]} type="submit">
              تایید
              <FontAwesomeIcon icon="fa-regular fa-circle-check" className={classes["card-btn__icon"]} />
            </Button>
          </div>
        </form>
      )}
    </Card>
  );
};

export default EnterVerifyCode;
