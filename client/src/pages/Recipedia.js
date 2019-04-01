import React, { Component } from "react";
import Navbar from "../components/Navbar/index";
import Searchbar from "../components/Searchbar/index";

class Search extends Component {
  state = {
    triggerPrefUpdate: false
  };

  triggerPrefUpdate = () => {
    this.setState(prevState => {
      return {
        triggerPrefUpdate: !prevState.triggerPrefUpdate
      };
    });
  };

  render() {
    return (
      <>
        <Navbar triggerPrefUpdate={this.triggerPrefUpdate} />
        <Searchbar triggerPrefUpdate={this.state.triggerPrefUpdate} />
      </>
    );
  }
}

export default Search;
