import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMirror } from "../../../../store/talentExamSlice";
import EnterJMExam from "./EnterJMExam";

import { Card, Container, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import VerifiedIcon from "@mui/icons-material/Verified";

const getMirror = strMirror => {
  switch (strMirror) {
    case "1":
      return 1;
    case "2":
      return 2;
    case "3":
      return 3;
    default:
      return null;
  }
};

const JMTalent = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const mirror = getMirror(params.mirror);
  const userId = params.userId;
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

  useEffect(() => {
    dispatch(loadMirror({ mirror, userId }));
  }, [dispatch, mirror, userId]);

  return !finished ? (
    mirror && userId ? (
      <Container maxWidth="xl" sx={{ paddingTop: "16px", display: "flex", flexDirection: "column", gap: "32px", overflowY: "auto", flex: "1", height: "100%" }}>
        <EnterJMExam mirror={mirror} userId={userId} />
      </Container>
    ) : (
      <Card variant="outlined" sx={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px 32px", overflow: "visible", alignItems: "center" }}>
        <AnnouncementIcon sx={{ fontSize: 200, color: red[500] }} />
        <Typography component="h5" variant="h5" fontWeight={600} color={red[500]} textAlign="center">
          آدرس نا معتبر است .
        </Typography>
      </Card>
    )
  ) : (
    <Card variant="outlined" sx={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px 32px", overflow: "visible", alignItems: "center" }}>
      <VerifiedIcon sx={{ fontSize: 200, color: green[500] }} />
      <Typography component="h5" variant="h5" fontWeight={600} color={green[500]} textAlign="center">
        نتیجه آزمون شما با موفقیت ثبت شده است .
      </Typography>
    </Card>
  );
};

export default JMTalent;
