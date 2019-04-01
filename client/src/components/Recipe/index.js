import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import "./style.css";

function Recipe(props) {
  console.log(props);

  return (
    <>
      {props.meal.label ? (
        <>
          <Paper>
            <header />
            <h1>
              Meal:<span>{props.meal.label}</span>
            </h1>
            <img
              className="img"
              src={props.meal.image}
              alt={props.meal.label}
            />
            <a href={props.meal.url} target="_blank">
              Link to the recipe website
            </a>
            <h5>
              Prep time:<span>{props.meal.time} min</span>
            </h5>
            <h5>
              Calories:
              <span>{parseFloat(props.meal.calories).toFixed(0)} cal</span>
            </h5>
            <h5>Nutrition information:</h5>
            <ul>
              <li>
                Fat:
                <span>
                  {parseFloat(props.meal.digest[0].total).toFixed(0)} g
                </span>
              </li>
              <li>
                Carbohydrate:
                <span>
                  {parseFloat(props.meal.digest[1].total).toFixed(0)} g
                </span>
              </li>
              <li>
                Protein:
                <span>
                  {parseFloat(props.meal.digest[2].total).toFixed(0)} g
                </span>
              </li>
            </ul>
            <h5>Ingredients:</h5>
            <ul>
              {props.meal.ingredients.map((item, i) => {
                return <li key={i}>{item.text}</li>;
              })}
            </ul>
          </Paper>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default Recipe;
