import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

// Import MaterialUi
import { Container, Grid, Paper, Typography } from "@mui/material/";

// Import Component
import LoginForm from "../components/LoginForm/LoginForm.js";

// Import Resources
import logo from "../resources/restaurant.png";

// Import CSS
import styles from "./Login.module.css";

function Login() {
  let email = useSelector((state) => state.email);
  let navigate = useNavigate();

  useEffect(() => {
    if (email) {
      navigate("/home");
    }
    console.log(email);
  }, [email]);

  return (
    <Container>
      <Grid container alignItems="center" justifyContent="center">
        <Paper elevation={5} className={`${styles.paper} topGap`}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} align="center">
              <Typography variant="h3">FoodButler</Typography>
            </Grid>
            <Grid item xs={12} align="center">
              <img src={logo} className={styles.logo} />
            </Grid>
            <Grid item xs={12}>
              <LoginForm />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Container>
  );
}

export default Login;
