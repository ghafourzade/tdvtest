import { createSlice } from "@reduxjs/toolkit";
import server from "../Server/Server";
import { uiActions } from "./uiSlice";

const initialState = {
  questions: [],
  finished: false,
};

const valueExamSlice = createSlice({
  name: "valueExam",
  initialState,
  reducers: {
    setQuestions(state, action) {
      state.questions = action.payload;
    },
    setScore(state, action) {
      const { questionId, score } = action.payload;
      const questionIndex = state.questions.findIndex(x => x["id"] === questionId);
      state.questions[questionIndex].score = score;
    },
    setState(state, action) {
      const { savedData } = action.payload;
      state.questions = savedData.questions;
      state.finished = savedData.finished;
    },
  },
});

export const loadValueExam = (loading = true) => {
  return async dispatch => {
    if (loading) dispatch(uiActions.setLoading(true));
    const savedData = await server.loadValueResult();
    if (savedData.finished) {
      dispatch(valueExamActions.setState({ savedData }));
    } else {
      const result = await server.fetchValueQuestionsJson();
      const questions = result.map(x => {
        return { ...x, score: 10 };
      });
      dispatch(valueExamActions.setQuestions(questions));
    }
    if (loading) dispatch(uiActions.setLoading(false));
  };
};

export const saveValueExam = ({ valueExam }) => {
  return async dispatch => {
    dispatch(uiActions.setLoading(true));
    await server.saveValueResult({ bodyObj: { ...valueExam, finished: true } });
    dispatch(loadValueExam(false));
    dispatch(uiActions.setLoading(false));
  };
};

export const valueExamActions = valueExamSlice.actions;

export default valueExamSlice.reducer;
