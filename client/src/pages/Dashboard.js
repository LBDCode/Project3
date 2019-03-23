import React, { Component } from "react";
import API from "../utils/API";
class Dashboard extends Component {
  state = {
    favorites: [],
    monday: {},
    tuesday: {},
    wednesday: {},
    thursday: {},
    friday: {},
    saturday: {},
    sunday: {}
  };

  componentDidMount() {
    this.getAll();
  }

  getAll() {
    API.getDBRecipes()
      .then(res => {
        console.log(res.data);
        this.setState({
          favorites: res.data.favorites,
          monday: res.data.weeklymenu.monday,
          tuesday: res.data.weeklymenu.tuesday,
          wednesday: res.data.weeklymenu.wednesday,
          thursday: res.data.weeklymenu.thursday,
          friday: res.data.weeklymenu.friday,
          saturday: res.data.weeklymenu.saturday,
          sunday: res.data.weeklymenu.sunday
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <>
        <h1>Prep info for a week</h1>
        <h3>Favorites:</h3>
        {this.state.favorites.map(item => (
          <span key={item.uri}>{item.label} </span>
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
              {this.state.monday.breakfast
                ? this.state.monday.breakfast.label
                : ""}
            </td>
            <td>
              {this.state.tuesday.breakfast
                ? this.state.tuesday.breakfast.label
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
              {this.state.monday.lunch ? this.state.monday.lunch.label : ""}
            </td>
            <td>
              {this.state.tuesday.lunch ? this.state.tuesday.lunch.label : ""}
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
              {this.state.monday.dinner ? this.state.monday.dinner.label : ""}
            </td>
            <td>
              {this.state.tuesday.dinner ? this.state.tuesday.dinner.label : ""}
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

export default Dashboard;
