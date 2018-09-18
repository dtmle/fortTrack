import React from "react";

export class Player extends React.Component {
  render() {
    if (this.props.searched && this.props.valid) {
      return <Stats name={this.props.name} />;
    } else {
      return (
        <div className="Player" key={this.props.uniqueId}>
          <h1 className="playerName">{this.props.name}</h1>
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
        <p>Wins</p>
        <p>Win %</p>
        <p>Kills</p>
        <p>K/D</p>
      </div>
    );
  }
}
