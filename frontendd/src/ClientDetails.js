import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./index.css";

const ClientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [etat, setEtat] = useState("Non Traité");
  const [total_amount, setTotal_amount] = useState("");
  const [observation, setObservation] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/clients/${id}/`)
      .then((response) => {
        setClient(response.data);
        setEtat(response.data.etat);
        setTotal_amount(response.data.total_amount);
        setObservation(response.data.observation);  // Load observation from the server
      })
      .catch((error) => {
        console.error("Error fetching client data:", error);
      });
  
    axios.get(`http://127.0.0.1:8000/api/clients/${id}/history/`)
      .then((response) => {
        setHistory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching client history:", error);
      });
  }, [id]);
  

  const handleSave = () => {
    const updatedClient = {
      client_id: client.client_id,
      name: client.name,
      surname: client.surname,
      phone_number: client.phone_number,
      client_type: client.client_type,
      region: client.region,
      address: client.address,
      total_amount: parseFloat(total_amount),
      employee: client.employee,
      observation: observation,  // Ensure this is part of the request body
    };
  
    // Only include etat if it's different from the current one
    if (etat !== client.etat) {
      updatedClient.etat = etat;
    }
  
    axios.put(`http://127.0.0.1:8000/api/clients/${id}/`, updatedClient)
      .then((response) => {
        console.log("Saved Client Details:", response.data);
        
        // Refresh client data after save and ensure observation is loaded
        axios.get(`http://127.0.0.1:8000/api/clients/${id}/`)
          .then((response) => {
            setClient(response.data);
            setEtat(response.data.etat);
            setTotal_amount(response.data.total_amount);
            setObservation(response.data.observation);  // Make sure observation is updated
          });
  
        // Refresh history after save
        axios.get(`http://127.0.0.1:8000/api/clients/${id}/history/`)
          .then((response) => {
            setHistory(response.data);
          });
  
        alert("Changes saved!");
      })
      .catch((error) => {
        console.error("Error saving client:", error);
        if (error.response) {
          console.error("Server response:", error.response.data);
        }
      });
  };
  
  

  const handleCancel = () => {
    navigate(-1); 
  };

  const handlePrint = () => {
    window.open(`http://127.0.0.1:8000/generate-pdf/${id}/`, '_blank');
  };

  if (!client) {
    return <p>Loading client data...</p>;
  }

  return (
    <div>
      <Navbar />
      <Sidebar />
      <h1 className="title">Client Details</h1>
      <div className="big-container">
        <div className="container">
          <div className="row">
            <div className="form-group">
              <label htmlFor="name">Nom:</label>
              <input type="text" id="name" value={client.name} readOnly className="readonly-input" />
            </div>
            <div className="form-group">
              <label htmlFor="id">ID:</label>
              <input type="text" id="id" value={client.client_id} readOnly className="readonly-input" />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label htmlFor="surname">Prénom:</label>
              <input type="text" id="surname" value={client.surname} readOnly className="readonly-input" />
            </div>
            <div className="form-group">
              <label htmlFor="address">Adresse:</label>
              <input type="text" id="address" value={client.address} readOnly className="readonly-input" />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label htmlFor="region">Région:</label>
              <input type="text" id="region" value={client.region} readOnly className="readonly-input" />
            </div>
            <div className="form-group">
              <label htmlFor="phone_number">Num Tel:</label>
              <input type="text" id="phone_number" value={client.phone_number} readOnly className="readonly-input" />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label htmlFor="client_type">Type:</label>
              <input type="text" id="client_type" value={client.client_type} readOnly className="readonly-input" />
            </div>
            <div className="form-group">
              <label htmlFor="total_amount">Total:</label>
              <input type="text" id="total_amount" value={total_amount} onChange={(e) => setTotal_amount(e.target.value)} />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label htmlFor="etat">État:</label>
              <select id="etat" value={etat} onChange={(e) => setEtat(e.target.value)}>
                <option value="Payment Réglé">Payment Réglé</option>
                <option value="Non Traité">Non Traité</option>
                <option value="Paiement en cours">Paiement en cours</option>
                <option value="Avocat">Avocat</option>
                <option value="Huissier">Huissier</option>
                <option value="Juridique">Juridique</option>
                <option value="Décédé">Décédé</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="observation">Observation:</label>
              <textarea
                id="observation"
                cols="50"
                rows="4"
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
              ></textarea>
            </div>
          </div>

          <button
            className="imprimer-btn"
            onClick={handlePrint}
            disabled={!["Juridique"].includes(etat)}
          >
            Imprimer
          </button>

          <div className="buttons">
            <button className="save-btn" onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={handleCancel}>Annuler</button>
          </div>
        </div>

        <div className="historique">
          <h2 className="historique-title">Historique:</h2>
          <ul className="historique-list">
            {history.map((item, index) => (
              <li key={index}>
                <strong>{item.date}</strong> : {item.previous_etat} ➔ {item.new_etat}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default ClientDetails;




