import React, {
  useState,
  FormEvent,
  useEffect,
  createRef,
  RefObject,
  ChangeEvent
} from "react";
import { FormGroup, FormControl, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { UserT } from "../state/ducks/user/types";

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
  users: UserT[];
};

const UsersSearch: React.FC<SearchPropsT> = ({ onSearch, users }) => {
  const dispatch = useDispatch();

  const [searchVal, setSearchVal] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<UserT[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserT | undefined>();

  const debouncedSearchVal = useDebounce(searchVal, 500);

  const searchUsers = async (value: string): Promise<UserT[]> => {
    const searchedVal = value.toLowerCase();
    return new Promise((res, rej) => {
      const filteredRes: UserT[] = users.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();

        return fullName.indexOf(searchedVal) !== -1;
      });
      res(filteredRes);
    });
  };

  let prevent = true;

  // Handle searching with debounce effect
  useEffect(() => {
    if (debouncedSearchVal && prevent) {
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

    const selectedUserId = e.currentTarget.value;
    const selUser = filteredUsers.find((user) => user.id === selectedUserId);

    if (selUser) {
      setSelectedUser(selUser);
      setSearchVal("");
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
              value={user.id}
            >{`${user.firstName} ${user.lastName}`}</li>
          ))}
        </div>
      </FormGroup>
    </form>
  );
};

export default UsersSearch;
