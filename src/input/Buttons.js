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
        placeholder="Name"
        value={this.props.value}
        onChange={this.props.onChange}
        maxLength="16"
        style={{
          //change color depending on if valid and changed
          borderColor:
            this.props.valid && this.props.changed ? "#21D3B0" : "#A63D40"
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
      <input
        type="button"
        value="+"
        className={"AddButton " + progress}
        onClick={this.props.onClick}
        style={{ visibility: this.props.hide ? "hidden" : "visible" }}
      />
    );
  }
}

export class RemoveButton extends React.Component {
  render() {
    return (
      <input
        type="button"
        value="X"
        className="RemoveButton"
        onClick={this.props.onClick}
      />
    );
  }
}

export class RadioGroup extends React.Component {
  render() {
    return (
      <form className="RadioGroup" onChange={this.props.onChange}>
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

export class StatModeButtons extends React.Component {
  render() {
    return (
      <div className="StatModeButtons">
        <label id="total">
          Total
          <input type="radio" value="Total" onClick={this.props.onClick} />
        </label>
        <label id="solos">
          Solos
          <input type="radio" value="Solos" onClick={this.props.onClick} />
        </label>
        <label id="duos">
          Duos
          <input type="radio" value="Duos" onClick={this.props.onClick} />
        </label>
        <label id="squads">
          Squads
          <input type="radio" value="Squads" onClick={this.props.onClick} />
        </label>
      </div>
    );
  }
}
