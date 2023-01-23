import { createSlice } from "@reduxjs/toolkit";
import server from "../Server/Server";
import { uiActions } from "./uiSlice";

const initialState = {
  selfTalent: [],
  mirror1Talent: [],
  mirror2Talent: [],
  mirror3Talent: [],
  finished: false,
  finishedJm1: false,
  finishedJm2: false,
  finishedJm3: false,
};

const talentExamSllice = createSlice({
  name: "talentExam",
  initialState,
  reducers: {
    setSelfTalent(state, action) {
      const { saved, questions } = action.payload;
      const finished = saved ? Boolean(saved.length > 0) : false;
      state.selfTalent = finished ? saved : questions;
      state.finished = finished;
    },
    setMirror1Talent(state, action) {
      const { saved, questions } = action.payload;
      const finished = saved ? Boolean(saved.length > 0) : false;
      state.mirror1Talent = finished ? saved : questions;
      state.finishedJm1 = finished;
    },
    setMirror2Talent(state, action) {
      const { saved, questions } = action.payload;
      const finished = saved ? Boolean(saved.length > 0) : false;
      state.mirror2Talent = finished ? saved : questions;
      state.finishedJm2 = finished;
    },
    setMirror3Talent(state, action) {
      const { saved, questions } = action.payload;
      const finished = saved ? Boolean(saved.length > 0) : false;
      state.mirror3Talent = finished ? saved : questions;
      state.finishedJm3 = finished;
    },
    setScore(state, action) {
      const { questionId, score, mirror } = action.payload;
      let stateArrayName;
      switch (mirror) {
        case 1:
          stateArrayName = "mirror1Talent";
          break;
        case 2:
          stateArrayName = "mirror2Talent";
          break;
        case 3:
          stateArrayName = "mirror3Talent";
          break;
        default:
          stateArrayName = "selfTalent";
          break;
      }
      const questionIndex = state[stateArrayName].findIndex(x => x["id"] === questionId);
      state[stateArrayName][questionIndex]["score"] = score;
    },
  },
});

export const loadSavedTalent = async ({ userId }) => {
  const questions = (await server.fetchTalentQuestionsJson()).map(x => {
    return { ...x, score: 1 };
  });
  const selfTalent = await server.loadTalentResult();
  const mirror1Talent = await server.jm.loadTalentJM1Result({ userId });
  const mirror2Talent = await server.jm.loadTalentJM2Result({ userId });
  const mirror3Talent = await server.jm.loadTalentJM3Result({ userId });
  return { questions, selfTalent, mirror1Talent, mirror2Talent, mirror3Talent };
};

export const loadTalentExam = ({ userId } = {}) => {
  return async dispatch => {
    dispatch(uiActions.setLoading(true));
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

export const loadMirror = ({ mirror, userId }, loading = true) => {
  return async dispatch => {
    if (loading) dispatch(uiActions.setLoading(true));
    const questions = (await server.fetchTalentQuestionsJson()).map(x => {
      return { ...x, score: 1 };
    });
    switch (mirror) {
      case 1:
        const mirror1Talent = await server.jm.loadTalentJM1Result({ userId });
        dispatch(talentExamActions.setMirror1Talent({ saved: mirror1Talent, questions }));
        break;
      case 2:
        const mirror2Talent = await server.jm.loadTalentJM2Result({ userId });
        dispatch(talentExamActions.setMirror2Talent({ saved: mirror2Talent, questions }));
        break;
      case 3:
        const mirror3Talent = await server.jm.loadTalentJM3Result({ userId });
        dispatch(talentExamActions.setMirror3Talent({ saved: mirror3Talent, questions }));
        break;
      default:
        const selfTalent = await server.loadTalentResult();
        dispatch(talentExamActions.setSelfTalent({ saved: selfTalent, questions }));
        break;
    }
    if (loading) dispatch(uiActions.setLoading(false));
  };
};

export const saveTalentExam = ({ userId, mirror, questions }) => {
  return async dispatch => {
    dispatch(uiActions.setLoading(true));
    try {
      switch (mirror) {
        case 1:
          await server.jm.saveTalentJM1Result({ userId, bodyObj: questions });
          break;
        case 2:
          await server.jm.saveTalentJM2Result({ userId, bodyObj: questions });
          break;
        case 3:
          await server.jm.saveTalentJM3Result({ userId, bodyObj: questions });
          break;
        default:
          await server.saveTalentResult({ bodyObj: questions });
          break;
      }
      dispatch(loadMirror({ mirror, userId }, false));
    } catch (error) {
      console.error(error);
    }
    dispatch(uiActions.setLoading(false));
  };
};

export const talentExamActions = talentExamSllice.actions;

export default talentExamSllice.reducer;
