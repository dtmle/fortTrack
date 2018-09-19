import React from "react";
import "./Button.css";

export class InputField extends React.Component {
  render() {
    return (
      <input
        className="InputField"
        placeholder="Display Name"
        value={this.props.value}
        onChange={this.props.onChange}
        style={{
          //change color depending on if valid and changed
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
        className="SendButton"
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
        className="AddButton"
        onClick={this.props.onClick}
        style={{
          //hide when reached 4 players
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
    return (
      <button className="RemoveButton" onClick={this.props.onClick}>
        X
      </button>
    );
  }
}

export class RadioGroup extends React.Component {
  render() {
    return (
      <form className="RadioGroup" onChange={this.props.onChange}>
        <p>Platform</p>
        <ul>
          <li className="RadioOption">
            <label>
              <input type="radio" name="platform" value="pc" defaultChecked />
              PC
            </label>
          </li>
          <li className="RadioOption">
            <label>
              <input type="radio" name="platform" value="xbl" />
              XBL
            </label>
          </li>
          <li className="RadioOption">
            <label>
              <input type="radio" name="platform" value="psn" />
              PSN
            </label>
          </li>
        </ul>
      </form>
    );
  }
}
