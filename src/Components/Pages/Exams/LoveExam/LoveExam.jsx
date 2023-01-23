import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loveExamActions } from "../../../../store/loveExamSlice";

import { Container, Tooltip, Typography } from "@mui/material";
import Button from "../../../UI/Button/Button/Button";
import UnderLineInput from "../../../UI/Form/Input/UnderLineInput/UnderLineInput";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Box } from "@mui/system";
import { red, green } from "@mui/material/colors";

import classes from "./LoveExam.module.css";

const columns = ["رتبه", "نام علاقه مندی", "امتیاز", "شرکت در آزمون"];

const dashInsteadNull = value => {
  if (value === null) return "-";
  return value;
};
const sortByOrder = (a, b) => {
  if (a["favoriteRow"].order === null) return 1;
  if (b["favoriteRow"].order === null) return -1;
  return a["favoriteRow"].order - b["favoriteRow"].order;
};
const sortById = (a, b) => b["favoriteRow"].id - a["favoriteRow"].id;

const LoveExam = () => {
  const navigate = useNavigate();

  const [...favoriteRows] = useSelector(state => state.loveExam.favoriteRows);
  const dispatch = useDispatch();

  const testNameChangeHandler = useCallback(
    (testRowId, event) => {
      dispatch(loveExamActions.changeName({ favoriteId: testRowId, favoriteName: event.target.value }));
    },
    [dispatch]
  );

  const startBtnClickHandler = useCallback(
    testRowId => {
      const selectedFavorite = favoriteRows.find(x => x["favoriteRow"].id === testRowId);
      if (selectedFavorite["name"] !== "") {
        navigate("" + testRowId);
      }
    },
    [navigate, favoriteRows]
  );

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
          {favoriteRows
            .sort(sortById)
            .sort(sortByOrder)
            .map(({ favoriteRow: row, finished }, index) => {
              const disabledBtn = Boolean(finished || row["name"] === "");
              return (
                <tr key={index}>
                  <td className={classes["spaced-table__cell"]}>{dashInsteadNull(row.order)}</td>
                  <td className={classes["spaced-table__cell"]}>
                    {finished ? <Typography>{row.name}</Typography> : <UnderLineInput onChange={testNameChangeHandler.bind(null, row.id)} value={row.name} />}
                  </td>
                  <td className={classes["spaced-table__cell"]}>{dashInsteadNull(row.point)}</td>
                  <td className={classes["spaced-table__cell"]}>
                    {finished ? (
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Tooltip title="نتیجه آزمون شما با موفقیت ثبت شده است ." placement="bottom">
                          <VerifiedIcon sx={{ fontSize: "32px", color: green[500] }} />
                        </Tooltip>
                      </Box>
                    ) : Boolean(row["name"] === "") ? (
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Tooltip title="لطفا نام علاقه مندی را جهت شرکت در آزمون انتخاب کنید ." placement="bottom">
                          <AnnouncementIcon sx={{ fontSize: "32px", color: red[500] }} />
                        </Tooltip>
                      </Box>
                    ) : (
                      <Button onClick={startBtnClickHandler.bind(null, row.id)} disabled={disabledBtn}>
                        شروع آزمون
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Container>
  );
};

export default LoveExam;
