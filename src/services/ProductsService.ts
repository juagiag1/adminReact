import { environment } from "./environment/environment";
import {
  IProduct,
  IProductDTO
} from "../models/interfaces";



export function getProducts(): Promise<{data: IProduct[]}> {
    const endPoint = "/products";
    return environment.get(endPoint);
  }

  export function addProduct(body: IProductDTO): Promise<any> {
    const endPoint = "/products";
    return environment.post(endPoint, body);
  }

  export function updateProduct(id: number, body: IProductDTO): Promise<any> {
    const endPoint = "/products/" + id;
    return environment.put(endPoint, body);
  }

  export function deleteProduct(id: number): Promise<any> {
    const endPoint = "/products/" + id;
    return environment.delete(endPoint);
  }




