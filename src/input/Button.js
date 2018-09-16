import React from "react";

export class SendButton extends React.Component {
  render() {
    return (
      <input
        type="submit"
        value={this.props.best}
        onClick={this.props.onSubmit}
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
          backgroundColor:
            this.props.count === 4 ? "rgb(255, 0, 0)" : "rgb(255, 255, 255)"
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
