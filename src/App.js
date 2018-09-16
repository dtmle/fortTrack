import React, { Component } from "react";
import "./App.css";
import { Player } from "./main/Player";
import { SendButton, AddButton, RemoveButton } from "./input/Button";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searched: false,
      best: "Who da best?",
      players: [<Player searched={false} />]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  handleAddClick() {
    if (this.state.players.length < 4) {
      let players = this.state.players;
      players.push(<Player searched={false} />);
      this.setState({ players: players });
    }
  }

  handleSubmit() {
    if (this.state.searched) {
      let players = this.changeToSearched(false);
      this.setState({
        searched: false,
        best: "Who da best?",
        players: players
      });
    } else {
      let players = this.changeToSearched(true);
      this.setState({
        searched: true,
        best: "Compare again",
        players: players
      });
    }
  }

  changeToSearched(searched) {
    let players = this.state.players;
    let newArr = [];
    if (searched) {
      for (let i = 0; i < players.length; i++) {
        newArr.push(<Player searched={true} />);
      }
    } else {
      for (let i = 0; i < players.length; i++) {
        newArr.push(<Player searched={false} />);
      }
    }
    return newArr;
  }

  handleRemoveClick(_, i) {
    if (this.state.players.length > 1) {
      console.log(i);
      let players = this.state.players;
      delete players[i];
      let newArr = [];
      players.forEach(el => {
        if (el !== null) {
          newArr.push(el);
        }
      });
      this.setState({ players: newArr });
    }
  }

  render() {
    let players = this.state.players;
    let divKey = "player_";
    players = players.map((el, i) => {
      return (
        <div key={divKey + i}>
          {el}
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
