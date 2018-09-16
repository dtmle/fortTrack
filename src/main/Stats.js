import React from "react";

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
