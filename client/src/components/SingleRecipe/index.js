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
      <Paper elevation={1} className="dashboardRecepe">
        {this.props.meal.label ? (
          <div>
            <div className="bg-header">
              <img
                className="card-img"
                src={this.props.meal.image}
                alt={this.props.meal.label}
              />
              <h1>
                <a href={this.props.meal.url} target="_blank">
                  <i class="fas fa-external-link-square-alt" />{" "}
                  <span>Meal: {this.props.meal.label}</span>
                </a>
              </h1>
            </div>
            <div className="bodyCard">
              <div>
                <h5>
                  <i class="fas fa-utensils" />
                  Calories:
                  <p className="bold">
                    {" "}
                    {Math.round(this.props.meal.calories)} cal
                  </p>
                </h5>
              </div>
              <div>
                <h5>
                  {" "}
                  <i class="fas fa-info-bold" />
                  Nutrition information:
                </h5>
                <ul>
                  <li>
                    Fat:
                    <span className="bold">
                      {Math.round(this.props.meal.fat)} g
                    </span>
                  </li>
                  <li>
                    Carbohydrate:
                    <span className="bold">
                      {Math.round(this.props.meal.carb)} g
                    </span>
                  </li>
                  <li>
                    Protein:
                    <span className="bold">
                      {Math.round(this.props.meal.protein)} g
                    </span>
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
                        <i class="fas fa-chevron-right" />
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <h5>
                  <i class="far fa-clock" />
                  Prep time:
                  <span className="bold"> {this.props.meal.time} min</span>
                </h5>
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
