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
        <h1>{this.props.name}</h1>
        <p>Wins: {this.props.wins}</p>
        <p>Win %: {this.props.winPercent}</p>
        <p>Kills: {this.props.kills}</p>
        <p>K/D: {this.props.kd}</p>
      </div>
    );
  }
}
