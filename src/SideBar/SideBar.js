import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import "./Sidebar.css";
import SideBarChat from "./SideBarChat/SideBarChat";
import db from "../firebase";
import { connect } from "react-redux";

function SideBar({ user }) {
  const [rooms, setrooms] = useState([]);
  useEffect(() => {
    const unSubcribe = db
      .collection("rooms")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setrooms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return () => {
      unSubcribe();
    };
  }, []);
  return (
    <div className="sideBar">
      <div className="sideBar_header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sideBar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlinedIcon />

          <input type="text" placeholder="Search or Start a new Chat" />
        </div>
      </div>
      <div className="sideBar_chats">
        <SideBarChat addNewChat />
        {rooms.map((room) => (
          <SideBarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  ChatRoomId: state.Chat.roomId,
  user: state.Chat.user,
});

export default connect(mapStateToProps)(SideBar);
