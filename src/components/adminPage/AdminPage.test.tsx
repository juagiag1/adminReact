import React from "react";
import Enzyme, { shallow, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AdminPage from "./AdminPage";

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<AdminPage {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe("Admin Page test", () => {
  it("should be rendered", () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it("should change tabs", async () => {
    const { enzymeWrapper } = setup(initProps);
    const tabs: ShallowWrapper = enzymeWrapper.find("#tabs-panel");
    tabs.simulate("change", undefined, "Products");
    const productsTable: ShallowWrapper = enzymeWrapper.find("ProductsPage");
    expect(productsTable).toBeTruthy();
  });
});
