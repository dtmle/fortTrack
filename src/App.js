import React, { Component } from "react";
import "./App.css";
import { PlayerList } from "./main/PlayerList";
import { SendButton } from "./input/Buttons";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      buttonPhrase: "Who da best?"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    if (this.state.searching) {
      this.setState({
        searching: false,
        buttonPhrase: "Who da best?"
      });
    } else {
      this.setState({
        searching: true,
        buttonPhrase: "Compare again"
      });
    }
  }

  render() {
    return (
      <div className="App">
        <PlayerList />
        <SendButton text={this.state.buttonPhrase} onClick={this.handleSubmit}/>
      </div>
    );
  }
}

export default App;
