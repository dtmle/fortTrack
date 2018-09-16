import React from "react";

export class InputField extends React.Component {
  render() {
    return (
      <input
        placeholder="Display Name"
        value={this.props.value}
        onChange={this.props.onChange}
        style={{
          borderColor: this.props.valid ? "rgb(0, 255, 0)" : "rgb(255, 0, 0)"
        }}
      />
    );
  }
}
