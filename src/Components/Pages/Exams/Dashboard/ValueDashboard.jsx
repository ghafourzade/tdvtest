import { Card, Typography, useTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const ValueDashboard = () => {
  const theme = useTheme();
  const tempQuestions = useSelector(state => state.valueExam.questions);
  const finished = useSelector(state => state.valueExam.finished);
  const questions = [...tempQuestions].sort((a, b) => b.score - a.score);

  return finished ? (
    <>
      <Typography component="h2" variant="h4" fontWeight={600}>
        نتیجه ارزش های شما
      </Typography>
      <Card sx={{ width: "100%", height: "400px" }}>
        <ResponsiveContainer>
          <BarChart width={500} height={300} margin={{ top: 40, right: 40, bottom: 5, left: 5 }} data={questions}>
            <XAxis dataKey="Title" />
            <YAxis />
            <Tooltip />
            <Bar type="monotone" dataKey="score" name="امتیاز" fill={theme.palette.primary.main} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </>
  ) : null;
};

export default ValueDashboard;
