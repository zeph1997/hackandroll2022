import { useState } from "react";

// Import Redux
import { loginUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";

// Import MaterialUi
import { Button, Grid, TextField, Typography } from "@mui/material/";

// Import CSS
import styles from "./LoginForm.module.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  return (
    <Grid container spacing={4} align="center" justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="subtitle1">Email:</Typography>
        <TextField
          variant="outlined"
          className={styles.textField}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1">Password:</Typography>
        <TextField
          variant="outlined"
          type="password"
          className={styles.textField}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Grid>
      <Grid container item xs={12} align="center" direction="column">
        <Grid item>
          <Button
            variant="contained"
            className={`${styles.button} ${styles.loginBtn}`}
          >
            Sign Up
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => dispatch(loginUser(email, password))}
            className={`${styles.button} ${styles.signupBtn}`}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LoginForm;
