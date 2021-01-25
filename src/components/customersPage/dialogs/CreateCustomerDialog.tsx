import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

import { addCustomer } from "../../../services/CustomersService";
import { ICustomerDTO } from "../../../models/interfaces";

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
  const [body, setBody] = useState<ICustomerDTO>({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [disabled, setDisabled] = useState<boolean>(true);
  async function createCustomer(body: ICustomerDTO) {
    await addCustomer(body)
      .then((res: any) => {
        setLoading(false);
        setError(true);
        setMessage("Customer successfully created");
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        setMessage("Something went wrong");
      });
  }

  const handleCreate = (body: ICustomerDTO) => {
    setOpen(false);
    setLoading(true);
    createCustomer(body);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (
      body.email !== "" &&
      body.name !== "" &&
      body.password !== "" &&
      body.phoneNumber !== ""
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
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          onChange={(freq) => {
            setBody({ ...body, email: freq.target.value });
          }}
        />
        <TextField
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
          onClick={() => handleCreate(body)}
          color="primary"
          disabled={disabled}
          id="create-button"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
