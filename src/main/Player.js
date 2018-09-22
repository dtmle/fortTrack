import React from "react";

export class Player extends React.Component {
  render() {
    return (
      <div className="Player">
        <h2 className="playerName">{this.props.name}</h2>
        {this.props.children}
      </div>
    );
  }
}

export class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stats: this.props.stats };
  }

  getStatsForMode() {
    const mode = this.props.mode;
    switch (mode) {
      case "Total":
        return this.state.stats.lifeTimeStats;
      case "Solos":
        return this.state.stats.stats.solo;
      case "Duos":
        return this.state.stats.stats.duo;
      case "Squads":
        return this.state.stats.stats.squad;
      default:
        return 0;
    }
  }

  render() {
    const stats = this.getStatsForMode();
    const exists = stats !== undefined ? true : false;
    return (
      <div className="Player">
        <h2>{this.props.name}</h2>
        <div className="StatContainer">
          <p id="matchesPlayed">
            # Matches: <span>{exists ? stats.matches : 0}</span>
          </p>
          <p id="wins">
            Wins: <span>{exists ? stats.wins : 0}</span>
          </p>
          <p id="winratio">
            Win Ratio: <span>{exists ? stats.winRatio + "%" : "0%"}</span>
          </p>
          <p id="kills">
            Kills: <span>{exists ? stats.kills : 0}</span>
          </p>
          <p id="kd">
            K/D: <span>{exists ? stats.kd : 0}</span>
          </p>
        </div>
      </div>
    );
  }
}
