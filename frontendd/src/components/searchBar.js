import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

const SearchBar = ({ onSearch, onFilterClick }) => {
  return (
   
    <TextField
      variant="outlined"
      placeholder="Search..."
      className="search-input"
      onChange={(e) => onSearch(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={onFilterClick}>
              <FilterListIcon  sx={{ color: "#233e83" }}/>
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  

  );
};

export default SearchBar;
