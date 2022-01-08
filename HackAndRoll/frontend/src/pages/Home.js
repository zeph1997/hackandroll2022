// Import MaterialUi
import { Grid } from "@mui/material";

// Import Components
import DummyComponent from "../components/DummyComponent/DummyComponent";

function Home() {
  return (
    <Grid
      container
      md={12}
      spacing={3}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={6}>
        <DummyComponent />
      </Grid>
      <Grid item xs={6}>
        <DummyComponent />
      </Grid>
    </Grid>
  );
}

export default Home;
