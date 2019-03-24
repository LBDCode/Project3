import React from "react";
//import API from "../../utils/API";

class WeeklyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getData();
    console.log("did mount");
    console.log(this.props);
  }

  render() {
    //console.log(this.props);
    return (
      <>
        <h3>Favorites:</h3>
        {this.props.favorites.map(item => (
          <span id={item.uri} key={item.uri}>
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
              {this.props.monday.breakfast
                ? this.props.monday.breakfast.label
                : ""}
            </td>
            <td>
              {this.props.tuesday.breakfast
                ? this.props.tuesday.breakfast.label
                : ""}
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
              {this.props.monday.lunch ? this.props.monday.lunch.label : ""}
            </td>
            <td>
              {this.props.tuesday.lunch ? this.props.tuesday.lunch.label : ""}
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
              {this.props.monday.dinner ? this.props.monday.dinner.label : ""}
            </td>
            <td>
              {this.props.tuesday.dinner ? this.props.tuesday.dinner.label : ""}
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
