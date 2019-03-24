import React, { Component } from "react";
import API from "../utils/API";
//import WeeklyTable from "../components/Weeklytable";
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
    console.log(this.state);
  }
  render() {
    console.log(this.state);
    return (
      <>
        <h1>Prep info for a week</h1>
        {/* <WeeklyTable
          favorites={this.state.favorites}
          monday={this.state.monday}
          tuesday={this.state.tuesday}
          wednesday={this.state.wednesday}
          thursday={this.state.thursday}
          friday={this.state.friday}
          saturday={this.state.saturday}
          sunday={this.state.sunday}
          getData={this.getAll.bind(this)}
        /> */}
      </>
    );
  }
}

export default Dashboard;
