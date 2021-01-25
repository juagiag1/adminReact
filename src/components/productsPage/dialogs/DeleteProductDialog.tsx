import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { deleteProduct } from "../../../services/ProductsService";

export default function CreateUserDialog({
  open,
  setOpen,
  setLoading,
  setError,
  setMessage,
  id,
}: {
  open: boolean;
  setOpen: (loading: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
  setMessage: (message: string) => void;
  id: number;
}) {
  async function deleteProductFunc(id: number) {
    await deleteProduct(id)
      .then((res: any) => {
        setLoading(false);
        setError(true);
        setMessage("Product successfully deleted");
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        setMessage("Something went wrong");
      });
  }
  const handleDelete = (id: number) => {
    setOpen(false);
    setLoading(true);
    deleteProductFunc(id);
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
      <DialogContent>
        <DialogContentText>
          Are you sure to delete this product?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleDelete(id)} color="primary">
          Yes
        </Button>
        <Button onClick={handleClose} color="primary">
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
