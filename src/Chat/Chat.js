import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import InsertEmoticonOutlinedIcon from "@material-ui/icons/InsertEmoticonOutlined";
import MicOutlinedIcon from "@material-ui/icons/MicOutlined";
import { connect } from "react-redux";
import db from "../firebase";
import { auth } from "../firebase";
import { logOut } from "../_actions/chatActions";
import firebase from "firebase";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Chat({ ChatRoomId, logOut, user }) {
  const [seed, setseed] = useState("");
  const [input, setinput] = useState("");
  const [Room, setRoom] = useState("");
  const [messages, setmessages] = useState([]);
  useEffect(() => {
    setseed(Math.floor(Math.random() * 2000));
    // console.log(ChatRoomId);
  }, []);
  useEffect(() => {
    if (ChatRoomId) {
      db.collection("rooms")
        .doc(ChatRoomId)
        .onSnapshot((snapshot) => setRoom(snapshot.data().name));

      db.collection("rooms")
        .doc(ChatRoomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setmessages(snapshot.docs.map((doc) => doc.data()))
        );
    }

    return () => {};
  }, [ChatRoomId]);
  const sendMessage = (e) => {
    e.preventDefault();
    // console.log("message : ", input);
    // console.log("user : ", user.displayName);
    // console.log("time : ", firebase.firestore.FieldValue.serverTimestamp());

    db.collection("rooms").doc(ChatRoomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setinput("");
    // console.log(input);
  };
  const SignOut = () => {
    auth
      .signOut()
      .then(function () {
        logOut();
        // alert('f');
        // Sign-out successful.

        console.log("Sign-out successful.");
      })
      .catch(function (error) {
        // An error happened.
      });
  };
  let lastseen = new Date(
    messages[messages.length - 1]?.timestamp?.toDate()
  ).toUTCString();
  // console.log(lastseen);
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar
          src={`https://avatars.dicebear.com/4.5/api/human/${seed}.svg `}
        />
        <div className="chat_headerInfo">
          <h3>{Room}</h3>
          <p>Last Seen {lastseen ? lastseen : ""}</p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <ExitToAppIcon onClick={(e) => SignOut()} />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <p
            className={`chat_message ${
              message.name === user.displayName && "chat_receiver"
            }`}
          >
            <span className="chat_name">
              {message.name}
              {/* {!message.name === user.displayName ? message.name : ""} */}
            </span>
            {message.message}
            <span className="chat_timeStamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <IconButton>
          <InsertEmoticonOutlinedIcon />
        </IconButton>
        <form>
          <input
            type="text"
            placeholder="Type a message"
            className="chat_footerInput"
            value={input}
            onChange={(e) => setinput(e.target.value)}
          />
          <button
            type="submit"
            htmltype="submit"
            onClick={(e) => sendMessage(e)}
          ></button>
        </form>
        <IconButton>
          <MicOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  ChatRoomId: state.Chat.roomId,
  user: state.Chat.user,
});

export default connect(mapStateToProps, { logOut })(Chat);
