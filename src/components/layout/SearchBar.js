import React, { Fragment, useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";

import "./SearchBar.css";

const SearchBar = () => {
  const [search, setSearch] = useState(false);
  const [formData, setFormData] = useState("");

  useEffect(() => {
    search && window.location.reload();
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (formData !== "" && formData !== undefined) {
      console.log(formData);
      setSearch(true);
    }
  };

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  return (
    <Fragment>
      <h1 className="title">
        <Link className="title-link" to="/">
          <i className="fas fa-book-open"></i> Book<span>Finder</span>
        </Link>
      </h1>

      <form onSubmit={(e) => handleSearch(e)}>
        <input
          className="search-input"
          type="text"
          placeholder="Search by title, author, published date, picture, etc"
          value={formData}
          onChange={(e) => handleChange(e)}
        />
        <button className="btn submit" type="submit">
          Submit
        </button>
      </form>
      {search && <Redirect to={{ pathname: "/search", state: { formData } }} />}
    </Fragment>
  );
};

export default SearchBar;
