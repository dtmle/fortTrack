import React from "react";

export class Player extends React.Component {
  render() {
    if (this.props.searched && this.props.valid) {
      return <Stats name={this.props.name} />;
    } else {
      return (
        <div className="Player">
          <h2 className="playerName">{this.props.name}</h2>
          {this.props.children}
        </div>
      );
    }
  }
}

export class Stats extends React.Component {
  render() {
    return (
      <div className="Player">
        <h2>{this.props.name}</h2>
        <div className="StatContainer">
          <p id="wins">
            Wins: <span>{this.props.wins}</span>
          </p>
          <p id="winratio">
            Win Ratio: <span>{this.props.winPercent}</span>
          </p>
          <p id="kills">
            Kills: <span>{this.props.kills}</span>
          </p>
          <p id="kd">
            K/D: <span>{this.props.kd}</span>
          </p>
        </div>
      </div>
    );
  }
}
