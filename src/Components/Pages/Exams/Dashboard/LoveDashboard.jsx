import { useSelector } from "react-redux";

import { Card, Grid, Typography, useTheme } from "@mui/material";

const LoveDashboard = () => {
  const theme = useTheme();
  const favoriteRows = useSelector(state => state.loveExam.favoriteRows);
  const finishedFavoriteRows = favoriteRows.filter(row => row.finished);

  return finishedFavoriteRows.length > 0 ? (
    <>
      <Typography component="h2" variant="h4" fontWeight={600}>
        نتیجه علاقه مندی های شما
      </Typography>
      <Grid container spacing={3}>
        {finishedFavoriteRows
          .sort((a, b) => a.favoriteRow.order - b.favoriteRow.order)
          .map(row => {
            return (
              <Grid item md={4} xs={12} key={row.favoriteRow.id}>
                <Card sx={{ display: "flex", flexDirection: "column", paddingX: 2, paddingY: 1 }}>
                  <Typography component="h3" variant="h6">
                    {row.favoriteRow.name}
                  </Typography>
                  <Typography sx={{ marginLeft: "auto", color: theme.palette.primary.main }}>{row.favoriteRow.point}</Typography>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </>
  ) : null;
};

export default LoveDashboard;
