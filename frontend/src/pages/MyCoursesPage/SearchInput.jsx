import React, { useRef } from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = ({ onSearch }) => {
  const ref = useRef(null);

  return (
    <form
      onChange={(event) => {
        event.preventDefault();
        if (ref.current) onSearch(ref.current.value);
      }}
    >
      <div className="container  mt-5 px-5">
        <div
          className="form-outline bg-white rounded d-flex p-1"
          data-mdb-input-init
        >
          <input
            type="search"
            id="form1"
            className="form-control border-0"
            placeholder="Search"
            aria-label="Search"
            ref={ref}
          />
          <button
            id="search-button"
            type="button"
            className="btn border-start shadow-none px-4 rounded-0 "
          >
            <FaSearch />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchInput;
