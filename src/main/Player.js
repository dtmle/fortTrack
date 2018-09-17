import React from "react";
import { Stats } from "./Stats";

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
