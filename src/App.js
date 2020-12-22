import React, { useState, useEffect } from "react";
import "./App.css";

import { Provider } from "react-redux";
import Store from "./Store";

import Main from "./Main";


const App = ({}) => {
  const [user, setuser] = useState(null);
  return (
    <Provider store={Store}>
      <Main />
    </Provider>
  );
};

export default App;
