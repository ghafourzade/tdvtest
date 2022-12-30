import { Box, Button, Card, Container, Slider, TextField, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import server from "../../../../Server/Server";
import { loveExamActions, saveExam } from "../../../../store/loveExamSlice";

const LoveExamSheets = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const favoriteRows = useSelector(state => state.loveExam.favoriteRows);
  const testRow = favoriteRows.find(x => x["favoriteRow"]["id"].toString() === testId);
  const questions = testRow["questions"];

  useEffect(() => {
    if (questions.length === 0) {
      server.fetchLoveQuestionsJson().then(res => {
        dispatch(loveExamActions.setQuestions({ rowId: parseInt(testId), questions: res }));
      });
    }
  }, [dispatch, testId, questions]);

  const scoreChangeHandler = useCallback(
    (questionId, event) => {
      const score = parseInt(event.target.value);
      if (score > 0 && score < 11) dispatch(loveExamActions.setScore({ questionId, score, rowId: parseInt(testId) }));
    },
    [dispatch, testId]
  );

  const finishExamClickHandler = useCallback(async () => {
    dispatch(saveExam({ favoriteRow: testRow }));
    navigate("../", { replace: true });
  }, [dispatch, navigate, testRow]);

  return (
    <Container maxWidth="xl" sx={{ paddingTop: "16px", display: "flex", flexDirection: "column", gap: "8px", overflowY: "auto" }}>
      <h2>آزمون علاقه مربوط به ({testRow["favoriteRow"]["name"]})</h2>
      {questions.map(question => (
        <Card variant="outlined" sx={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px 32px", overflow: "visible" }} key={question["id"]}>
          <Typography variant="p" component="p">{question["Title"]}</Typography>
          <Box sx={{ display: "flex", gap: "32px", alignItems: "center" }}>
            <TextField
              id="outlined-number"
              label="عدد مورد علاقه"
              type="number"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              value={question["score"]}
              onChange={scoreChangeHandler.bind(null, question["id"])}
            />
            <Slider
              aria-label="Temperature"
              value={question["score"]}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={10}
              onChange={scoreChangeHandler.bind(null, question["id"])}
            />
          </Box>
        </Card>
      ))}
      <Button variant="contained" onClick={finishExamClickHandler}>
        پایان آزمون
      </Button>
    </Container>
  );
};

export default LoveExamSheets;
