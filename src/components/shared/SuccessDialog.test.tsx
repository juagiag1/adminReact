import React from "react";
import Enzyme, { shallow, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SuccessDialog from "./SuccessDialog";

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<SuccessDialog {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe("Success Dialog test", () => {
  it("should be rendered", () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it("should render properly the message", async () => {
    const { enzymeWrapper } = setup({ ...initProps, message: "Test message" });
    const message: ShallowWrapper = enzymeWrapper.find(".message");
    expect(message.text()).toBe("Test message");
  });
});
