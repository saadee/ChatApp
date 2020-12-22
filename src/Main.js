import React from "react";
import "./App.css";
import { connect } from "react-redux";
import SideBar from "./SideBar/SideBar";
import Chat from "./Chat/Chat";
import Login from "./Auth/Login";

function Main({ user }) {
  return (
    <div className="App">
      {user ? (
        <div className="app_body">
          <SideBar />
          <Chat />
        </div>
      ) : (
        <div className="app_body">
          <Login />
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state) => ({
  user: state.Chat.user,
});

export default connect(mapStateToProps)(Main);
