import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Player, Stats } from "./Player";
import {
  InputField,
  AddButton,
  RemoveButton,
  SendButton,
  RadioGroup
} from "../input/Buttons";
import { getStats } from "../api/Call";

export class PlayerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //player holder
      players: [
        {
          //name, validity, inputField changed, stats
          name: "",
          platform: "pc",
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
    this.handleRadioChange = this.handleRadioChange.bind(this);
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

  handleRadioChange(e, i) {
    const selected = e.target.value;
    let players = [...this.state.players];
    players[i].platform = selected;
    this.setState({
      players: players
    });
  }

  handleAddClick() {
    //make sure 4 is max
    if (this.state.players.length < 4) {
      let players = [...this.state.players];
      //push new empty player
      players.push({
        name: "",
        platform: "pc",
        valid: true,
        changed: false,
        stats: {}
      });
      this.setState({ players: players });
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
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
      const players = await getStats(this.state.players);
      let valid = true;
      players.forEach(ele => {
        if (!ele.valid) {
          valid = false;
        }
      });
      if (valid) {
        //set players and their stats, and search
        this.setState({
          players: players,
          searching: true,
          loading: false,
          buttonPhrase: "Compare again"
        });
      } else {
        this.setState({
          players: players,
          searching: false,
          loading: false,
          buttonPhrase: "Player name does not exist!"
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
            wins={ele.stats.lifeTimeStats.wins}
            winPercent={ele.stats.lifeTimeStats.winPercent}
            kills={ele.stats.lifeTimeStats.kills}
            kd={ele.stats.lifeTimeStats.kd}
          />
        );
      } else {
        return (
          <Player
            name={ele.name}
            key={"player_" + (i + 1)}
            remove={this.state.players[i].remove !== undefined ? true : false}
          >
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
            <RadioGroup onChange={e => this.handleRadioChange(e, i)} />
          </Player>
        );
      }
    });
    return players;
  }

  render() {
    const players = this.makePlayers();
    return (
      <div className="Container">
        <ReactCSSTransitionGroup
          className="PlayerList"
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {players}
        </ReactCSSTransitionGroup>
        {this.state.loading ? (
          <div className="loading">
            <h1>LOADING</h1>
          </div>
        ) : (
          ""
        )}
        <AddButton
          count={this.state.players.length}
          onClick={e => this.handleAddClick(e)}
          hide={this.state.searching}
        />
        <br />
        <SendButton
          className="SendButton"
          text={this.state.buttonPhrase}
          onClick={this.handleSubmit}
        />
      </div>
    );
  }
}
