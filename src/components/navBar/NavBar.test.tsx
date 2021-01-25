import React from "react";
import Enzyme, { shallow, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavBar from "./NavBar";

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {};

jest.mock("react-router-dom", () => ({ useNavigate: jest.fn() }));

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<NavBar {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe("NavBar test", () => {
  it("should be rendered", () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it("should contain a title", async () => {
    const { enzymeWrapper } = setup(initProps);
    const title: ShallowWrapper = enzymeWrapper.find(".logo-title");
    expect(title.text()).toBe("Cecotec Shop Admin");
  });

  it("should contain a log out button", async () => {
    const { enzymeWrapper } = setup(initProps);
    const button: ShallowWrapper = enzymeWrapper.find(".sign-out-button");
    expect(button.text()).toBe("Sign Out");
  });
});
