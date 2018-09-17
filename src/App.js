import React, { Component } from "react";
import "./App.css";
import { Player } from "./main/Player";
import { SendButton, AddButton, RemoveButton } from "./input/Button";
//import { InputField } from "./input/InputField";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searched: false,
      best: "Who da best?",
      players: [1]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  handleAddClick() {
    if (this.state.players.length < 4) {
      let players = Object.assign([], this.state.players);
      players.push(players.length+1);
      this.setState({ players: players });
    }
  }

  handleSubmit() {
    if (this.state.searched) {
      this.setState({
        searched: false,
        best: "Who da best?",
      });
    } else {
      this.setState({
        searched: true,
        best: "Compare again",
      });
    }
  }

  handleRemoveClick(_, i) {
    if (this.state.players.length > 1) {
      this.setState({
        players: this.state.players.filter((_, ind) => {
          return ind !== i;
        })
      });
    }
  }

  render() {
    let players = this.state.players;
    let divKey = "player_";
    players = players.map((el, i) => {
      return (
        <div key={divKey + i}>
          <Player key={i} searched={this.state.searched}/>
          <RemoveButton onClick={e => this.handleRemoveClick(e, i)} />
        </div>
      );
    });
    return (
      <div className="App">
        <div>
          <br />
          {players}
          <br />
        </div>
        <AddButton
          onClick={this.handleAddClick}
          count={this.state.players.length}
        />
        <br />
        <SendButton best={this.state.best} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default App;
