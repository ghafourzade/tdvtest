import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import Row from "../../../UI/Layout/Row/Row";
import ChooseButton from "../../../UI/Button/ChooseButton/ChooseButton";
import examsData from "./examsData";

import classes from "./SelectExam.module.css";
import { Typography } from "@mui/material";
import Dashboard from "../Dashboard/Dashboard";

const SelectExam = () => {
  const userObj = useSelector(state => state.login.userObject);
  const navigate = useNavigate();
  useEffect(() => {
    if (userObj === null) {
      navigate("/login");
    }
  }, [navigate, userObj]);

  const loveExamBtnClickHandler = useCallback(() => {
    navigate("love-exam");
  }, [navigate]);

  const valueExamBtnClickHandler = useCallback(() => {
    navigate("value-exam");
  }, [navigate]);
  const talentExamBtnClickHandler = useCallback(() => {
    navigate("talent-exam");
  }, [navigate]);

  return (
    <>
      <Typography component="h2" variant="h4" fontWeight={600}>
        لطفا آزمون مورد نظر خود را انتخاب کنید
      </Typography>
      <Row className={classes["exams-row"]}>
        <ChooseButton icon="fa-regular fa-heart" title={examsData["love"]["title"]} desc={examsData["love"]["desc"]} onClick={loveExamBtnClickHandler} />
        <ChooseButton icon="fa-regular fa-star" title={examsData["value"]["title"]} desc={examsData["value"]["desc"]} onClick={valueExamBtnClickHandler} />
        <ChooseButton
          icon="fa-regular fa-lightbulb"
          title={examsData["talent"]["title"]}
          desc={examsData["talent"]["desc"]}
          onClick={talentExamBtnClickHandler}
        />
      </Row>
      <Dashboard />
    </>
  );
};

export default SelectExam;
