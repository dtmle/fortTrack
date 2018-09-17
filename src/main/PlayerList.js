import React from "react";
import { Player } from "./Player";
import { Stats } from "./Stats";
import { InputField, AddButton, RemoveButton } from "../input/Buttons";

export class PlayerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: ["Player 1"],
      valid: [true]
    };
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    let players = Object.assign([], this.state.players);
    let validList = Object.assign([], this.state.valid);
    players[i] = val;
    if (val.length < 3) {
      validList[i] = false;
      this.setState({ players: players, valid: validList });
    } else {
      validList[i] = true;
      this.setState({ players: players, valid: validList });
    }
  }

  handleAddClick() {
    console.log(this);
    if (this.state.players.length < 4) {
      let players = Object.assign([], this.state.players);
      let validList = Object.assign([], this.state.valid);
      players.push("Player " + (players.length + 1));
      validList.push(true);
      this.setState({ players: players, valid: validList });
    }
  }

  makePlayers() {
    const players = this.state.players.map((ele, i) => {
      if (this.props.searching) {
        return <Stats name={ele} />;
      } else {
        return (
          <div key={"player_" + (i + 1)}>
            <Player name={ele} />
            <InputField
              value={this.state.players[i]}
              onChange={e => this.handleChange(e, i)}
              valid={this.state.valid[i]}
            />
            <RemoveButton onClick={e => this.handleRemoveClick(e, i)} />
          </div>
        );
      }
    });
    return players;
  }

  render() {
    const players = this.makePlayers();
    return (
      <div>
        <div className="Player">{players}</div>
        <div className="AddButton">
          <AddButton
            count={this.state.players.length}
            onClick={e => this.handleAddClick(e)}
          />
        </div>
      </div>
    );
  }
}
