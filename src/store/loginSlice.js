import { createSlice } from "@reduxjs/toolkit";
import server, { getUserInfo } from "../Server/Server";
import { loveExamActions } from "./loveExamSlice";
import { loadSavedTalent, talentExamActions } from "./talentExamSlice";
import { uiActions } from "./uiSlice";
import { valueExamActions } from "./valueExamSlice";

const initialState = {
  isLogin: false,
  userObject: {},
  phoneNumber: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login(state, action) {
      state.isLogin = true;
      state.userObject = action.payload;
    },
    setUserData(state, action) {
      state.userObject = action.payload;
    },
    logout(state) {
      state.isLogin = false;
      state.userObject = {};
      state.phoneNumber = "";
    },
    adjustPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
  },
});

export const loadAllExams = ({ userId }) => {
  return async dispatch => {
    dispatch(uiActions.setLoading(true));
    {
      const savedData = await server.loadLoveResult();
      if (savedData.length > 0) {
        for (const dbFavRow of savedData) {
          dispatch(loveExamActions.replaceTestRow({ favoriteRow: dbFavRow }));
        }
      }
    }
    {
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
    }
    try {
      const { questions, selfTalent, mirror1Talent, mirror2Talent, mirror3Talent } = await loadSavedTalent({ userId });
      dispatch(talentExamActions.setSelfTalent({ saved: selfTalent, questions }));
      dispatch(talentExamActions.setMirror1Talent({ saved: mirror1Talent, questions }));
      dispatch(talentExamActions.setMirror2Talent({ saved: mirror2Talent, questions }));
      dispatch(talentExamActions.setMirror3Talent({ saved: mirror3Talent, questions }));
    } catch (error) {
      console.error(error);
    }
    dispatch(uiActions.setLoading(false));
  };
};

export const loadUserData = ({ userId }) => {
  return async dispatch => {
    dispatch(uiActions.setLoading(true));
    const userDataResponse = await getUserInfo({ userId });
    const userData = await userDataResponse.json();
    dispatch(loginActions.setUserData(userData));
    dispatch(uiActions.setLoading(false));
  };
};

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
