import React from "react";
import Enzyme, { shallow, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LoginPage from "./LoginPage";

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {};

jest.mock("react-router-dom", () => ({ useNavigate: jest.fn() }));

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<LoginPage {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe("Login Page test", () => {
  it("should be rendered", () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it("should contain 2 inputs", async () => {
    const { enzymeWrapper } = setup(initProps);
    const emailInput: ShallowWrapper = enzymeWrapper.find("#email");
    const passwordInput: ShallowWrapper = enzymeWrapper.find("#password");
    expect(emailInput.length + passwordInput.length).toBe(2);
  });

  it("should contain a login button", async () => {
    const { enzymeWrapper } = setup(initProps);
    const button: ShallowWrapper = enzymeWrapper.find("#loginButton");
    expect(button.text()).toBe("Sign In");
  });
});
