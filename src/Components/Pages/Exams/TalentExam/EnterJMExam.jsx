import { Button, Card, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserData } from "../../../../store/loginSlice";
import ProfileImg from "../../../Global/ProfileImg/ProfileImg";
import TalentExamSheets from "./TalentExamSheets";

const EnterJMExam = ({ mirror, userId }) => {
  const dispatch = useDispatch();
  const userObj = useSelector(state => state.login.userObject);
  const [introduc, setIntroduc] = useState(false);

  useEffect(() => {
    dispatch(loadUserData({ userId }));
  }, [dispatch, userId]);

  const startBtnClickHandler = useCallback(() => {
    setIntroduc(true);
  }, []);

  return introduc ? (
    <TalentExamSheets mirror={mirror} userId={userId} />
  ) : (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        alignItems: "center",
        padding: "16px 32px",
      }}
    >
      <ProfileImg />
      <Typography variant="h4" component="h1" fontWeight={700}>
        {userObj.UserName}
      </Typography>
      <Typography variant="p" component="p" sx={{ fontSize: "14px", color: grey[700], textIndent: "8px", marginBottom: "8px" }}>
        به نظر شما «توانمندی» من، در هر زمینه، چقدر است؟ سلام در این پرسشنامه شما باید میزان توانمندی من را از یک(معادل ضعیف) تا ده(معادل عالی) اعلام کنید.
        توضیح هر سوال، در همان صفحه بیان شده است. تعریف دقیقی برای میزان «ضعیف» تا «عالی» وجود ندراد. انتخاب گزینه ها با شماست. سعی کنید، به پرسش‌ها پاسخ یکسان
        ندهید. برای هر پرسش، یک پاسخ منحصر بفرد نیاز دارم. حتی با فاصله کم.
      </Typography>
      <Button variant="contained" onClick={startBtnClickHandler}>
        شروع
      </Button>
    </Card>
  );
};

export default EnterJMExam;
