import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../../store/loginSlice";
import useField from "../../../Hooks/use-field";

import server from "../../../Server/Server";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../UI/Button/Button/Button";
import Card from "../../UI/Card/Card";
import Input from "../../UI/Form/Input/Input/Input";
import Select from "../../UI/Form/Select/Select/Select";

import classes from "./Profile.module.css";
import ProfileImg from "../../Global/ProfileImg/ProfileImg";
import { Box, CircularProgress } from "@mui/material";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userObj = useSelector(state => state.login.userObject);
  const isLogin = useSelector(state => state.login.isLogin);
  const [loading, setLoading] = useState(false);

  const checkSession = useCallback(async () => {
    const sessionUser = await server.getUser();
    if (sessionUser.status !== 401) {
      const user = await sessionUser.json();
      dispatch(loginActions.login(user));
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);
  useEffect(() => {
    if (!isLogin) {
      checkSession();
    }
  }, [isLogin, checkSession]);

  const { value: nameValue, setValue: setNameValue, valid: nameValid, setTouched: setNameTouched, props: nameProps } = useField("", name => name !== "");
  const {
    value: genderValue,
    setValue: setGenderValue,
    valid: genderValid,
    setTouched: setGenderTouched,
    onChange: genderChangeHandler,
  } = useField("", gender => gender !== "");
  const {
    value: ageValue,
    setValue: setAgeValue,
    valid: ageValid,
    setTouched: setAgeTouched,
    props: ageProps,
  } = useField("", age => age !== "" && /^[0-9]+$/.test(age) && parseInt(age) > 0);
  const [profilePicBase64, setProfilePicBase64] = useState(null);

  const getProfileFormData = useCallback(async () => {
    const user = userObj;
    if (user) {
      setNameValue(user["UserName"]);
      setGenderValue(user["Gender"] === false ? 0 : 1);
      setAgeValue(user["Old"]);
    }
  }, [userObj, setAgeValue, setGenderValue, setNameValue]);
  useEffect(() => {
    getProfileFormData();
  }, [getProfileFormData]);

  const profilePicInputRef = useRef(null);
  const profilePicBtnClickHandler = useCallback(() => {
    profilePicInputRef.current.click();
  }, []);
  const profilePicInputChangeHandler = useCallback(event => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      const fileReader = new FileReader();
      fileReader.onload = fileLoadedEvent => {
        const srcData = fileLoadedEvent.target.result;
        setProfilePicBase64(srcData);
      };
      fileReader.readAsDataURL(file);
    }
  }, []);

  const sendProfileDataToServer = useCallback(async () => {
    const ageInt = isNaN(parseInt(ageValue)) ? 0 : parseInt(ageValue);
    const genderBoolean = genderValue === "0" ? false : true;
    const profilePicObj = profilePicBase64 ? { profilePicBase64Code: profilePicBase64 } : {};
    await server.setProfileData({
      userName: nameValue,
      gender: genderBoolean,
      age: ageInt,
      ...profilePicObj,
    });
  }, [nameValue, genderValue, ageValue, profilePicBase64]);
  const profileFormSubmitHandler = useCallback(
    async event => {
      event.preventDefault();
      setLoading(true);
      let invalidFieldsCount = 0;
      if (!nameValid) {
        setNameTouched(true);
        invalidFieldsCount++;
      }
      if (!genderValid) {
        setGenderTouched(true);
        invalidFieldsCount++;
      }
      if (!ageValid) {
        setAgeTouched(true);
        invalidFieldsCount++;
      }
      if (invalidFieldsCount > 0) return;
      await sendProfileDataToServer();

      const sessionUser = await server.getUser();
      if (sessionUser.status !== 401) {
        const user = await sessionUser.json();
        dispatch(loginActions.login(user));
        navigate("/exams");
      } else {
        navigate("/login");
      }
      setLoading(false);
    },
    [dispatch, navigate, setAgeTouched, setGenderTouched, setNameTouched, nameValid, genderValid, ageValid, sendProfileDataToServer]
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", inset: "0" }}>
      <Card className={classes["profile-card"]}>
        {loading ? (
          <CircularProgress sx={{ margin: "auto" }} size={80} />
        ) : (
          <form className={classes["card__inner"]} onSubmit={profileFormSubmitHandler}>
            <ProfileImg className={classes["profile-photo"]} profilePicBase64={profilePicBase64}>
              <FontAwesomeIcon icon="fa-regular fa-image" className={classes["profile-photo__btn"]} onClick={profilePicBtnClickHandler} />
              <span className={classes["profile-photo__area"]}>
                <input type="file" className={classes["profile-photo__input"]} ref={profilePicInputRef} onChange={profilePicInputChangeHandler} />
              </span>
            </ProfileImg>

            <div className={classes["form-control__area"]}>
              <label className={classes["form-label"]}>نام :</label>
              <Input {...nameProps} />
              <label className={classes["form-label"]}>جنسیت :</label>
              <Select value={genderValue} onChange={genderChangeHandler}>
                <option value="1">آقا</option>
                <option value="0">خانم</option>
              </Select>
              <label className={classes["form-label"]}>سن :</label>
              <Input {...ageProps} />
            </div>
            <Button className={classes["card-btn"]} type="submit">
              تایید
            </Button>
          </form>
        )}
      </Card>
    </Box>
  );
};

export default Profile;
