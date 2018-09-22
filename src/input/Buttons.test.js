import React from "react";
import { mount, render, shallow } from "enzyme";
import { InputField, SendButton, AddButton, RemoveButton } from "./Buttons";

describe("InputField", () => {
  it("Should render", () => {
    const component = shallow(<InputField />);
    expect(component).toMatchSnapshot();
  });
  it("Should have a value", () => {
    const component = shallow(<InputField value="Dennis" />);
    expect(component.props().value).toEqual("Dennis");
  });
  it("Should have border red if invalid", () => {
    const component = shallow(<InputField valid={false} />);
    expect(component.props().style.borderColor).toEqual("#A63D40");
  });
  it("Should have border red if unchanged", () => {
    const component = shallow(<InputField changed={false} />);
    expect(component.props().style.borderColor).toEqual("#A63D40");
  });
  it("Should have border green if valid & changed", () => {
    const component = shallow(<InputField valid={true} changed={true} />);
    expect(component.props().style.borderColor).toEqual("#21D3B0");
  });
});

describe("SendButton", () => {
  it("Should render", () => {
    const component = shallow(<SendButton />);
    expect(component).toMatchSnapshot();
  });
  it("Should render text", () => {
    const component = shallow(<SendButton text={"Dennis"} />);
    expect(component.props().value).toEqual("Dennis");
  });
});

describe("AddButton", () => {
  it("Should render", () => {
    const component = shallow(<AddButton />);
    expect(component).toMatchSnapshot();
  });
  it("Should be visible when count < 4", () => {
    const component = shallow(<AddButton hide={false} />);
    expect(component.props().style.visibility).toEqual("visible");
  });
  it("Should be hidden when count == 4", () => {
    const component = shallow(<AddButton hide={true} />);
    expect(component.props().style.visibility).toEqual("hidden");
  });
});

describe("RemoveButton", () => {
  it("Should render", () => {
    const component = shallow(<RemoveButton />);
    expect(component).toMatchSnapshot();
  });
});
