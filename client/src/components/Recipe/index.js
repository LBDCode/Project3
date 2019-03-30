import React, { Component } from "react";

function Recipe(props) {
  console.log(props);

  return (
    <>
      {props.meal.label ? (
        <>
          <h1>
            Meal:<span>{props.meal.label}</span>
          </h1>
          <img className="img" src={props.meal.image} alt={props.meal.label} />
          <a href={props.meal.url} target="_blank">
            Link to the recipe website
          </a>
          <h5>
            Prep time:<span>{props.meal.time} min</span>
          </h5>
          <h5>
            Calories:<span>{props.meal.calories} cal</span>
          </h5>
          <h5>Nutrition information:</h5>
          <ul>
            <li>
              Fat:<span>{props.meal.digest[0].total} g</span>
            </li>
            <li>
              Carbohydrate:<span>{props.meal.carb} g</span>
            </li>
            <li>
              Protein:<span>{props.meal.protein} g</span>
            </li>
          </ul>
          <h5>Ingredients:</h5>
          <ul>
            {props.meal.ingredients.map((item, i) => {
              return <li key={i}>{item.text}</li>;
              /* Comment */
            })}
          </ul>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default Recipe;
