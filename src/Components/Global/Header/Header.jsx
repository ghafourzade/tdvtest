import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../../store/loginSlice";
import server from "../../../Server/Server";

import ProfileImg from "../ProfileImg/ProfileImg";
import { Box, Button, LinearProgress, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Logout, Settings } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";

import classes from "./Header.module.css";

const Header = () => {
  const dispath = useDispatch();
  const loading = useSelector(state => state.ui.loading);

  const navigate = useNavigate();

  const profileClickHandler = useCallback(() => {
    navigate("/login/profile");
  }, [navigate]);

  const logoutClickHandler = useCallback(async () => {
    await server.logout();
    dispath(loginActions.logout());
    navigate("/login");
  }, [dispath, navigate]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const homeBtnClickHandler = useCallback(() => {
    navigate("/exams");
  }, [navigate]);

  return (
    <div className={classes["header"]}>
      <Box sx={{ display: "flex", padding: "8px 32px 4px" }}>
        <Button variant="outlined" startIcon={<HomeIcon />} size="small" onClick={homeBtnClickHandler}>
          خانه
        </Button>
        <span className={classes["space"]}></span>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.12))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        >
          <MenuItem onClick={profileClickHandler}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            پروفایل
          </MenuItem>
          <MenuItem onClick={logoutClickHandler}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            خروج
          </MenuItem>
        </Menu>

        <Button className={classes["profile-btn"]} onClick={handleClick}>
          <ProfileImg className={classes["profile-photo"]} charecterClassName={classes["profile-photo__chatecter"]} />
        </Button>
      </Box>
      <LinearProgress sx={{ width: "100%", bottom: "0", right: "0", opacity: loading ? "1" : "0" }} />
    </div>
  );
};

export default Header;
