import { Route, Routes } from "react-router-dom";
import TalentExamSheets from "./TalentExamSheets";
import TalentExamTable from "./TalentExamTable";

const TalentExam = () => {
  return (
    <Routes>
      <Route index element={<TalentExamTable />} />
      <Route path="/exam" element={<TalentExamSheets />} />
    </Routes>
  );
};

export default TalentExam;
