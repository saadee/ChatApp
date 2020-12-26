import React, { useState, useEffect } from "react";
import "./SideBarChat.css";
import { Avatar } from "@material-ui/core";
import db from "../../firebase";
import { connect } from "react-redux";
import { ChangeChat } from "../../_actions/chatActions";
import firebase from "firebase";

function SideBarChat({ addNewChat, name, ChatRoomId, id, ChangeChat }) {
  const [seed, setseed] = useState("");
  const [messages, setmessages] = useState([]);
  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setmessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);
  useEffect(() => {
    setseed(Math.floor(Math.random() * 2000));
  }, []);
  const createNewChat = () => {
    const roomName = prompt("Enter the Name of new Chat");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  return !addNewChat ? (
    <div className="sideBarChat" onClick={(e) => ChangeChat(id)}>
      <Avatar src={`https://avatars.dicebear.com/4.5/api/human/${seed}.svg `} />
      <div className="sideBarChats_info">
        <h2>{name}</h2>
        <p>{messages[0]?.message}</p>
      </div>
    </div>
  ) : (
    <div className="sideBarChat" onClick={(e) => createNewChat(e)}>
      <h2>Add New Chat</h2>
    </div>
  );
}

const mapStateToProps = (state) => ({
  ChatRoomId: state.Chat.roomId,
  user: state.Chat.user,
});
export default connect(mapStateToProps, { ChangeChat })(SideBarChat);
