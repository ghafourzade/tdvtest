import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useSelector } from "react-redux";

import { Box, Container, IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Button from "../../../UI/Button/Button/Button";
import { green } from "@mui/material/colors";
import VerifiedIcon from "@mui/icons-material/Verified";
import classes from "./TalentExamTable.module.css";

const columns = ["نام آزمون", "شرکت در آزمون"];

const TalentExamTable = () => {
  const navigate = useNavigate();
  const loading = useSelector(state => state.ui.loading);
  const userObject = useSelector(state => state.login.userObject);
  const finished = useSelector(state => state.talentExam.finished);
  const finishedJm1 = useSelector(state => state.talentExam.finishedJm1);
  const finishedJm2 = useSelector(state => state.talentExam.finishedJm2);
  const finishedJm3 = useSelector(state => state.talentExam.finishedJm3);

  const origin = window.location.origin;
  const jm1Link = `${origin}/jm/${userObject.ID}/1`;
  const jm2Link = `${origin}/jm/${userObject.ID}/2`;
  const jm3Link = `${origin}/jm/${userObject.ID}/3`;

  const copyToClipboard = useCallback(link => {
    navigator.clipboard.writeText(link);
  }, []);

  const startExamClickHandler = useCallback(() => {
    navigate("exam");
  }, [navigate]);

  return (
    <Container maxWidth="xl" sx={{ paddingTop: "16px", display: "flex", flexDirection: "column", gap: "8px", overflowY: "auto" }}>
      <table className={classes["spaced-table"]}>
        <thead className={classes["spaced-table__header"]}>
          <tr>
            {columns.map((x, index) => (
              <th className={classes["spaced-table__cell"]} key={index}>
                {x}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={classes["spaced-table__cell"]}>آزمون استعداد</td>
            <td className={classes["spaced-table__cell"]}>
              {finished ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Tooltip title="نتیجه آزمون شما با موفقیت ثبت شده است ." placement="bottom">
                    <VerifiedIcon sx={{ fontSize: "32px", color: green[500] }} />
                  </Tooltip>
                </Box>
              ) : (
                <Button onClick={startExamClickHandler} disabled={finished || loading}>
                  شروع
                </Button>
              )}
            </td>
          </tr>
          <tr>
            <td className={classes["spaced-table__cell"]}>آزمون آیینه ژاپنی 1</td>
            <td className={classes["spaced-table__cell"]}>
              {finishedJm1 ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Tooltip title="نتیجه آزمون شما با موفقیت ثبت شده است ." placement="bottom">
                    <VerifiedIcon sx={{ fontSize: "32px", color: green[500] }} />
                  </Tooltip>
                </Box>
              ) : (
                <IconButton
                  onClick={() => {
                    copyToClipboard(jm1Link);
                  }}
                >
                  <ContentCopyIcon />
                </IconButton>
              )}
            </td>
          </tr>
          <tr>
            <td className={classes["spaced-table__cell"]}>آزمون آیینه ژاپنی 2</td>
            <td className={classes["spaced-table__cell"]}>
              {finishedJm2 ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Tooltip title="نتیجه آزمون شما با موفقیت ثبت شده است ." placement="bottom">
                    <VerifiedIcon sx={{ fontSize: "32px", color: green[500] }} />
                  </Tooltip>
                </Box>
              ) : (
                <IconButton
                  onClick={() => {
                    copyToClipboard(jm2Link);
                  }}
                >
                  <ContentCopyIcon />
                </IconButton>
              )}
            </td>
          </tr>
          <tr>
            <td className={classes["spaced-table__cell"]}>آزمون آیینه ژاپنی 3</td>
            <td className={classes["spaced-table__cell"]}>
              {finishedJm3 ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Tooltip title="نتیجه آزمون شما با موفقیت ثبت شده است ." placement="bottom">
                    <VerifiedIcon sx={{ fontSize: "32px", color: green[500] }} />
                  </Tooltip>
                </Box>
              ) : (
                <IconButton
                  onClick={() => {
                    copyToClipboard(jm3Link);
                  }}
                >
                  <ContentCopyIcon />
                </IconButton>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};

export default TalentExamTable;
