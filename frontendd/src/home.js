import React, { useState } from "react";
import Table from "./table";
import { useAuth } from "./AuthContext";
import SearchBar from "./components/searchBar";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ImportButton from "./components/importButton";

const Home = () => {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");

    return ( 
        <div>
            <Navbar/>
            <Sidebar/>
            <div className="home-container">
                <h1>List des clients</h1>
                <div className="search-import">
                    <SearchBar onSearch={setSearchTerm} />
                    {user.role === 1 && <ImportButton />}
                </div> 
                <Table searchTerm={searchTerm} />
            </div>
        </div>
    );
};

export default Home;

