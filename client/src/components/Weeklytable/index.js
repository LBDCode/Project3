import React, { Component } from "react";
import "./style.css";

class WeeklyTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.weekDays = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday"
    ];
    this.meals = ["breakfast", "lunch", "dinner"];
  }

  onDragEnd(event) {
    let data = event.dataTransfer.getData("item_id");
    let from = event.dataTransfer.getData("from");
    let day = event.dataTransfer.getData("day");
    let meal = event.dataTransfer.getData("meal");
    let dayTo = event.target.dataset.day;
    let mealTo = event.target.dataset.meal;
    let to = event.target.dataset.to;
    // console.log(data);
    // console.log(from);
    // console.log(day);
    // console.log(meal);
    // console.log(dayTo);
    // console.log(mealTo);
    if (from === "favorites") {
      let item = this.props.favorites.find(item => item.uri === data);
      this.props.updateState(null, "favorites", item, to, dayTo, mealTo);
    } else {
      this.props.updateState(
        day,
        meal,
        this.props[day][meal],
        to,
        dayTo,
        mealTo
      );
    }
  }
  allowDrop(event) {
    event.preventDefault();
  }
  drag(event) {
    event.dataTransfer.setData("item_id", event.target.id);
    event.dataTransfer.setData("from", event.target.dataset.from);
    event.dataTransfer.setData("day", event.target.dataset.day);
    event.dataTransfer.setData("meal", event.target.dataset.meal);
  }
  render() {
    return (
      <>
        <h3>Favorites:</h3>
        <div
          className="favoirites"
          onDrop={this.onDragEnd.bind(this)}
          onDragOver={this.allowDrop}
          data-to="favorites"
        >
          {this.props.favorites.map(item => (
            <span
              onClick={() => this.props.clickedMeal(item)}
              className="drag-drop"
              id={item.uri}
              key={item.uri}
              draggable="true"
              onDragStart={this.drag}
              data-from="favorites"
            >
              {item.label}{" "}
            </span>
          ))}
        </div>

        <br />

        <table>
          <tr>
            <th />
            <th>Monday</th>
            <th>Tuesday</th>
            <th>wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Sunday</th>
          </tr>
          {this.meals.map(meal => (
            <tr>
              <td>{meal}</td>
              {this.weekDays.map(day => (
                <td
                  onDrop={this.onDragEnd.bind(this)}
                  onDragOver={this.allowDrop}
                  data-day={day}
                  data-meal={meal}
                >
                  {this.props[day] && this.props[day][meal] ? (
                    <span
                      onClick={() =>
                        this.props.clickedMeal(this.props[day][meal])
                      }
                      className="drag-drop"
                      id={this.props[day][meal].uri}
                      draggable="true"
                      onDragStart={this.drag}
                      data-day={day}
                      data-meal={meal}
                    >
                      {this.props[day][meal].label}
                    </span>
                  ) : (
                    ""
                  )}
                </td>
              ))}
            </tr>
          ))}
        </table>
      </>
    );
  }
}
export default WeeklyTable;
