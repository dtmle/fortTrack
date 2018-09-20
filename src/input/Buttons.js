import React from "react";
import "./Button.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import { faXbox, faPlaystation } from "@fortawesome/free-brands-svg-icons";

library.add(faDesktop, faXbox, faPlaystation);

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
    let progress = "c" + this.props.count;
    return (
      <button
        className={"AddButton " + progress}
        onClick={this.props.onClick}
        style={{ visibility: this.props.hide ? "hidden" : "visible" }}
      >
        +
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
              <span>
                <title>Desktop</title>
                <FontAwesomeIcon icon="desktop" size="2x" />
              </span>
            </label>
          </li>
          <li className="RadioOption">
            <label>
              <input type="radio" name="platform" value="xbl" />
              <span>
                <title>Xbox Live</title>
                <FontAwesomeIcon icon={["fab", "xbox"]} size="2x" />
              </span>
            </label>
          </li>
          <li className="RadioOption">
            <label>
              <input type="radio" name="platform" value="psn" />
              <span>
                <title>Playstation Network</title>
                <FontAwesomeIcon icon={["fab", "playstation"]} size="2x" />
              </span>
            </label>
          </li>
        </ul>
      </form>
    );
  }
}
