import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

import { updateProduct } from "../../../services/ProductsService";
import { IProduct, IProductDTO } from "../../../models/interfaces";

export default function CreateUserDialog({
  open,
  setOpen,
  setLoading,
  setError,
  setMessage,
  currentProduct,
}: {
  open: boolean;
  setOpen: (loading: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
  setMessage: (message: string) => void;
  currentProduct: IProduct;
}) {
  const [body, setBody] = useState<IProductDTO>({
    name: "",
    description: "",
    price: null,
    amount: null,
  });
  useEffect(() => {
    setBody({
      name: currentProduct.name,
      description: currentProduct.description,
      price: currentProduct.price,
      amount: currentProduct.amount,
    });
    // eslint-disable-next-line
  }, [open]);
  async function updateProductFunc(id: number, body: IProductDTO) {
    await updateProduct(id, body)
      .then((res: any) => {
        setLoading(false);
        setError(true);
        setMessage("Product successfully edited");
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        setMessage("Something went wrong");
      });
  }
  const handleUpdate = (id: number, body: IProductDTO) => {
    setOpen(false);
    setLoading(true);
    updateProductFunc(id, body);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit customer</DialogTitle>
      <DialogContent>
        <TextField
          value={body.name}
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
          value={body.description}
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
          value={body.price}
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
          value={body.amount}
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
          onClick={() => handleUpdate(currentProduct.id, body)}
          color="primary"
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
