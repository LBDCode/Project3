// import React from "react";

// function NoMatch() {
//   return (
//         <>
//             <h1>404 Page Not Found</h1>
//             <h1>
//               <span role="img" aria-label="Face With Rolling Eyes Emoji">
//                 🙄
//               </span>
//             </h1>

//         </>
//   );
// }

// export default NoMatch;

import React, { Component } from "react";
import API from "../utils/API";
// import { Link } from "react-router-dom";
// import { Container } from "../components/Grid";
import { List, CardItem } from "../components/List";
// import Jumbotron from "../components/Jumbotron";
// import { Input, FormBtn } from "../components/Form";

class NoMatch extends Component {
  state = {
    results: [],
    search: ""
  };

  searchBooks = event => {
    event.preventDefault();
    API.searchRecipes(this.state.search)
      .then(res => {
        console.log(res.data.hits);
        this.setState({ results: res.data.hits });
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  testURI = uri => {
    let id = uri.split("_");
    id = id[1] + " ";
    API.getSingleRecipe(id)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="container">
        <h1>Recipe Search</h1>

        <form className="form-inline">
          <input
            value={this.state.search}
            onChange={this.handleInputChange}
            name="search"
            placeholder="Search"
          />
          <button disabled={!this.state.search} onClick={this.searchBooks}>
            Search
          </button>
        </form>

        <div>
          {this.state.results.length ? (
            <List>
              {this.state.results.map(result => (
                <div>
                  <CardItem
                    key={result.recipe.uri}
                    // uri={result.recipe.uri}
                    link={result.recipe.shareAs}
                    image={
                      !result.recipe.image
                        ? this.defaultImg
                        : result.recipe.image
                    }
                    title={result.recipe.label}
                    ingredients={result.recipe.ingredientLines}
                  />
                  <button
                    data-uri={result.recipe.uri}
                    onClick={() => this.testURI(result.recipe.uri)}
                  >
                    Test URI
                  </button>
                </div>
              ))}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </div>
      </div>
    );
  }
}

export default NoMatch;
