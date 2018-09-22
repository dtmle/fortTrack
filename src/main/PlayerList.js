import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Player, Stats } from "./Player";
import { StatsList } from "./StatsList.js";
import {
  InputField,
  AddButton,
  RemoveButton,
  SendButton,
  RadioGroup
} from "../input/Buttons";
import { getStats } from "../api/Call";

library.add(faSpinner);

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
          tip: "",
          stats: {},
          key: Math.floor(Math.random() * 9999)
        }
      ],
      //state for submit button pressed & all inputs valid
      searching: false,
      loading: false,
      buttonPhrase: "COMPARE"
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
    players[i].changed = true;
    players[i].name = val;
    //if value length is less than 3, its a bad display name
    if (val.length < 3) {
      //set valid to false
      players[i].valid = false;
      players[i].tip = "Player name must be atleast 3 characters";
      this.setState({
        players: players
      });
    } else {
      //else if changed, reset stats and set valid to true
      players[i].valid = true;
      players[i].stats = {};
      players[i].tip = "";
      this.setState({
        players: players
      });
    }
  }

  handleRadioChange(e, i) {
    const selected = e.target.value;
    let players = [...this.state.players];
    players[i].platform = selected;
    if (players[i].name.length > 2) {
      players[i].valid = true;
    }
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
        stats: {},
        key: Math.floor(Math.random() * 9999)
      });
      this.setState({ players: players });
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    //check if all players have been changed from default
    let changed = true;
    let valid = true;
    let players = [...this.state.players];
    players.forEach(ele => {
      if (!ele.changed) {
        ele.tip = "Player name not changed";
        changed = false;
      }
      if (!ele.valid) {
        valid = false;
        ele.tip = "Player name is invalid";
      }
    });
    //if searching already, switch back to input mode
    if (this.state.searching) {
      this.setState({
        searching: false,
        buttonPhrase: "COMPARE"
      });
      return;
    }
    //if not changed, set player input tip
    if (!changed) {
      this.setState({
        players: players,
        searching: false
      });
      return;
    }
    //if not valid, set player input tip
    if (!valid) {
      this.setState({
        players: players,
        searching: false
      });
    }
    //else get stats and check if name is valid/exists
    else {
      this.setState({ loading: true });
      setTimeout(async () => {
        const players = await getStats(this.state.players);
        console.log(players);
        let valid = true;
        //go through all players and make sure name is valid
        players.forEach(ele => {
          if (!ele.valid) {
            valid = false;
            ele.tip = "Player name does not exist";
          }
        });
        //if it's valid, set state and search!
        if (valid) {
          //set players and their stats, and search
          this.setState({
            players: players,
            searching: true,
            loading: false,
            buttonPhrase: "COMPARE AGAIN"
          });
        }
        //else dont search, set player input tip
        else {
          this.setState({
            players: players,
            searching: false,
            loading: false
          });
        }
      }, 1000);
    }
  }

  makePlayers() {
    //map each player
    const players = this.state.players.map((ele, i) => {
      //if searching, return stats instead of player
      if (this.state.searching) {
        return (
          <Stats key={"player_" + ele.key} name={ele.name} stats={ele.stats} />
        );
      } else {
        return (
          <Player
            name={ele.name}
            key={"player_" + ele.key}
            remove={this.state.players[i].remove !== undefined ? true : false}
          >
            <InputField
              value={ele.name}
              onChange={e => this.handleChange(e, i)}
              valid={ele.valid}
              changed={ele.changed}
            />

            <p className="Tip">{this.state.players[i].tip}</p>

            {this.state.players.length > 1 ? (
              <RemoveButton onClick={e => this.handleRemoveClick(e, i)} />
            ) : (
              ""
            )}

            <RadioGroup
              key={"platform_" + ele.key}
              onChange={e => this.handleRadioChange(e, i)}
            />
          </Player>
        );
      }
    });
    return players;
  }

  render() {
    const players = this.makePlayers();
    return (
      <main className="Container">
        {this.state.searching ? (
          <StatsList key="StatsList">{players}</StatsList>
        ) : (
          <ReactCSSTransitionGroup
            className="PlayerList"
            transitionName="fade"
            transitionEnterTimeout={750}
            transitionLeaveTimeout={300}
          >
          <h1>Compare Fortnite Stats</h1>
            {players}
          </ReactCSSTransitionGroup>
        )}
        <ReactCSSTransitionGroup
          className="Loading"
          transitionName="load"
          transitionEnterTimeout={750}
          transitionLeaveTimeout={250}
        >
          {this.state.loading ? (
            <FontAwesomeIcon key={"loading"} icon="spinner" size="6x" pulse />
          ) : (
            ""
          )}
        </ReactCSSTransitionGroup>
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
      </main>
    );
  }
}
