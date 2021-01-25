import React from "react";
import Enzyme, { shallow, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CustomersPage from "./CustomersPage";
import { getCustomers } from "../../services/CustomersService";

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {};

jest.mock("../../services/CustomersService", () => ({
  getCustomers: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: [
          {
            name: "Maria",
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
          {
            name: "Maria",
            email: "maria@mail.com",
            password: "123456",
            phoneNumber: "963587412",
            id: 3,
          },
          {
            name: "Carmen",
            email: "carmen@mail.com",
            password: "123456",
            phoneNumber: "654123789",
            id: 4,
          },
        ],
      })
    )
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMsg: "error" } } })
    ),
}));

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<CustomersPage {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe("Customers Page test", () => {
  it("should be rendered", () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it("should get Customers on init", async () => {
    expect((await getCustomers()).data.length).toBe(4);
  });
});
