import React from "react";
import Enzyme, { shallow, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CustomersTable from "./CustomersTable";

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {
  headers: ["Name", "Email", "Phone"],
  data: [
    {
      name: "Maria for test",
      email: "maria@mail.com",
      password: "123456",
      phoneNumber: "963587412",
      id: 1,
    },
    {
      name: "Carmen",
      email: "carmen@mail.com",
      password: "123456",
      phoneNumber: "654123789",
      id: 2,
    },
  ],
};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<CustomersTable {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe("Customers Table test", () => {
  it("should be rendered", () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it("should get the add customer button", async () => {
    const { enzymeWrapper } = setup(initProps);
    const addButton = enzymeWrapper.find(".addButton").first();
    expect(addButton.text()).toEqual("new customer");
  });

  it("should render the passed data", async () => {
    const { enzymeWrapper } = setup(initProps);
    const cell = enzymeWrapper.find(".my-cell").first();
    expect(cell.text()).toEqual("Maria for test");
  });
});
