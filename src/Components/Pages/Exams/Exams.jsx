import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../Global/Header/Header";
import SelectExam from "./SelectExam/SelectExam";
import LoveExamRouter from "./LoveExam/LoveExamRouter";
import ValueExam from "./ValueExam/ValueExam";
import TalentExam from "./TalentExam/TalentExam";
import { Container } from "@mui/material";
import { loadAllExams } from "../../../store/loginSlice";

const Exams = () => {
  const dispatch = useDispatch();
  const userObject = useSelector(state => state.login.userObject);
  useEffect(() => {
    dispatch(loadAllExams({ userId: userObject.ID }));
  }, [dispatch, userObject]);
  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{ paddingTop: "16px", display: "flex", flexDirection: "column", gap: "32px" }}>
        <Routes>
          <Route index element={<SelectExam />} />
          <Route path="love-exam/*" element={<LoveExamRouter />} />
          <Route path="value-exam" element={<ValueExam />} />
          <Route path="talent-exam/*" element={<TalentExam />} />
        </Routes>
      </Container>
    </>
  );
};

export default Exams;
