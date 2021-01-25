import { environment } from "./environment/environment";
import {
  ICustomer,
  ICustomerDTO
} from "../models/interfaces";



export function getCustomers(): Promise<{data: ICustomer[]}> {
    const endPoint = "/customers";
    return environment.get(endPoint);
  }

  export function addCustomer(body: ICustomerDTO): Promise<any> {
    const endPoint = "/customers";
    return environment.post(endPoint, body);
  }

  export function updateCustomer(id: number, body: ICustomerDTO): Promise<any> {
    const endPoint = "/customers/" + id;
    return environment.put(endPoint, body);
  }

  export function deleteCustomer(id: number): Promise<any> {
    const endPoint = "/customers/" + id;
    return environment.delete(endPoint);
  }



