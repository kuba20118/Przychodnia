import React, { useState, FormEvent } from "react";
import { FormGroup, Button, FormControl } from "react-bootstrap";

type SearchPropsT = {
  onSearch: () => void;
};

const Search: React.FC<SearchPropsT> = (props) => {
  const [searchVal, setSearchVal] = useState("");

  const setSearchInput = (e: FormEvent<FormControl & HTMLInputElement>) => {
    e.preventDefault();
    setSearchVal(e.currentTarget.value);
  };

  const search = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSearch();
  };

  return (
    <form className="search-default" onSubmit={search}>
      <FormGroup>
        <FormControl
          type="text"
          value={searchVal}
          placeholder="Szukaj pracowników..."
          onChange={setSearchInput}
        />
      </FormGroup>
    </form>
  );
};

export default Search;
