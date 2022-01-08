import { useEffect } from "react";

import { logoutUser, checkRegistered } from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

// Import MaterialUi
import { Container, Grid } from "@mui/material";

// Import Components
import Chat from "../components/Chat/Chat";
import LogoutButton from "../components/LogoutButton/LogoutButton";
import PreferenceForm from "../components/PreferenceForm/PreferenceForm";
import Preview from "../components/Preview/Preview";

function Home() {
  let email = useSelector((state) => state.email);
  let isRegistered = useSelector((state) => state.isRegistered);
  let navigate = useNavigate();

  let dispatch = useDispatch();

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email]);

  useEffect(() => {
    dispatch(checkRegistered(email));
  }, []);

  return (
    <Container>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} align="right">
          <LogoutButton onClick={() => dispatch(logoutUser())} />
        </Grid>
        <Grid container item xs={12} spacing={2} className="topGap">
          {isRegistered ? (
            <>
              <Grid item xs={6}>
                <Chat />
              </Grid>
              <Grid item xs={6}>
                <Preview />
              </Grid>
            </>
          ) : (
            <PreferenceForm />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
