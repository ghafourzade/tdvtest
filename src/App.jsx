import { Route, Routes } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import JMTalent from "./Components/Pages/Exams/TalentExam/JMTalent";
import LoginRoutes from "./Routes/LoginRoutes";

import { createTheme, ThemeProvider } from "@mui/material";
import Rtl from "./Rtl";

const App = () => {
  library.add(fas, far);

  const theme = createTheme({
    direction: "rtl",
    palette: {
      primary: {
        main: "#7579e7",
      },
      secondary: {
        main: "#4f7df6",
      },
    },
    typography: {
      fontFamily: "IRANSans",
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            boxShadow: "0 0 10px -5px rgba(var(--color-dark-rgb), .2)",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Rtl>
        <Routes>
          <Route path="/jm/:userId/:mirror" element={<JMTalent />} />
          <Route index path="/*" element={<LoginRoutes />} />
        </Routes>
      </Rtl>
    </ThemeProvider>
  );
};

export default App;
