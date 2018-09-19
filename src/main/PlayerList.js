import Fortnite from "fortnite";
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
      //player holder
      players: [
        {
          //name, validity, inputField changed, stats
          name: "Player 1",
          valid: true,
          changed: false,
          stats: {}
        }
      ],
      //state for submit button pressed & all inputs valid
      searching: false,
      loading: false,
      buttonPhrase: "Who da best?"
    };
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRemoveClick(_, i) {
    //filter out the index being removed
    if (this.state.players.length > 1) {
      this.setState({
        players: this.state.players.filter((_, ind) => {
          return ind !== i;
        })
      });
    }
  }

  handleChange(event, i) {
    //get value from inputField
    let val = event.target.value;
    let players = [...this.state.players];
    players[i].name = val;
    //if value length is less than 3, its a bad display name
    if (val.length < 3) {
      //set both valid and changed to false
      players[i].valid = players[i].changed = false;
      this.setState({ players: players });
    } else {
      //else if changed, reset stats and set valid and changed to true
      players[i].valid = players[i].changed = true;
      players[i].stats = {};
      this.setState({
        players: players,
        buttonPhrase: "Who da best?"
      });
    }
  }

  handleAddClick() {
    //make sure 4 is max
    if (this.state.players.length < 4) {
      let players = [...this.state.players];
      //push new empty player
      players.push({
        name: "Player " + (players.length + 1),
        valid: true,
        changed: false,
        stats: {}
      });
      this.setState({ players: players });
    }
  }

  async handleSubmit() {
    //check if all players have been changed from default
    let changed = true;
    this.state.players.forEach(ele => {
      if (!ele.changed) {
        changed = false;
      }
    });
    //if searching already, switch back to input mode
    if (this.state.searching) {
      this.setState({
        searching: false,
        buttonPhrase: "Who da best?"
      });
      //if not changed, display another message
    } else if (!changed) {
      this.setState({
        searching: false,
        buttonPhrase: "Player not changed!"
      });
      //else get try to get stats
    } else {
      this.setState({ loading: true });
      const players = await this.getStats();
      //if the return has search property, it's bad
      if (players.search !== undefined) {
        let allPlayers = [...this.state.players];
        let badName = allPlayers[players.badIndex];
        badName.valid = false;
        //set new players, with valid being false for the invalid named player
        this.setState({ players: allPlayers, loading: false });
      } else {
        //else set players and their stats, and search
        this.setState({
          players: players,
          searching: true,
          loading: false,
          buttonPhrase: "Compare again"
        });
      }
    }
  }

  makePlayers() {
    //map each player
    const players = this.state.players.map((ele, i) => {
      //if searching, return stats instead of player
      if (this.state.searching) {
        return (
          <Stats
            key={"stat_" + (i + 1)}
            name={ele.name}
            wins={ele.stats.wins}
            winPercent={ele.stats.winPercent}
            kills={ele.stats.kills}
            kd={ele.stats.kd}
          />
        );
      } else {
        return (
          <Player name={ele.name} key={"player_" + (i + 1)}>
            <InputField
              value={ele.name}
              onChange={e => this.handleChange(e, i)}
              valid={ele.valid}
              changed={ele.changed}
            />
            {this.state.players.length > 1 ? (
              <RemoveButton onClick={e => this.handleRemoveClick(e, i)} />
            ) : (
              ""
            )}
          </Player>
        );
      }
    });
    return players;
  }

  async getStats() {
    const client = new Fortnite("OBSCURED FOR NOW");
    let players = [...this.state.players];
    let invalidIndex = "";
    //try to fetch player stats from api
    try {
      for (let i = 0; i < players.length; i++) {
        invalidIndex = i;
        let currPlayer = players[i];
        //if stats is already defined, skip current player
        if (currPlayer.stats.wins !== undefined) {
          continue;
        }
        let res = await client.user(currPlayer.name, "pc");
        currPlayer.stats.wins = res.stats.lifetime[8]["Wins"];
        currPlayer.stats.winPercent = res.stats.lifetime[9]["Win%"];
        currPlayer.stats.kills = res.stats.lifetime[10]["Kills"];
        currPlayer.stats.kd = res.stats.lifetime[11]["K/d"];
      }
      return players;
    } catch (err) {
      //return search and badIndex to disallow switching to search mode if invalid name exists
      return { search: false, badIndex: invalidIndex };
    }
  }

  render() {
    const players = this.makePlayers();
    return (
      <div>
        <div className="PlayerList">{players}</div>
        {this.state.loading ? (
          <div className="loading">
            <h1>LOADING</h1>
          </div>
        ) : (
          ""
        )}
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
