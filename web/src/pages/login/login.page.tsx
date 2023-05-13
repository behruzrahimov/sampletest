import styles from "./login.styles.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import { Lock } from "@mui/icons-material";
export default function Login({ logined }: { logined: (e: boolean) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState(0);
  const [usernameChanges, setUsernameChanges] = useState(0);
  const [passwordChanges, setPasswordChanges] = useState(0);
  const [timeUsername, setTimeUsername] = useState<number[]>([]);
  const [timePassword, setTimePassword] = useState<number[]>([]);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  useEffect(() => {
    !startTime && setStartTime(Date.now);
    const delayDebounceFn = setTimeout(() => {
      username && setUsernameChanges(usernameChanges + 1);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [username]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      password && setPasswordChanges(passwordChanges + 1);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [password]);

  function send() {
    if (username && password) {
      const login = {
        username: username,
        password: password,
        time: Date.now() - startTime,
        usernameChanges: usernameChanges,
        passwordChanges: passwordChanges,
        timeUsername: timeUsername[timeUsername.length - 1] - timeUsername[0],
        timePassword: timePassword[timePassword.length - 1] - timePassword[0],
      };
      localStorage.setItem("login", JSON.stringify(login));
      logined(true);
      navigate("/question1");
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h2>Login</h2>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            width: "80%",
            marginBottom: "10px",
          }}
        >
          <AccountCircle sx={{ color: "block", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Username"
            variant="standard"
            sx={{ width: "100%" }}
            onChange={(e) => {
              setUsername(e.target.value);
              setTimeUsername((times) => [...times, Date.now()]);
            }}
            value={username}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end", width: "80%" }}>
          <Lock sx={{ color: "black", my: 1 }} />
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              sx={{ width: "104%" }}
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => {
                setPassword(e.target.value);
                setTimePassword((times) => [...times, Date.now()]);
              }}
              value={password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <div className={styles.forgotContainer}>
          <button className={styles.forgotText}>forgot password?</button>
        </div>

        {!username || !password ? (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              marginTop: "10px",
            }}
            disabled
          >
            Login
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              marginTop: "10px",
              ":hover": {
                backgroundColor: "#3e3e3e", // theme.palette.primary.main
                color: "white",
              },
            }}
            className={styles.buttonLogin}
            onClick={send}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
}
