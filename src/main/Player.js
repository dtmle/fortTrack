import React from "react";
import { InputField } from "../input/InputField";
import { Stats } from "./Stats";

export class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "Player", valid: true };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let val = event.target.value;
    if (val.length < 3) {
      this.setState({ name: val, valid: false });
    } else {
      this.setState({ name: val, valid: true });
    }
  }

  render() {
    if (this.props.searched && this.state.valid) {
      return <Stats name={this.state.name}/>;
    } else {
      return (
        <div className="Player">
          <h1>{this.state.name}</h1>
          <InputField
            value={this.state.name}
            onChange={this.handleChange}
            valid={this.state.valid}
          />
        </div>
      );
    }
  }
}
