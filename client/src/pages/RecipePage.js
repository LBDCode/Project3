import React from "react";
import Navbar from "../components/Navbar/index";
import Recipe from "../components/Recipe/index.js";
import API from "../utils/API";

class RecipePage extends React.Component {
  state = {
    meal: null
  };

  componentDidMount() {
    var id = this.props.match.params.id;
    API.getSingleRecipe(id).then(res => {
      console.log(res);
      this.setState({ meal: res.data[0] });
    });
  }

  render() {
    return (
      <>
        <Navbar />
        <h1>Recipe Page</h1>
        {this.state.meal && <Recipe meal={this.state.meal} />}
      </>
    );
  }
}

export default RecipePage;
