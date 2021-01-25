import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useNavigate } from "react-router-dom";

import "./NavBar.scss";
import { AuthContext } from "../../context/auth";

export default function NavBar() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClickExit = () => {
    localStorage.clear();
    context.setValid(false);
    navigate("/");
  };

  return (
    <div className="nav-container">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className="menuButton"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="logo-title">
            Cecotec Shop Admin
          </Typography>
          <Button
            className="sign-out-button"
            onClick={() => {
              handleClickExit();
            }}
          >
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
