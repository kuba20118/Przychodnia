import React, { useState, FormEvent, useEffect } from "react";
import { FormGroup, FormControl } from "react-bootstrap";
import { UserT } from "../state/ducks/user/types";
import { IApplicationState } from "../state/ducks";
import { useSelector } from "react-redux";

const useDebounce = (value: string, delay: number) => {
  const [debouncedVal, setDebouncedVal] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedVal(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedVal;
};

type SearchPropsT = {
  onSearch: (selectedUser: UserT) => void;
};

const UsersSearch: React.FC<SearchPropsT> = ({ onSearch }) => {
  const [searchVal, setSearchVal] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<UserT[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserT | undefined>();

  // USERS
  const users: UserT[] | undefined = useSelector(
    ({ user }: IApplicationState) => user.users
  );

  const debouncedSearchVal = useDebounce(searchVal, 500);

  const searchUsers = async (value: string): Promise<UserT[]> => {
    console.log(users);
    const searchedVal = value.toLowerCase();
    return new Promise((res, rej) => {
      const filteredRes: UserT[] = users!.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();

        return fullName.indexOf(searchedVal) !== -1;
      });
      res(filteredRes);
    });
  };

  // Handle searching with debounce effect
  useEffect(() => {
    if (debouncedSearchVal) {
      searchUsers(debouncedSearchVal).then((result) => {
        setFilteredUsers(result);
      });
    } else {
      setFilteredUsers([]);
    }
  }, [debouncedSearchVal]);

  // Handle setting selected user and passing it to parent
  useEffect(() => {
    if (selectedUser) {
      onSearch(selectedUser);
    }
  }, [selectedUser, onSearch]);

  const handleSearchInput = (e: FormEvent<FormControl & HTMLInputElement>) => {
    e.preventDefault();
    setSearchVal(e.currentTarget.value);
  };

  const handleSelectedUser = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    setSearchVal(e.currentTarget.innerText);

    const selectedUserId = e.currentTarget.value.toString();
    const selUser = filteredUsers.find(
      (user) => user.idUser === selectedUserId
    );

    console.log(filteredUsers);
    console.log(selUser);

    if (selUser) {
      setSelectedUser(selUser);
      setSearchVal("");
      setFilteredUsers([]);
    }
  };

  const canShowList = (): boolean => {
    return filteredUsers.length > 0;
  };

  let showList = canShowList() ? "list-active" : "";

  return (
    <form className="search-default">
      <FormGroup className="position-relative">
        <FormControl
          type="text"
          value={searchVal}
          placeholder="Szukaj pracowników..."
          onChange={handleSearchInput}
        />
        <div className={`list ${showList}`}>
          {filteredUsers.map((user, key) => (
            <li
              key={key}
              onClick={handleSelectedUser}
              value={user.idUser}
            >{`${user.firstName} ${user.lastName}`}</li>
          ))}
        </div>
      </FormGroup>
    </form>
  );
};

export default UsersSearch;
