import React from "react";
import Navbar from "../components/Navbar/index";
import Title from "../components/Title";
import API from "../utils/API";

class TitlePage extends React.Component {
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
        <Title />
      </>
    );
  }
}

export default TitlePage;