import React, { Component } from "react";
import Navbar from "../components/Navbar/index";
import Searchbar from "../components/Searchbar/index";

class Search extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Searchbar />
      </>
    );
  }
}

export default Search;
