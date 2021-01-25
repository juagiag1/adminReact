import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

import { updateCustomer } from "../../../services/CustomersService";
import { ICustomer, ICustomerDTO } from "../../../models/interfaces";

export default function CreateUserDialog({
  open,
  setOpen,
  setLoading,
  setError,
  setMessage,
  currentCustomer,
}: {
  open: boolean;
  setOpen: (loading: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
  setMessage: (message: string) => void;
  currentCustomer: ICustomer;
}) {
  const [body, setBody] = useState<ICustomerDTO>({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  useEffect(() => {
    setBody({
      name: currentCustomer.name,
      email: currentCustomer.email,
      password: currentCustomer.password,
      phoneNumber: currentCustomer.phoneNumber,
    });
    // eslint-disable-next-line
  }, [open]);
  async function updateCustomerFunc(id: number, body: ICustomerDTO) {
    await updateCustomer(id, body)
      .then((res: any) => {
        setLoading(false);
        setError(true);
        setMessage("Customer successfully edited");
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        setMessage("Something went wrong");
      });
  }
  const handleUpdate = (id: number, body: ICustomerDTO) => {
    setOpen(false);
    setLoading(true);
    updateCustomerFunc(id, body);
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
          value={body.email}
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          onChange={(freq) => {
            setBody({ ...body, email: freq.target.value });
          }}
        />
        <TextField
          value={body.password}
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          onChange={(freq) => {
            setBody({ ...body, password: freq.target.value });
          }}
        />
        <TextField
          value={body.phoneNumber}
          margin="dense"
          id="phone"
          label="Phone Number"
          type="text"
          fullWidth
          onChange={(freq) => {
            setBody({ ...body, phoneNumber: freq.target.value });
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => handleUpdate(currentCustomer.id, body)}
          color="primary"
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
