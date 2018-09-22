import React from "react";
import { StatModeButtons } from "../input/Buttons";

export class StatsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "Total"
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    this.setState({
      mode: e.target.value
    });
  }

  render() {
    return (
      <main className="StatsList">
        <StatModeButtons onClick={this.handleOnClick} />
        <div className="PlayerList">
          {React.Children.map(this.props.children, child => {
            return React.cloneElement(child, { mode: this.state.mode });
          })}
        </div>
      </main>
    );
  }
}
