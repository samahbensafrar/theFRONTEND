import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { IconButton } from "@mui/material";
import axios from "axios";
import { useAuth } from "./AuthContext";  

const ROLE_TO_REGION = {
  1: null, 
  2: "Boufarik",
  3: "Mouzaia",
  4: "Larbaa",
  5: "OuladYaich",
  6: "ElWouroud",
  7: "Bougara",
  8: "Afroun",
};

const Table = ({ searchTerm }) => {
    const navigate = useNavigate();
    const { user } = useAuth();  
    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);

    const normalize = (str) =>
        str?.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/clients/")
            .then(response => {
                setClients(response.data);
            })
            .catch(error => console.error("Error fetching clients:", error));
    }, []);

    useEffect(() => {
        const region = ROLE_TO_REGION[user.role];
        const regionFiltered = region
            ? clients.filter(client => client.region === region)
            : clients;

        const searchFiltered = regionFiltered.filter(client =>
            normalize(client.name).includes(normalize(searchTerm)) ||
            normalize(client.etat).includes(normalize(searchTerm)) ||
            normalize(client.client_type).includes(normalize(searchTerm))
        );

        setFilteredClients(searchFiltered);
    }, [clients, user.role, searchTerm]);

    const getEtatStyle = (etat) => {
        const cleanEtat = normalize(etat);
        switch (cleanEtat) {
            case "non traite":
            case "non traité":
                return { color: "red" };
            case "payment regle":
            case "payment réglé":
                return { color: "#4caf50" };
            default:
                return { color: "#0A2364" };
        }
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Num Tel</th>
                    <th>État</th>
                    <th>Type</th>
                    <th>Région</th>
                    <th>Plus</th>
                </tr>
            </thead>
            <tbody>
                {filteredClients.length > 0 ? filteredClients.map(client => (
                    <tr key={client.id}>
                        <td>{client.client_id}</td>
                        <td>{client.name}</td>
                        <td>{client.surname}</td>
                        <td>{client.phone_number}</td>
                        <td style={getEtatStyle(client.etat)}>{client.etat}</td>
                        <td>{client.client_type}</td>
                        <td>{client.region}</td>
                        <td>
                            <IconButton onClick={() => navigate(`/client/${client.id}`)} style={{ padding: "5px 10px", cursor: "pointer" }}>
                                <EditNoteIcon sx={{ color: "#233e83" }} />
                            </IconButton>
                        </td>
                    </tr>
                )) : (
                    <tr>
                        <td colSpan="8" style={{ textAlign: "center", color: "red" }}>No clients found</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default Table;


