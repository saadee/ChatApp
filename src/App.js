import "./App.css";
import SideBar from "./SideBar/SideBar";
import Chat from "./Chat/Chat";
import { Provider } from "react-redux";
import Store from './Store'
function App() {
  return (
    <Provider store={Store}>

    <div className="App">
      <div className="app_body">
        <SideBar />
        <Chat />
      </div>
    </div>
    </Provider>
  );
}

export default App;
