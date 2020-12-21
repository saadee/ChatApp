import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { setUser } from "../_actions/chatActions";
import { connect } from "react-redux";

function Login({ setUser }) {
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        setUser(result)
        console.log(result);
        // ...
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };
  return (
    <div className="login">
      <div className="login_logo">
        <img src="https://logodix.com/logo/1875807.png" width="50%" alt="" />
      </div>
      <div className="login_btn">
        <Button onClick={(e) => signIn()}>
          Sign in To WhatsApp with Google
        </Button>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  user:state.Chat.user
});
export default connect(mapStateToProps,{setUser})(Login);
