import React from "react";
import Enzyme, { shallow, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ProductsTable from "./ProductsTable";

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {
  headers: ["Name", "Email", "Phone"],
  data: [
    {
      name: "Aspirador X101",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo",
      price: 129.99,
      amount: 58,
      id: 1,
    },
    {
      name: "Aspirador X5",
      description:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit",
      price: 259.99,
      amount: 58,
      id: 2,
    },
  ],
};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<ProductsTable {...props} />);

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
    expect(addButton.text()).toEqual("new product");
  });

  it("should render the passed data", async () => {
    const { enzymeWrapper } = setup(initProps);
    const cell = enzymeWrapper.find(".my-cell").first();
    expect(cell.text()).toEqual("Aspirador X101");
  });
});
