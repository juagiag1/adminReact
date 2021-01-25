import React from "react";
import Enzyme, { shallow, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ProductsPage from "./ProductsPage";
import { getProducts } from "../../services/ProductsService";

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {};

jest.mock("../../services/ProductsService", () => ({
  getProducts: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
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
      })
    )
    .mockImplementationOnce(() =>
      Promise.reject({ response: { data: { errorMsg: "error" } } })
    ),
}));

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<ProductsPage {...props} />);

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

  it("should  get products on init", async () => {
    expect((await getProducts()).data.length).toBe(2);
  });
});
