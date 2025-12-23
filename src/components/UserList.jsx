import { useState, useEffect, useRef } from "react";
import { getUsers } from "../services/user-services";
import UserTable from "./UserTable";
import TextField from '@mui/material/TextField';
import UserForm from "./UserForm";
import Snackbar from '@mui/material/Snackbar';

export default function UserList() {

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  //const [editingUser, setEditingUser] = useState(null);
  //const [editAction, seteditAction] = useState(false);
 const [snackOpen, setSnackOpen] = useState(false);
 const [snackMsg, setSnackMsg] = useState("");

  const snackClose = () => {
    setSnackOpen(false);
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setSnackMsg("Removed user successfully");
    setSnackOpen(true);
  };

  const addUserList = (user) => {
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setSnackMsg("Added user successfully");
    setSnackOpen(true);
  };

  const addUpdateList = (user) => {
    /// Update user in the list
    const updatedUsers = users.map(res =>
      res.id === user.id ? { ...user } : res
    );
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setSnackMsg("Updated user successfully");
    setSnackOpen(true);
  };

  const userFormRef = useRef();

  const handleEdit = (id) => {
    console.log("Edit user with id:", id);
    const userToEdit = users.find(user => user.id === id);
    //setEditingUser(userToEdit);
    userFormRef.current.openForEdit(userToEdit);
    //seteditAction(true);
  };

  const handleSearch = (query) => {
    if (!query || query.trim() === "") {
    setFilteredUsers(users);
    return;
  }

    const filteredList = users.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredUsers(filteredList);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <div className="serach-section">
      <h2>User List</h2>
      <TextField id="standard-basic" label="Search users..." variant="standard" onChange={(e) => handleSearch(e.target.value)} />
      <UserForm onAddUser={addUserList} onUpdateUser={addUpdateList} ref={userFormRef} />
      </div>
      {loading ? (
        <p>Loading users...</p>
      ) : filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <UserTable
          usersList={filteredUsers}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}

        <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal:'center' }}
        open={snackOpen}
        onClose={snackClose}
        message={snackMsg}
        key={'top' + 'center'}
        />
    </div>
  );
}