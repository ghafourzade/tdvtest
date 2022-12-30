import { Card, Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const TalentDashboard = () => {
  const theme = useTheme();
  const talentExam = useSelector(state => state.talentExam);
  console.log(talentExam);
  const condition = talentExam.finished || talentExam.finishedJm1 || talentExam.finishedJm2 || talentExam.finishedJm3;

  return condition ? (
    <>
      <Typography component="h2" variant="h4" fontWeight={600}>
        نتیجه استعداد های شما
      </Typography>
      <Card sx={{ width: "100%", height: "520px" }}>
        <ResponsiveContainer>
          <LineChart width={500} height={300} margin={{ top: 40, right: 100, bottom: 160, left: 5 }}>
            <XAxis dataKey="Title" type="category" allowDuplicatedCategory={false} interval={0} angle={50} dx={20} dy={80} />
            <YAxis dataKey="score" />
            <Tooltip />
            <Legend verticalAlign="top" />
            {talentExam.finished ? (
              <Line strokeWidth={2} dataKey="score" data={talentExam.selfTalent} name="آزمون استعداد" stroke={theme.palette.primary.main} />
            ) : null}
            {talentExam.finishedJm1 ? (
              <Line strokeWidth={2} dataKey="score" data={talentExam.mirror1Talent} name="آزمون آینه ژاپنی 1" stroke={grey[600]} />
            ) : null}
            {talentExam.finishedJm2 ? (
              <Line strokeWidth={2} dataKey="score" data={talentExam.mirror2Talent} name="آزمون آینه ژاپنی 2" stroke={grey[600]} />
            ) : null}
            {talentExam.finishedJm3 ? (
              <Line strokeWidth={2} dataKey="score" data={talentExam.mirror3Talent} name="آزمون آینه ژاپنی 3" stroke={grey[600]} />
            ) : null}
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </>
  ) : null;
};

export default TalentDashboard;
