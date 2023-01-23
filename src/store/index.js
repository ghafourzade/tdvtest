import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./loginSlice";
import loveExamReducer from "./loveExamSlice";
import valueExamReducer from "./valueExamSlice";
import talentExamReducer from "./talentExamSlice";
import uiReducer from "./uiSlice";

const store = configureStore({
  reducer: { login: loginReducer, loveExam: loveExamReducer, valueExam: valueExamReducer, talentExam: talentExamReducer, ui: uiReducer },
});

export default store;
