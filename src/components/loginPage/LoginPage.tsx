import React, { useState, useContext } from "react";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth";
import "./LoginPage.scss";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = () => {
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (email === "prueba@mail.com" && password === "123456") {
        context.setValid(true);
        localStorage.setItem("authToken", "abcde123456");
        navigate("./admin");
      } else {
        setError("Please, verify your credentials.");
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className="form-container">
        <Avatar className="avatar">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <Button
          onClick={handleSubmit}
          disabled={loading}
          type="submit"
          fullWidth
          id="loginButton"
          variant="contained"
          color="primary"
        >
          Sign In
        </Button>
        {loading && <CircularProgress />}
        {error !== "" && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </Container>
  );
}
