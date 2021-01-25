import React, { useState } from "react";
import {
  IconButton,
  Button,
  Grid,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  CircularProgress,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";

import { ICustomer } from "../../../models/interfaces";
import CreateCustomerDialog from "../../customersPage/dialogs/CreateCustomerDialog";
import DeleteCustomerDialog from "../../customersPage/dialogs/DeleteCustomerDialog";
import EditCustomerDialog from "../../customersPage/dialogs/EditCustomerDialog";

export default function CustomersTable({
  headers,
  data,
  setLoading,
  setError,
  setMessage,
}: {
  headers: string[];
  data: ICustomer[] | undefined;
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
  setMessage: (message: string) => void;
}) {
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [currentCustomer, setCurrentcustomer] = useState<ICustomer>({
    email: "",
    phoneNumber: "",
    id: 0,
    name: "",
    password: "",
  });
  const [id, setId] = useState(0);

  return (
    <>
      <Grid container direction="row" justify="flex-end" alignItems="center">
        <Button
          className="addButton"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            setOpenCreate(true);
          }}
        >
          new customer
        </Button>
      </Grid>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{headers[0]}</TableCell>
              <TableCell>{headers[1]}</TableCell>
              <TableCell>{headers[2]}</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data ? (
              data.map((row: ICustomer) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row" className="my-cell">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.email}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.phoneNumber}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      id="delete-button"
                      aria-label="delete"
                      onClick={() => {
                        setId(row.id);
                        setOpenDelete(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      id="edit-button"
                      aria-label="edit"
                      onClick={() => {
                        setCurrentcustomer(row);
                        setOpenEdit(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <CircularProgress />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <CreateCustomerDialog
        open={openCreate}
        setOpen={setOpenCreate}
        setLoading={setLoading}
        setError={setError}
        setMessage={setMessage}
      />
      <DeleteCustomerDialog
        open={openDelete}
        setOpen={setOpenDelete}
        setLoading={setLoading}
        setError={setError}
        setMessage={setMessage}
        id={id}
      />
      <EditCustomerDialog
        open={openEdit}
        setOpen={setOpenEdit}
        setLoading={setLoading}
        setError={setError}
        setMessage={setMessage}
        currentCustomer={currentCustomer}
      />
    </>
  );
}
