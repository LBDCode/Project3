import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import "./style.css";

function Recipe(props) {
  console.log(props);

  return (
    <Paper elevation={1} className="recipePage">
      {props.meal.label ? (
        <div>
          <div className="header">
            <img
              className="img"
              src={props.meal.image}
              alt={props.meal.label}
            />
            <h1>
              Meal: <span>{props.meal.label}</span>
            </h1>
          </div>
          <div className="body-card">
            <div>
              <h5>
                <i class="fas fa-utensils" />
                Calories:
                <p className="circle">
                  {parseFloat(props.meal.calories).toFixed(0)} cal
                </p>
              </h5>
            </div>
            <div>
              <h5>
                {" "}
                <i class="fas fa-info-circle" />
                Nutrition information:
              </h5>
              <ul>
                <li>
                  Fat:
                  <span className="circle">
                    {parseFloat(props.meal.digest[0].total).toFixed(0)} g
                  </span>
                </li>
                <li>
                  Carbohydrate:
                  <span className="circle">
                    {parseFloat(props.meal.digest[1].total).toFixed(0)} g
                  </span>
                </li>
                <li>
                  Protein:
                  <span className="circle">
                    {parseFloat(props.meal.digest[2].total).toFixed(0)} g
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h5>
                <i class="far fa-clock" />
                Prep time:
                <span> {props.meal.time} min</span>
              </h5>
            </div>
            <div>
              <h5>
                <i class="far fa-list-alt" />
                Ingredients:
              </h5>
              <ul>
                {props.meal.ingredients.map((item, i) => {
                  return (
                    <li key={i}>
                      <i class="far fa-circle" />
                      {item.text}
                    </li>
                  );
                })}
              </ul>
            </div>
            <h5>
              <a href={props.meal.url} target="_blank">
                <i class="fas fa-external-link-alt" />
                Link to the Recipe Website
              </a>
            </h5>
          </div>
        </div>
      ) : (
        ""
      )}
    </Paper>
  );
}

export default Recipe;
