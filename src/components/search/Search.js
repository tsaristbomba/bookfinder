import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Search.css";

import SearchBar from "../layout/SearchBar";
import Spinner from "../layout/Spinner";

const Search = ({
  location: {
    state: { formData },
  },
}) => {
  const [queryData, setData] = useState(null);

  useEffect(() => {
    queryResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const queryResult = async () => {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${formData}`
    );

    setData(res.data.items);
  };

  return (
    <div className="search">
      <div className="bar">
        <SearchBar />
      </div>
      <div className="books">
        {queryData !== null ? (
          queryData !== undefined ? (
            queryData.map((data, k) => (
              <div className="book" key={k}>
                <a
                  className="book-title"
                  href={data.volumeInfo.infoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="book-img"
                    src={
                      data.volumeInfo.imageLinks &&
                      data.volumeInfo.imageLinks.smallThumbnail
                    }
                    alt={`${data.volumeInfo.title} cover`}
                  />
                  <h3>{data.volumeInfo.title}</h3>
                </a>
                {data.volumeInfo.authors && (
                  <p>{data.volumeInfo.authors.join(", ")}</p>
                )}
                {data.volumeInfo.categories && (
                  <p>Category: {data.volumeInfo.categories.join(", ")}</p>
                )}
                {data.volumeInfo.averageRating && (
                  <p>Rating: {data.volumeInfo.averageRating}</p>
                )}
                <p>Publishing date: {data.volumeInfo.publishedDate}</p>
              </div>
            ))
          ) : (
            <h3>No books found</h3>
          )
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Search;
