import { useState, useEffect } from "react";

import { logoutUser, setPreview } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";

// Import Socket
import io from "socket.io-client";
let socket;

// Import MaterialUi
import {
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";

// Import CSS
import styles from "./Chat.module.css";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const dispatch = useDispatch();

  const initiateSocket = () => {
    socket = io("https://foodbutler-backend.herokuapp.com", {
      cors: {
        origin: "*",
      },
    });
    console.log(`Connecting socket...`);
    if (socket) socket.emit("join", "hi");
  };

  const disconnectSocket = () => {
    console.log("Disconnecting socket...");
    if (socket) socket.disconnect();
  };

  const subscribeToChat = (cb) => {
    if (!socket) return true;
    socket.on("botmessage", (msg) => {
      console.log("Websocket event received!");
      return cb(null, msg);
    });
  };

  const sendMessage = () => {
    if (inputText !== "" && socket) {
      socket.emit("message", { inputText });

      setMessages((oldMessages) => [
        ...oldMessages,
        { id: 123, message: inputText },
      ]);
      setInputText("");
    }
  };

  //Triggers when ENTER key is pressed
  const handleSendKeypress = (e) => {
    if (e.which === 13) {
      sendMessage();
    }
  };

  useEffect(() => {
    initiateSocket();

    subscribeToChat((err, data) => {
      if (err) {
        disconnectSocket();
      }

      if (data) {
        setMessages((oldMessages) => [...oldMessages, data]);

        // If preview exist, update redux store by calling get preview api
        if (data.preview) {
          dispatch(setPreview(data.preview));
        }
      }

      return () => {
        disconnectSocket();
      };
    });
  }, []);

  return (
    <Grid container spacing={4} alignItems="center" justifyContent="center">
      <Grid item xs={12}>
        <Paper elevation={5} className={styles.paper}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Paper elevation={5} className={styles.paperHeader}>
                <Grid
                  container
                  item
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item xs={10} align="center">
                    <Typography variant="subtitle1">
                      {"Get recommendations from Mr.FoodButler"}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} align="right">
                    <Button
                      className={styles.end}
                      onClick={() => dispatch(logoutUser())}
                    >
                      End
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid
              container
              item
              xs={12}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12}>
                <div className={styles.chatContainer}>
                  <List>
                    {messages.map((msg, index) => (
                      <ListItem key={index}>
                        <div
                          className={
                            msg.id === 123
                              ? `${styles.textBubble} ${styles.sentText}`
                              : `${styles.textBubble} ${styles.receiveText}`
                          }
                        >
                          {msg.message}
                        </div>
                      </ListItem>
                    ))}
                  </List>
                </div>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  className={styles.sendInput}
                  value={inputText}
                  onKeyPress={handleSendKeypress}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </Grid>
              <Grid item xs={2} align="center">
                <Button className={styles.send} onClick={() => sendMessage()}>
                  Send
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Chat;
