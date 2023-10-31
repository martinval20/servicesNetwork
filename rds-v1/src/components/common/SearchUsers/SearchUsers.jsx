import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import "./SearchUsers.scss";

export default function SearchUsers({ setIsSearch, setSearchInput }) {
  return (
    <div className="search-users">
      <input
        placeholder="Buscar usuario"
        onChange={(event) => setSearchInput(event.target.value)}
      />
      <AiFillCloseCircle
        className="close-icon"
        size={20}
        onClick={() => {
          setIsSearch(false);
          setSearchInput("");
        }}
      />
    </div>
  );
}
