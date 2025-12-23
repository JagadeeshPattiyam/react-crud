import { useState, useImperativeHandle } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog( { onAddUser, onUpdateUser, ref } ) {
  const [open, setOpen] = useState(false);
  const [editAction, seteditAction] = useState(false);

const [formData, setFormData] = useState({
  id: null,
  name: "",
  email: "",
});

const updateFormFields = (user) => {
  setFormData({
    id: user.id,          
    name: user.name || "",
    email: user.email || "",
  });
};

const resetForm = () => {
  setFormData({
    id: null,
    name: "",
    email: "",
  });
};

   const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
    seteditAction(false);
  };


 useImperativeHandle(ref, () => ({
  /// parent trigger this method to edit and open the dialog
    openForEdit(user) {
      setOpen(true);
      seteditAction(true);
      updateFormFields(user);
    }
  }));

  const handleUserAdd = (name, email) => {
    const newItem = {
      id: Date.now(),
      name: name,
      email: email
    };
    const user = newItem;
    if (onAddUser) {
      onAddUser(user);
    }
  };
  const handleUserUpdate = (name, email) => {
    const newItem = {
      id: formData.id,
      name: name,
      email: email
    };
    const user = newItem;
    if (onUpdateUser) {
      onUpdateUser(user);
    }
  };
const handleSubmit = (event) => {
  event.preventDefault();

  if (formData.id) {
    //// Update Existing User
    handleUserUpdate(formData.name, formData.email);
  } else {
    //// Add New User
    handleUserAdd(formData.name, formData.email);
  }

  handleClose();
};
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   const formJson = Object.fromEntries(formData.entries());
  //   const email = formJson.email;
  //   const name = formJson.name;
  //   handleUserAdd(name, email);
  //   handleClose();
  // };
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
       + Add User
      </Button>
      <Dialog open={open}>
        <DialogTitle> {editAction ? "Edit User" : "Add User"} </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
              <TextField
              autoFocus
              required
              margin="dense"
              value={formData.name}
              onChange={handleChange}
              id="name"
              name="name"
              label="User Name"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="email"
              value={formData.email}
              onChange={handleChange}
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
