import React, { useState, useEffect } from "react";
import "./SideBarChat.css";
import { Avatar } from "@material-ui/core";
import db from "../../firebase";
import { connect } from "react-redux";
import { ChangeChat } from "../../_actions/chatActions";

function SideBarChat({ addNewChat, name, id, ChangeChat }) {
  const [seed, setseed] = useState("");
  useEffect(() => {
    setseed(Math.floor(Math.random() * 2000));
  }, []);
  const createNewChat = () => {
    const roomName = prompt("Enter the Name of new Chat");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <div className="sideBarChat" onClick={(e) => ChangeChat(id)}>
      <Avatar src={`https://avatars.dicebear.com/4.5/api/human/${seed}.svg `} />
      <div className="sideBarChats_info">
        <h2>{name}</h2>
        <p>Last message</p>
      </div>
    </div>
  ) : (
    <div className="sideBarChat" onClick={(e) => createNewChat(e)}>
      <h2>Add New Chat</h2>
    </div>
  );
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { ChangeChat })(SideBarChat);
