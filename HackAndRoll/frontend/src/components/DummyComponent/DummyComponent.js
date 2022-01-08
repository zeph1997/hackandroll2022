// Import MaterialUi
import { Typography } from "@mui/material";

// Import CSS
import styles from "./DummyComponent.module.css";

function DummyComponent() {
  return (
    <div className={styles.dummy}>
      <Typography variant="subtitle1">Hello World</Typography>
    </div>
  );
}

export default DummyComponent;
