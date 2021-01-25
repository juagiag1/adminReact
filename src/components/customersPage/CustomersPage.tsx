import React, { useEffect, useState } from "react";

import { ICustomer } from "../../models/interfaces";
import CustomersTable from "./table/CustomersTable";
import { getCustomers } from "../../services/CustomersService";

const CustomersPage = ({
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
  const [customers, setCustomers] = useState<ICustomer[]>();
  const headers = ["Name", "Email", "Phone"];
  async function getAllCustomers() {
    await getCustomers()
      .then((res: any) => {
        setCustomers(res.data);
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
    <CustomersTable
      headers={headers}
      data={customers}
      setLoading={setLoading}
      setError={setError}
      setMessage={setMessage}
    />
  );
};

export default CustomersPage;
