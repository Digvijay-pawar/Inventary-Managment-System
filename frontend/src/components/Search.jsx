import { useState } from "react";
const Search = ({ onSearch, className }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleInputChange}
      placeholder="Search Products"
      className={`input input-bordered ${className}`}
    />
  );
};

export default Search;
