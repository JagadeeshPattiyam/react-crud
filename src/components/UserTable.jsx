import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';


export default function UserTable({ usersList, onDelete, onEdit }) {

    return (
    <>
    <Paper sx={{  bgcolor: "transparent", width: '100%', overflow: 'hidden' }}>
    <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow> 
                <TableCell sx={{ bgcolor: "#0d121c" }}>Name</TableCell>
                <TableCell sx={{ bgcolor: "#0d121c" }}>Email</TableCell>
                <TableCell sx={{ bgcolor: "#0d121c" }} align="right">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {usersList.map((row) => (
                <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell align="right">
                    <IconButton color="primary" onClick={() => onEdit(row.id)} aria-label="edit">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onDelete(row.id)} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    </Paper>
    </>
    )
}