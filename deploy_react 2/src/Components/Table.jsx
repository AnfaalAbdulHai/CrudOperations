import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Tables({ data, setData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (row) => {
    setIsEditing(true);
    setEditRow(row.id);
    setFormData({
      name: row.name,
      email: row.email,
      username: row.username,
      phone: row.phone,
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/users/${editRow}`, formData);
      setData((prevData) =>
        prevData.map((item) =>
          item.id === editRow ? { ...item, ...formData } : item
        )
      );
      setIsEditing(false);
      setEditRow(null);
      setFormData({
        name: "",
        email: "",
        username: "",
        phone: "",
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      {isEditing && (
        <form onSubmit={handleFormSubmit} style={{ marginBottom: "20px" }}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            margin="normal"
            required
          />
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleFormChange}
            margin="normal"
            required
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleFormChange}
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setIsEditing(false);
              setEditRow(null);
            }}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </Button>
        </form>
      )}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Username</StyledTableCell>
              <StyledTableCell align="right">Phone</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((e) => (
              <StyledTableRow key={e.id}>
                <StyledTableCell component="th" scope="row">
                  {e.name}
                </StyledTableCell>
                <StyledTableCell align="right">{e.email}</StyledTableCell>
                <StyledTableCell align="right">{e.username}</StyledTableCell>
                <StyledTableCell align="right">{e.phone}</StyledTableCell>
                <StyledTableCell align="right">
                  <DeleteIcon
                    sx={{ paddingRight: 3, color: "red", cursor: "pointer" }}
                    onClick={() => handleDelete(e.id)}
                  />
                  <EditIcon
                    sx={{ color: "blue", cursor: "pointer" }}
                    onClick={() => handleEdit(e)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
