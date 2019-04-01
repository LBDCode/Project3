import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import "./style.css";

class SingleRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Paper elevation={1} className="dashboardRecepie">
        {this.props.meal.label ? (
          <div>
            <div className="bg-header">
              <img
                className="card-img"
                src={this.props.meal.image}
                alt={this.props.meal.label}
              />
              <h1>
                Meal: <span>{this.props.meal.label}</span>
              </h1>
              <h3>
                <i class="far fa-clock" />
                Prep time:
                <span> {this.props.meal.time} min</span>
              </h3>
              <a href={this.props.meal.url} target="_blank">
                <i class="fas fa-external-link-alt" /> More details about the
                recepie
              </a>
            </div>
            <div className="body-card">
              <div>
                <h5>
                  <i class="fas fa-utensils" />
                  Calories:
                  <p className="circle"> {this.props.meal.calories} cal</p>
                </h5>
              </div>
              <div>
                <h5>
                  {" "}
                  <i class="fab fa-nutritionix" />
                  Nutrition information:
                </h5>
                <ul>
                  <li>
                    Fat:
                    <span className="circle">{this.props.meal.fat} g</span>
                  </li>
                  <li>
                    Carbohydrate:
                    <span className="circle">{this.props.meal.carb} g</span>
                  </li>
                  <li>
                    Protein:
                    <span className="circle">{this.props.meal.protein} g</span>
                  </li>
                </ul>
              </div>
              <div>
                <h5>
                  <i class="far fa-list-alt" />
                  Ingredients:
                </h5>
                <ul>
                  {this.props.meal.ingredients.map((item, i) => {
                    return (
                      <li key={i}>
                        <i class="far fa-dot-circle" />
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </Paper>
    );
  }
}
export default SingleRecipe;
