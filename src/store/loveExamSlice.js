import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlice";

import server from "../Server/Server";

const initialState = {
  favoriteRows: [
    { favoriteRow: { id: 1, order: null, name: "", point: null }, questions: [], finished: false },
    { favoriteRow: { id: 2, order: null, name: "", point: null }, questions: [], finished: false },
    { favoriteRow: { id: 3, order: null, name: "", point: null }, questions: [], finished: false },
  ],
};

const loveExamSlice = createSlice({
  name: "loveExam",
  initialState,
  reducers: {
    changeName(state, action) {
      const { favoriteId, favoriteName } = action.payload;
      state["favoriteRows"][state["favoriteRows"].findIndex(x => x["favoriteRow"]["id"] === favoriteId)]["favoriteRow"]["name"] = favoriteName;
    },
    setQuestions(state, action) {
      const { rowId, questions: tempQuestions } = action.payload;
      const questions = tempQuestions.map(x => {
        return { ...x, score: 10 };
      });
      state["favoriteRows"][state["favoriteRows"].findIndex(x => x["favoriteRow"]["id"] === rowId)]["questions"] = questions;
    },
    setScore(state, action) {
      const { questionId, score, rowId } = action.payload;
      const rowIndex = state["favoriteRows"].findIndex(x => x["favoriteRow"]["id"] === rowId);
      const questionIndex = state["favoriteRows"][rowIndex]["questions"].findIndex(x => x["id"] === questionId);
      state["favoriteRows"][rowIndex]["questions"][questionIndex]["score"] = score;
    },
    replaceTestRow(state, action) {
      const { favoriteRow } = action.payload;
      const rowIndex = state["favoriteRows"].findIndex(x => x["favoriteRow"]["id"] === favoriteRow["favoriteRow"]["id"]);
      state["favoriteRows"][rowIndex] = favoriteRow;
    },
  },
});

export const loveExamActions = loveExamSlice.actions;

export const loadSavedLoveExam = () => {
  return async dispatch => {
    dispatch(uiActions.setLoading(true));
    const savedData = await server.loadLoveResult();
    if (savedData.length > 0) {
      for (const dbFavRow of savedData) {
        dispatch(loveExamActions.replaceTestRow({ favoriteRow: dbFavRow }));
      }
    }
    dispatch(uiActions.setLoading(false));
  };
};

export const saveExam = ({ favoriteRow }) => {
  return async dispatch => {
    dispatch(uiActions.setLoading(true));

    let savedData = await server.loadLoveResult();
    const sum = favoriteRow["questions"].reduce((sumVal, qOpj) => sumVal + qOpj["score"], 0);
    const tempFavoriteRow = { ...favoriteRow };
    tempFavoriteRow.finished = true;
    tempFavoriteRow["favoriteRow"] = { ...tempFavoriteRow["favoriteRow"] };
    tempFavoriteRow["favoriteRow"]["point"] = sum;

    if (savedData.find(x => x["favoriteRow"]["id"] === tempFavoriteRow["favoriteRow"]["id"])) {
      savedData = savedData.filter(x => x["favoriteRow"]["id"] !== tempFavoriteRow["favoriteRow"]["id"]);
    }
    savedData.push(tempFavoriteRow);

    const orderSavedData = savedData.sort((a, b) => b["favoriteRow"]["point"] - a["favoriteRow"]["point"]);
    for (let index = 0; index < orderSavedData.length; index++) {
      orderSavedData[index]["favoriteRow"]["order"] = index + 1;
    }

    await server.saveLoveResult({ bodyObj: savedData });

    const changedData = await server.loadLoveResult();
    if (changedData.length > 0) {
      for (const dbFavRow of changedData) {
        dispatch(loveExamActions.replaceTestRow({ favoriteRow: dbFavRow }));
      }
    }

    dispatch(uiActions.setLoading(false));
  };
};

export default loveExamSlice.reducer;
