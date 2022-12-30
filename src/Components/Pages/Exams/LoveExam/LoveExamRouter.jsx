import { Route, Routes } from "react-router-dom";
import LoveExam from "./LoveExam";
import LoveExamSheets from "./LoveExamSheets";

const LoveExamRouter = () => {
  return (
      <Routes>
        <Route path="/" element={<LoveExam />} />
        <Route path="/:testId" element={<LoveExamSheets />} />
      </Routes>
  );
};

export default LoveExamRouter;
