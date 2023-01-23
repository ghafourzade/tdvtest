import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveValueExam, valueExamActions } from "../../../../store/valueExamSlice";

import { Box, Button, Card, Container, Slider, TextField, Typography } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import { green, grey } from "@mui/material/colors";

const ValueExam = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const valueExam = useSelector(state => state.valueExam);
  const questions = useSelector(state => state.valueExam.questions);
  const finished = useSelector(state => state.valueExam.finished);

  const scoreChangeHandler = useCallback(
    (questionId, event) => {
      const score = parseInt(event.target.value);
      if (score > 0 && score < 11) dispatch(valueExamActions.setScore({ questionId, score }));
    },
    [dispatch]
  );

  const finishExamClickHandler = useCallback(async () => {
    dispatch(saveValueExam({ valueExam }));
    navigate("../", { replace: true });
  }, [dispatch, navigate, valueExam]);

  return (
    <Container maxWidth="xl" sx={{ paddingTop: "16px", display: "flex", flexDirection: "column", gap: "8px", overflowY: "auto" }}>
      {finished ? (
        <Card
          variant="outlined"
          sx={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px 32px", overflow: "visible", alignItems: "center" }}
        >
          <VerifiedIcon sx={{ fontSize: 200, color: green[500] }} />
          <Typography component="h5" variant="h5" fontWeight={600} color={green[500]} textAlign="center">
            نتیجه آزمون شما با موفقیت ثبت شده است .
          </Typography>
        </Card>
      ) : (
        <>
          <h2>آزمون ارزش</h2>
          {questions.map(question => (
            <Card
              variant="outlined"
              sx={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px 32px", overflow: "visible" }}
              key={question["id"]}
            >
              <Typography variant="p" component="p">
                {question["Title"]}
              </Typography>
              <Typography variant="p" component="p" sx={{ fontSize: "14px", color: grey[700], textIndent: "8px", marginBottom: "8px" }}>
                {question["Description"]}
              </Typography>
              <Box sx={{ display: "flex", gap: "32px", alignItems: "center" }}>
                <TextField
                  id="outlined-number"
                  label="ارزشمندی برای شما"
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
        </>
      )}
    </Container>
  );
};

export default ValueExam;
