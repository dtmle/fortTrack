import React, { Component } from "react";
import "./App.css";
import { PlayerList } from "./main/PlayerList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <PlayerList />
      </div>
    );
  }
}

export default App;
