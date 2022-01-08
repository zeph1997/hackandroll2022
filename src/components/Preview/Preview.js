import { useEffect } from "react";

import { useSelector } from "react-redux";

// Import MaterialUi
import { Grid, Paper, List, ListItem, Typography } from "@mui/material";

// Import Resources
import logo from "../../resources/restaurant.png";
// import testImg from "../../resources/image_1.png";

// Import CSS
import styles from "./Preview.module.css";

function Preview() {
  const preview = useSelector((state) => state.preview);

  // const preview = {
  //   restaurant: "Genki Sushi",
  //   restaurantPic: "",
  //   locationPic: "",
  //   desc: "Genki Sushi is a chain of conveyor belt sushi restaurants established in 1990 in Japan.",
  //   locationDesc: "Nearest Outlet: Genki Sushi Orchard Central (15km)",
  //   url: "https://www.genkisushi.com.sg/",
  //   reviews: ["Wow its so nice!!", "Highly recommended!"],
  // };

  useEffect(() => {}, [preview]);

  return (
    <Grid container spacing={4} alignItems="center" justifyContent="center">
      <Grid item xs={12}>
        <Paper elevation={5} className={styles.paper}>
          <Grid item xs={12} align="left">
            <img src={logo} className={styles.logo} />
          </Grid>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} align="center">
              <Typography variant="h4">{preview.restaurant}</Typography>
            </Grid>
            <Grid item container spacing={2} xs={12}>
              <Grid item xs={6}>
                <img
                  src={preview.restaurantPic}
                  className={styles.restaurantImages}
                />
              </Grid>
              <Grid item xs={6}>
                <img
                  src={preview.locationPic}
                  className={styles.restaurantImages}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2} xs={12}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">{preview.desc}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">
                  {preview.locationDesc}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} align="center">
              <a href={preview.url}>{preview.url}</a>
            </Grid>
            <Grid item xs={12} align="center">
              <Typography variant="h4" className={styles.underline}>
                Review
              </Typography>
              <List>
                {preview.reviews.map((review, index) => (
                  <ListItem key={index}>
                    <Typography variant="subtitle2">{review}</Typography>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Preview;
