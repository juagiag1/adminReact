import React, { useState, useEffect } from "react";

import ProductsTable from "./table/ProductsTable";
import { IProduct } from "../../models/interfaces";
import { getProducts } from "../../services/ProductsService";

const ProductsPage = ({
  setLoading,
  setError,
  setMessage,
  error,
}: {
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
  setMessage: (message: string) => void;
  error: boolean;
}) => {
  const [products, setProducts] = useState<IProduct[]>();
  const headers = ["Name", "Description", "Price", "Amount"];
  async function getAllCustomers() {
    await getProducts()
      .then((res: any) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getAllCustomers();
    // eslint-disable-next-line
  }, [error]);

  return (
    <ProductsTable
      headers={headers}
      data={products}
      setLoading={setLoading}
      setError={setError}
      setMessage={setMessage}
    />
  );
};

export default ProductsPage;
