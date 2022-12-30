import { Box, Button, Card, Container, Slider, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveTalentExam, talentExamActions } from "../../../../store/talentExamSlice";

const TalentExamSheets = ({ userId: paramsUserId, mirror }) => {
  const finished = useSelector(state => {
    switch (mirror) {
      case 1:
        return state.talentExam.finishedJm1;
      case 2:
        return state.talentExam.finishedJm2;
      case 3:
        return state.talentExam.finishedJm3;
      default:
        return state.talentExam.finished;
    }
  });
  const questions = useSelector(state => {
    switch (mirror) {
      case 1:
        return state.talentExam.mirror1Talent;
      case 2:
        return state.talentExam.mirror2Talent;
      case 3:
        return state.talentExam.mirror3Talent;
      default:
        return state.talentExam.selfTalent;
    }
  });
  const userObject = useSelector(state => state.login.userObject);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = paramsUserId ? paramsUserId : userObject.ID;

  const scoreChangeHandler = useCallback(
    (questionId, event) => {
      if (!finished) {
        const score = parseInt(event.target.value);
        if (score > 0 && score < 11) dispatch(talentExamActions.setScore({ questionId, score, mirror }));
      }
    },
    [dispatch, finished, mirror]
  );

  const finishExamClickHandler = useCallback(async () => {
    if (!finished) {
      dispatch(saveTalentExam({ userId, mirror, questions }));
      if (mirror === undefined) navigate("../", { replace: true });
    }
  }, [dispatch, navigate, finished, questions, userId, mirror]);

  return (
    <Container maxWidth="xl" sx={{ paddingTop: "16px", display: "flex", flexDirection: "column", gap: "8px", overflowY: "auto" }}>
      <h2>آزمون استعداد</h2>
      {questions.map(question => (
        <Card variant="outlined" sx={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px 32px", overflow: "visible" }} key={question["id"]}>
          <Typography variant="p" component="p">
            {question["Title"]}
          </Typography>
          <Typography variant="p" component="p" sx={{ fontSize: "14px", color: grey[700], textIndent: "8px", marginBottom: "8px" }}>
            {question["Description"]}
          </Typography>
          <Box sx={{ display: "flex", gap: "32px", alignItems: "center" }}>
            <TextField
              id="outlined-number"
              label="استعداد نسبی"
              type="number"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              value={question["score"]}
              onChange={scoreChangeHandler.bind(null, question["id"])}
              disabled={finished}
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
              disabled={finished}
            />
          </Box>
        </Card>
      ))}
      <Button variant="contained" onClick={finishExamClickHandler} disabled={finished}>
        پایان آزمون
      </Button>
    </Container>
  );
};

export default TalentExamSheets;
