import { useState, useEffect } from "react";
import { Success } from "./components/Success";
import { Users } from "./components/Users";
import BackToPortfolioButton from "../../app/BackToPortfolioButton/BackToPortfolioButton";

import "./index.scss";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetch("https://2b694d80923013f1.mokky.dev/users")
      .then((res) => res.json())
      .then((json) => {
        setUsers(json);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении запроса");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };

  const onClickSendInvites = () => {
    setSuccess(true);
  };

  return (
    <div className='users-page'>
      <div className='back-btn'>
        <BackToPortfolioButton />
      </div>
      <div className='users-app'>
        {success ? (
          <Success count={invites.length} />
        ) : (
          <Users
            onChangeSearchValue={onChangeSearchValue}
            searchValue={searchValue}
            items={users}
            isLoading={isLoading}
            invites={invites}
            onClickInvite={onClickInvite}
            onClickSendInvites={onClickSendInvites}
          />
        )}
      </div>
    </div>
  );
}

export default UsersList;
