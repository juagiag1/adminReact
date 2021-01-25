import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

import { addProduct } from "../../../services/ProductsService";
import { IProductDTO } from "../../../models/interfaces";

export default function CreateUserDialog({
  open,
  setOpen,
  setLoading,
  setError,
  setMessage,
}: {
  open: boolean;
  setOpen: (loading: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
  setMessage: (message: string) => void;
}) {
  const [body, setBody] = useState<IProductDTO>({
    name: "",
    description: "",
    price: null,
    amount: null,
  });
  const [disabled, setDisabled] = useState<boolean>(true);
  async function createProduct(body: IProductDTO) {
    await addProduct(body)
      .then((res: any) => {
        setLoading(false);
        setError(true);
        setMessage("Product successfully inserted");
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        setMessage("Something went wrong");
      });
  }

  const handleCreate = (body: IProductDTO) => {
    setOpen(false);
    setLoading(true);
    createProduct(body);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (
      body.name !== "" &&
      body.description !== "" &&
      body.price !== null &&
      body.amount !== null
    ) {
      setDisabled(false);
    }
  }, [body]);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create a new customer</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          onChange={(freq) => {
            setBody({ ...body, name: freq.target.value });
          }}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          onChange={(freq) => {
            setBody({ ...body, description: freq.target.value });
          }}
        />
        <TextField
          margin="dense"
          id="price"
          label="Price"
          type="text"
          fullWidth
          onChange={(freq) => {
            setBody({ ...body, price: parseFloat(freq.target.value) });
          }}
        />
        <TextField
          margin="dense"
          id="amount"
          label="Amount"
          type="text"
          fullWidth
          onChange={(freq) => {
            setBody({ ...body, amount: parseInt(freq.target.value) });
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => handleCreate(body)}
          color="primary"
          disabled={disabled}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
