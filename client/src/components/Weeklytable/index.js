import React from "react";
//import API from "../../utils/API";
import "./style.css";

class WeeklyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <h3>Favorites:</h3>
        {this.props.favorites.map(item => (
          <span
            onClick={() => this.props.clickedMeal(item)}
            className="drag-drop"
            id={item.uri}
            key={item.uri}
          >
            {item.label}{" "}
          </span>
        ))}
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
          <tr>
            <td>Breakfast</td>
            <td>
              {this.props.monday.breakfast ? (
                <span
                  onClick={() =>
                    this.props.clickedMeal(this.props.monday.breakfast)
                  }
                  className="drag-drop"
                  id={this.props.monday.breakfast.uri}
                >
                  {this.props.monday.breakfast.label}
                </span>
              ) : (
                ""
              )}
            </td>
            <td>
              {this.props.tuesday.breakfast ? (
                <span
                  onClick={() =>
                    this.props.clickedMeal(this.props.tuesday.breakfast)
                  }
                  className="drag-drop"
                  id={this.props.tuesday.breakfast.uri}
                >
                  {this.props.tuesday.breakfast.label}
                </span>
              ) : (
                ""
              )}
            </td>
            <td />
            <td />
            <td />
            <td />
            <td />
          </tr>
          <tr>
            <td>Lunch</td>
            <td>
              {this.props.monday.lunch ? (
                <span
                  onClick={() =>
                    this.props.clickedMeal(this.props.monday.lunch)
                  }
                  className="drag-drop"
                  id={this.props.monday.lunch.uri}
                >
                  {this.props.monday.lunch.label}
                </span>
              ) : (
                ""
              )}
            </td>
            <td>
              {this.props.tuesday.lunch ? (
                <span
                  onClick={() =>
                    this.props.clickedMeal(this.props.tuesday.lunch)
                  }
                  className="drag-drop"
                  id={this.props.tuesday.lunch.uri}
                >
                  {this.props.tuesday.lunch.label}
                </span>
              ) : (
                ""
              )}
            </td>
            <td />
            <td />
            <td />
            <td />
            <td />
          </tr>
          <tr>
            <td>Dinner</td>
            <td>
              {this.props.monday.dinner ? (
                <span
                  onClick={() =>
                    this.props.clickedMeal(this.props.monday.dinner)
                  }
                  className="drag-drop"
                  id={this.props.monday.dinner.uri}
                >
                  {this.props.monday.dinner.label}
                </span>
              ) : (
                ""
              )}
            </td>
            <td>
              {this.props.tuesday.dinner ? (
                <span
                  onClick={() =>
                    this.props.clickedMeal(this.props.tuesday.dinner)
                  }
                  className="drag-drop"
                  id={this.props.tuesday.dinner.uri}
                >
                  {this.props.tuesday.dinner.label}
                </span>
              ) : (
                ""
              )}
            </td>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
          </tr>
        </table>
      </>
    );
  }
}
export default WeeklyTable;
