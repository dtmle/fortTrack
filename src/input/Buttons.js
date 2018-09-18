import React from "react";

export class InputField extends React.Component {
  render() {
    return (
      <input
        placeholder="Display Name"
        value={this.props.value}
        onChange={this.props.onChange}
        style={{
          borderColor:
            this.props.valid && this.props.changed
              ? "rgb(0, 255, 0)"
              : "rgb(255, 0, 0)"
        }}
      />
    );
  }
}

export class SendButton extends React.Component {
  render() {
    return (
      <input
        type="submit"
        value={this.props.text}
        onClick={this.props.onClick}
      />
    );
  }
}

export class AddButton extends React.Component {
  render() {
    return (
      <button
        onClick={this.props.onClick}
        style={{
          visibility: this.props.count === 4 ? "hidden" : "visible"
        }}
      >
        Add
      </button>
    );
  }
}

export class RemoveButton extends React.Component {
  render() {
    return <button onClick={this.props.onClick}>Remove</button>;
  }
}
