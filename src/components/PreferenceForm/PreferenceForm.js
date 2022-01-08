import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { savePreference } from "../../features/user/userSlice";

// Import MaterialUi
import {
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";

// Import CSS
import styles from "./PreferenceForm.module.css";

function PreferenceForm() {
  const [age, setAge] = useState(18);
  const [cuisine, setCuisine] = useState([]);

  const ages = [];
  const cuisines = ["Korean", "Western", "Chinese", "Japanese"];

  const dispatch = useDispatch();
  const email = useSelector((state) => state.email);

  for (let i = 18; i <= 65; i++) {
    ages.push(i);
  }

  const handleCuisine = (item) => {
    let updatedSelection;

    if (cuisine.includes(item)) {
      updatedSelection = cuisine.filter(
        (selectedItem) => selectedItem !== item
      );
      setCuisine(updatedSelection);
    } else {
      updatedSelection = [...cuisine, item];
      setCuisine(updatedSelection);
    }
  };

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Paper elevation={5} className={styles.paper}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Paper elevation={5} className={styles.paperHeader}>
              <Grid item align="center">
                <Typography variant="subtitle1">
                  {"Fill in your information & preferences"}
                </Typography>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="subtitle2">Age:</Typography>
            <Select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className={styles.select}
            >
              {ages.map((i) => (
                <MenuItem key={i} value={i}>
                  {i}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="subtitle2">Cuisines:</Typography>
            {cuisines.map((item) => (
              <Button
                size="medium"
                key={item}
                className={`${
                  cuisine.includes(item)
                    ? styles.cuisineSelected
                    : styles.cuisineUnselected
                } ${styles.cuisine}`}
                onClick={() => handleCuisine(item)}
              >
                {item}
              </Button>
            ))}
          </Grid>
          <Grid item xs={12} align="center">
            <Button
              className={styles.chat}
              onClick={() => dispatch(savePreference(email, age, cuisine))}
            >
              Start Chat
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default PreferenceForm;
