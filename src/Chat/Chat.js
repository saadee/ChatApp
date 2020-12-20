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

function Chat({ ChatRoomId }) {
  const [seed, setseed] = useState("");
  const [input, setinput] = useState("");
  const [Room, setRoom] = useState("");
  useEffect(() => {
    setseed(Math.floor(Math.random() * 2000));
    // console.log(ChatRoomId);
  }, []);
  useEffect(() => {
    if (ChatRoomId) {
      db.collection("rooms")
        .doc(ChatRoomId)
        .onSnapshot((snapshot) => setRoom(snapshot.data().name));
    }
    return () => {};
  }, [ChatRoomId]);
  const sendMessage = (e) => {
    e.preventDefault();
    setinput("");
    console.log(input);
  };
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar
          src={`https://avatars.dicebear.com/4.5/api/human/${seed}.svg `}
        />
        <div className="chat_headerInfo">
          <h3>{Room}</h3>
          <p>Last Seen...</p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        <p className={`chat_message ${true && "chat_receiver"}`}>
          <span className="chat_name">Saadee</span>
          Hello Rabbit
          <span className="chat_timeStamp">6:05pm</span>
        </p>
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
});

export default connect(mapStateToProps)(Chat);
