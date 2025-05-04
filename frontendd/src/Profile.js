import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./AuthContext";
import "./index.css";
import EditIcon from '@mui/icons-material/Edit';

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

const Profile = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = id
          ? await axios.get(`http://127.0.0.1:8000/api/users/${id}`)
          : await axios.get(`http://127.0.0.1:8000/api/users/by-username/${user.username}`);

        setEmployee({
          ...response.data,
          password: "",
        });
      } catch (error) {
        console.error("Error fetching employee:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id, user.username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: name === "role" ? Number(value) : value
    }));
  };
  const handleSave = async () => {
    try {
      // Validate phone number
      if (!employee.phone_number || employee.phone_number.trim() === "") {
        alert("Le numéro de téléphone ne peut pas être vide.");
        return;
      }
  
      const payload = {
        phone_number: employee.phone_number.trim(),
        role: employee.role,
      };
  
      if (employee.password && employee.password.trim() !== "") {
        payload.password = employee.password;
      }
  
      await axios.patch(`http://127.0.0.1:8000/api/users/${employee.id}/`, payload);
      alert("Informations mises à jour avec succès !");
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      console.log("Server response:", error.response?.data);
      alert("Erreur lors de la mise à jour.");
    }
  };
  
  
  

  const handleCancel = () => {
    setIsEditing(false);

    const fetchEmployee = async () => {
      const response = await axios.get(`http://127.0.0.1:8000/api/users/${employee.id}`);
      setEmployee({
        ...response.data,
        password: "",
      });
    };
    fetchEmployee();
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="profilecontainer">
        <h1 className="profile-title">Profil</h1>
        {employee ? (
          <div className="profile-card">
            <div className="profile-header">
              <div className="avatar">
                <img
                  src="https://www.w3schools.com/w3images/avatar2.png"
                  alt="Avatar"
                  className="avatar-image"
                />
              </div>

              <div className="username">
                <h2>{employee.username}</h2>
                {user.role === 1 && (
                  <EditIcon className="editt" onClick={() => setIsEditing(true)} />
                )}
              </div>
            </div>

            <div className="profile-info">
              {isEditing && user.role === 1 ? (
                <>
                  <div className="info-item">
                    <span className="info-label">Nom</span>
                    <span className="info-value">{employee.username}</span> {/* read-only */}
                  </div>
                  <div className="info-item">
                    <span className="info-label">Numéro de téléphone</span>
                    <input
                      type="text"
                      name="phone_number"
                      className="info-input"
                      value={employee.phone_number || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="info-item">
                    <span className="info-label">Mot de passe</span>
                    <input
                      type="password"
                      name="password"
                      className="info-input"
                      value={employee.password || ""}
                      onChange={handleChange}
                      placeholder="Laisser vide pour ne pas changer"
                    />
                  </div>
                  <div className="info-item">
                    <span className="info-label">Rôle</span>
                    <select
                      name="role"
                      className="info-input"
                      value={employee.role}
                      onChange={handleChange}
                    >
                      {Object.entries(ROLE_LABELS).map(([key, label]) => (
                        <option key={key} value={Number(key)}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="buttons">
                    <button className="save-button" onClick={handleSave}>Sauvegarder</button>
                    <button className="cancel-button" onClick={handleCancel}>Annuler</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="info-item">
                    <span className="info-label">Nom :</span>
                    <span className="info-value">{employee.username}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Numéro de téléphone :</span>
                    <span className="info-value">{employee.phone_number}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Rôle :</span>
                    <span className="info-value">{ROLE_LABELS[employee.role] || "Rôle inconnu"}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <h1 className="profile-error">Aucun employé trouvé.</h1>
        )}
      </div>
    </>
  );
};

export default Profile;
