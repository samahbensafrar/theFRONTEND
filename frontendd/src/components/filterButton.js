import React from "react";

const FilterButton = ({ onFilter }) => {
return <div className="filter-button">
 <button onClick={onFilter}>Filter</button>
    </div>
};

export default FilterButton;
