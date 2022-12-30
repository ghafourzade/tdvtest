import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../../store/loginSlice";

import Button from "../../UI/Button/Button/Button";
import Card from "../../UI/Card/Card";
import Input from "../../UI/Form/Input/Input/Input";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./EnterNumber.module.css";
import { Box } from "@mui/material";

const EnterNumber = () => {
  const navigate = useNavigate();
  const { paramsPhoneNum } = useParams();

  const phoneNumber = useSelector(state => state.login.phoneNumber);
  const isLogin = useSelector(state => state.login.isLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin) {
      navigate("/exams");
    }
  }, [isLogin, navigate]);

  useEffect(() => {
    if (paramsPhoneNum) {
      dispatch(loginActions.adjustPhoneNumber(paramsPhoneNum.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1")));
    }
  }, [dispatch, paramsPhoneNum]);

  const [phoneNumberTouched, setPhoneNumberTouched] = useState(false);
  const [phoneNumberValid, setPhoneNumberValid] = useState(false);

  const phoneNumberChangeHandler = useCallback(
    event => {
      dispatch(loginActions.adjustPhoneNumber(event.target.value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1")));
    },
    [dispatch]
  );

  useEffect(() => {
    const validationCondition = phoneNumber.length === 11 && phoneNumber.slice(0, 2) === "09";
    setPhoneNumberValid(validationCondition);
  }, [phoneNumber]);

  const enterNumFormSubmitHandler = useCallback(
    event => {
      event.preventDefault();
      const validationCondition = phoneNumber.length === 11 && phoneNumber.slice(0, 2) === "09";
      if (validationCondition) {
        navigate("verify");
      } else {
        setPhoneNumberTouched(true);
      }
    },
    [navigate, phoneNumber]
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", inset: "0" }}>
      <Card className={classes["enter-number__card"]}>
        <form className={classes["card__inner"]} onSubmit={enterNumFormSubmitHandler}>
          <div className={classes["card-icon"]}>
            <FontAwesomeIcon icon="fa-solid fa-phone-flip" className={classes["card-icon-fa"]} />
          </div>
          <h1 className={classes["card-title"]}>شماره همراه</h1>
          <p className={classes["card-desc"]}>لطفا جهت ورود شماره تلفن همراه خود را وارد کنید تا کد اعتبار سنجی برای شما ارسال شود .</p>
          <Input
            type="text"
            className={classes["card-input__phone"]}
            onChange={phoneNumberChangeHandler}
            value={phoneNumber}
            maxLength="11"
            touched={phoneNumberTouched}
            valid={phoneNumberValid}
            placeholder="09123456789"
          />
          <Button className={classes["card-btn"]} type="submit">
            ارسال
            <FontAwesomeIcon icon="fa-regular fa-paper-plane" className={classes["card-btn__icon"]} />
          </Button>
        </form>
      </Card>
    </Box>
  );
};

export default EnterNumber;
