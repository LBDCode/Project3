import React from "react";
import "./style.css";

export function List({ children }) {
  return (
    <div className="list-overflow-container">
      <ul className="list-group list unstyled">{children}</ul>
    </div>
  );
}

export function ListItem({ children }) {
  return <li className="list-group-item">{children}</li>;
}

export function CardItem(props) {
  return (
      <li className="media">
        <img src={props.image} className="mr-3" alt="..."/>
        <div className="media-body">
            <h5 className="mt-0 mb-1">{(!props.title) ? "" : props.title }</h5>
            {(!props.ingredients) ? "Author unknown" : props.ingredients.map(ingredients => (ingredients + " "))}  
            <p>{(!props.description) ? "" : props.description}</p>
        </div>
        <a href={props.link} target="blank"><button>View</button></a>
        
        {/* {(props.saved === "not saved") ? <button onClick={()=>props.saveBook(props)}>Save</button>
        :  <span tabIndex="0"> Already Saved</span>} */}
      </li>
  );
}
