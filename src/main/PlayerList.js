import React from "react";
import { Player, Stats } from "./Player";
import {
  InputField,
  AddButton,
  RemoveButton,
  SendButton
} from "../input/Buttons";

export class PlayerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [
        {
          name: "Player 1",
          valid: true,
          changed: false
        }
      ],
      searching: false,
      buttonPhrase: "Who da best?"
    };
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleChange(event, i) {
    let val = event.target.value;
    let players = [...this.state.players];
    players[i].name = val;
    if (val.length < 3) {
      players[i].valid = players[i].changed = false;
      this.setState({ players: players });
    } else {
      players[i].valid = players[i].changed = true;
      this.setState({
        players: players,
        buttonPhrase: "Who da best?"
      });
    }
  }

  handleAddClick() {
    console.log(this);
    if (this.state.players.length < 4) {
      let players = [...this.state.players];
      players.push({
        name: "Player " + (players.length + 1),
        valid: true
      });
      this.setState({ players: players });
    }
  }

  handleSubmit() {
    let changed = true;
    this.state.players.forEach(ele => {
      if (!ele.changed) {
        changed = false;
      }
    });
    if (this.state.searching) {
      this.setState({
        searching: false,
        buttonPhrase: "Who da best?"
      });
    }
    if (!changed) {
      this.setState({
        searching: false,
        buttonPhrase: "Player not changed!"
      });
    } else {
      this.setState({
        searching: true,
        buttonPhrase: "Compare again"
      });
    }
  }

  makePlayers() {
    const players = this.state.players.map((ele, i) => {
      if (this.state.searching) {
        return <Stats name={ele.name} />;
      } else {
        return (
          <Player name={ele.name} uniqueId={"player_" + (i + 1)}>
            <InputField
              value={ele.name}
              onChange={e => this.handleChange(e, i)}
              valid={ele.valid}
              changed={ele.changed}
            />
            <RemoveButton onClick={e => this.handleRemoveClick(e, i)} />
          </Player>
        );
      }
    });
    return players;
  }

  render() {
    const players = this.makePlayers();
    return (
      <div>
        <div className="PlayerList">{players}</div>
        <div className="AddButton">
          <AddButton
            count={this.state.players.length}
            onClick={e => this.handleAddClick(e)}
          />
        </div>
        <SendButton
          className="SendButton"
          text={this.state.buttonPhrase}
          onClick={this.handleSubmit}
        />
      </div>
    );
  }
}
