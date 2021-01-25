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

import { IProduct } from "../../../models/interfaces";
import CreateProductDialog from "../dialogs/CreateProductDialog";
import DeleteProductDialog from "../dialogs/DeleteProductDialog";
import EditProductDialog from "../dialogs/EditProductDialog";

export default function CustomersTable({
  headers,
  data,
  setLoading,
  setError,
  setMessage,
}: {
  headers: string[];
  data: IProduct[] | undefined;
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
  setMessage: (message: string) => void;
}) {
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<IProduct>({
    name: "",
    description: "",
    price: 0,
    amount: 0,
    id: 0,
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
          new product
        </Button>
      </Grid>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{headers[0]}</TableCell>
              <TableCell>{headers[1]}</TableCell>
              <TableCell>{headers[2]}</TableCell>
              <TableCell>{headers[3]}</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data ? (
              data.map((row: IProduct) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row" className="my-cell">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.description}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.price}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.amount}
                  </TableCell>
                  <TableCell align="right">
                    <div style={{ display: "flex" }}>
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          setId(row.id);
                          setOpenDelete(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="edir"
                        onClick={() => {
                          setCurrentProduct(row);
                          setOpenEdit(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <CircularProgress />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <CreateProductDialog
        open={openCreate}
        setOpen={setOpenCreate}
        setLoading={setLoading}
        setError={setError}
        setMessage={setMessage}
      />
      <DeleteProductDialog
        open={openDelete}
        setOpen={setOpenDelete}
        setLoading={setLoading}
        setError={setError}
        setMessage={setMessage}
        id={id}
      />
      <EditProductDialog
        open={openEdit}
        setOpen={setOpenEdit}
        setLoading={setLoading}
        setError={setError}
        setMessage={setMessage}
        currentProduct={currentProduct}
      />
    </>
  );
}
