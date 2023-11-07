import React, { useEffect, useState } from "react";

import "./Search.scss";
import SearchIcon from "./images/search.svg";

const Search = ({ value, placeholder="Start typing...", name = "", label = false, callback }) => {
    const [searchString, setSearchString] = useState("")

    useEffect(() => {
        callback && callback(searchString);
    }, [searchString])

    return (
        <div className="input search">
            { label ? (<span for="search">{ label }</span>) : <></> }
            <input type="text" className="search-input" name="search" value={searchString} onChange={(e) => setSearchString(e.target.value)} placeholder={ placeholder } />
            <img className="search-icon" src={SearchIcon} width="20" alt="search" />
        </div>
    );
}

export default Search;
