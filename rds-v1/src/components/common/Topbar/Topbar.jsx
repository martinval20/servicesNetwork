import React, { useEffect, useMemo, useState } from "react";
import snLogo from "../../../assets/snLogo.png";
import SearchUsers from "../SearchUsers/SearchUsers";
import {
  AiOutlineHome,
  AiOutlineUserSwitch,
  AiOutlineSearch,
} from "react-icons/ai";
import { BiSolidBriefcaseAlt2 } from "react-icons/bi";
import { TbMessageCircle2 } from "react-icons/tb";
import { BsBell } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ProfilePopup from "../ProfilePopup/ProfilePopup";
import { getAllUsers } from "../../../api/FirestoreAPI";
import "./Topbar.scss";

export default function Topbar({ currentUser }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  let navigate = useNavigate();
  const goToRoute = (route) => {
    navigate(route);
  };

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };
  const openUser = (user) => {
    navigate("/profile", {
      state: {
        id: user.id,
        email: user.email,
      },
    });
  };
  const handleSearch = () => {
    if (searchInput !== "") {
      let searched = users.filter((user) => {
        return Object.values(user)
          .join(" ")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });

      setFilteredUsers(searched);
    } else {
      setFilteredUsers(users);
    }
  };

  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(debounced);
  }, [searchInput]);

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  return (
    <div className="topbar-main">
      {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      ) : (
        <></>
      )}

      <img className="snLogo" src={snLogo} alt="snLogo" />
      {isSearch ? (
        <SearchUsers
          setIsSearch={setIsSearch}
          setSearchInput={setSearchInput}
        />
      ) : (
        <div className="react-icons">
          <AiOutlineSearch
            size={30}
            className="react-icon"
            onClick={() => setIsSearch(true)}
          />
          <AiOutlineHome
            size={30}
            className="react-icon"
            onClick={() => goToRoute("/home")}
          />
          <AiOutlineUserSwitch
            size={30}
            className="react-icon"
            onClick={() =>
              navigate("/profile", {
                state: {
                  id: currentUser?.id,
                },
              })
            }
          />
          <BiSolidBriefcaseAlt2
            size={30}
            className="react-icon"
            onClick={() => goToRoute("/contacts")}
          />
          <TbMessageCircle2
            size={30}
            className="react-icon"
            onClick={() => goToRoute("/chats")}
          />
          <BsBell size={30} className="react-icon" />
        </div>
      )}
      <img
        className="user-icon"
        src={currentUser?.imageLink}
        alt="user"
        onClick={displayPopup}
      />
      {searchInput.length === 0 ? (
        <></>
      ) : (
        <div className="search-results" >
          {filteredUsers.length === 0 ? (
            <div className="search-inner">No se hallaron resultados ... </div>
          ) : (
            filteredUsers.map((user) => (
              <div className="search-inner" onClick={() => openUser(user)} key={user.id}>
                <img src={user.imageLink} />
                <p className="name">
                  {user.name} {user.lastname}
                </p>
                <p className="labores">{user.labores}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
