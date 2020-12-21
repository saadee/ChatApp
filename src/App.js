import React, { useState, useEffect } from "react";
import "./App.css";
import SideBar from "./SideBar/SideBar";
import Chat from "./Chat/Chat";
import { Provider } from "react-redux";
import Store from "./Store";
import Login from "./Auth/Login";
import { connect } from "react-redux";

const App = ({ user }) =>  {
  // const [user, setuser] = useState(null);
  return (
    <Provider store={Store}>
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
    </Provider>
  );
};
const mapStateToProps = (state) => ({
  user: state.Chat.user,
});
export default connect(mapStateToProps, {})(App);
