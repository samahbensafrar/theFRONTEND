import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";

const ROLE_LABELS = {
  1: "Admin",
  2: "Responsable de Boufarik",
  3: "Responsable de Mouzaia",
  4: "Responsable de Larbaa",
  5: "Responsable de Oulad Yaich",
  6: "Responsable de El Wouroud",
  7: "Responsable de Bougara",
  8: "Responsable de Afroun"
};

const Tableemployees = ({ employees = [], onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/profile/${id}`);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Num tel</th>
            <th>Role</th>
            <th className="action">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.username}</td>
                <td>{employee.phone_number}</td>
                <td>{ROLE_LABELS[employee.role] || "Rôle inconnu"}</td>
                <td>
                  <div className="editingIcons">
                    <IconButton className="edit-icon-first" onClick={() => onDelete(employee)}>
                      <DeleteIcon sx={{ color: "#233e83" }} />
                    </IconButton>

                    <IconButton className="edit-icon" onClick={() => handleEdit(employee.id)}>
                      <PersonIcon sx={{ color: "#233e83" }} />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", color: "red" }}>
                Aucun employé trouvé
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tableemployees;
