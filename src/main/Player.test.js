import React from "react";
import { mount, render, shallow } from "enzyme";
import { Player, Stats } from "./Player";

describe("Player", () => {
  it("should render", () => {
    const component = shallow(<Player />);
    expect(component).toMatchSnapshot();
  });
  it("should render name", () => {
    const component = shallow(<Player name={"Dennis"} />);
    expect(component.find("h2").text()).toEqual("Dennis");
  });
  it("should render stats if valid & searched", () => {
    const component = render(<Player searched={true} valid={true} />);
    expect(component.find("p").length).toEqual(4);
  });
});

describe("Stats", () => {
  it("should render", () => {
    const component = shallow(<Stats />);
    expect(component).toMatchSnapshot();
  });
  it("should render name", () => {
    const component = shallow(<Stats name={"Dennis"} />);
    expect(component.find("h2").text()).toEqual("Dennis");
  });
  it("should have 4 p's", () => {
    const component = shallow(<Stats name={"Dennis"} />);
    expect(component.find("p").length).toEqual(4);
  });
  it("should render wins", () => {
    const component = shallow(<Stats wins={100} />);
    expect(component.find("#wins").get(0).props.children[1].props.children).toEqual(100);
  });
  it("should render win percent", () => {
    const component = shallow(<Stats winPercent={100} />);
    expect(component.find("#winratio").get(0).props.children[1].props.children).toEqual(100);
  });
  it("should render kills", () => {
    const component = shallow(<Stats kills={100} />);
    expect(component.find("#kills").get(0).props.children[1].props.children).toEqual(100);
  });
  it("should render k/d", () => {
    const component = shallow(<Stats kd={100} />);
    expect(component.find("#kd").get(0).props.children[1].props.children).toEqual(100);
  });
});
