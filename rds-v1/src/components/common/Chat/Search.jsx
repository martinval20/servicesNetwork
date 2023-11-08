import React from "react";

const Search = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Buscar contacto" />
      </div>
      <div className="userChat">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYEfJo6j7axefgRh1oPdPgcwOBc8PeIw8LHR6QXMlosA&s"
          alt=""
        />
        <div className="userChatInfo">
          <span>Martin</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
