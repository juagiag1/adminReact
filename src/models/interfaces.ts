export interface ICustomer {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  id: number;
}

export interface ICustomerDTO {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}
export interface IProduct {
  name: string;
  description: string;
  price: number;
  amount: number;
  id: number;
}

export interface IProductDTO {
  name: string;
  description: string;
  price: number |null;
  amount: number | null;
}