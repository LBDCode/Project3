import React from "react";
import Navbar from "../components/Navbar/index";
import Searchbar from "../components/Searchbar/index";

class Recipedia extends React.Component {
  state = {
    recipes: []
  };

  render() {
    return (
      <>
        <Navbar />
        <Searchbar />
      </>
    );
  }
}

export default Recipedia;
