// Import MaterialUI
import { IconButton } from "@mui/material";

// Import resources
import LogoutIcon from "@mui/icons-material/Logout";

// Import CSS
import styles from "./LogoutButton.module.css";

function LogoutButton() {
  return (
    <>
      <IconButton className={styles.logout}>
        <LogoutIcon />
      </IconButton>
    </>
  );
}

export default LogoutButton;
