import React, { Component } from "react";
import API from "../utils/API";
import WeeklyTable from "../components/Weeklytable";
import SingleRecipe from "../components/SingleRecipe";
class Dashboard extends Component {
  state = {
    favorites: [],
    monday: {},
    tuesday: {},
    wednesday: {},
    thursday: {},
    friday: {},
    saturday: {},
    sunday: {},
    time: 0,
    meals: 0,
    ingredients: [],
    clicked: {}
  };

  componentDidMount() {
    this.getAll();
  }
  getTime(data) {
    let time = 0;
    for (let day in data) {
      for (let meal in data[day]) {
        time += parseInt(data[day][meal].time);
      }
    }
    let hours = Math.floor(time / 60);
    let minutes = time % 60;
    let total = hours + " hr" + minutes + " min";
    return total;
  }
  getMeals(data) {
    let count = 0;
    for (let day in data) {
      for (let meal in data[day]) {
        if (data[day][meal]) {
          count++;
        }
      }
    }
    return count;
  }
  getIngredients(data) {
    let list = [];
    for (let day in data) {
      for (let meal in data[day]) {
        data[day][meal].ingredients.forEach(item => {
          list.push(item);
        });
      }
    }
    return list;
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
          sunday: res.data.weeklymenu.sunday,
          time: this.getTime(res.data.weeklymenu),
          meals: this.getMeals(res.data.weeklymenu),
          ingredients: this.getIngredients(res.data.weeklymenu)
        });
      })
      .catch(err => console.log(err));
  }
  clicked(meal) {
    this.setState({
      clicked: meal
    });
  }
  updateState(day, meal, obj, fav, dayTo, mealTo) {
    if (!fav && meal) {
      var searchDay = { ...this.state[dayTo] };
      var removed = { ...this.state[day] };
      removed[meal] = {};
      searchDay[mealTo] = obj;
      this.setState({
        [dayTo]: searchDay,
        [day]: removed
      });
    } else if (meal !== "favorites") {
      var removed = { ...this.state[day] };
      removed[meal] = {};
      this.setState({
        [day]: removed
      });
    } else {
      var searchDay = { ...this.state[dayTo] };
      searchDay[mealTo] = obj;
      this.setState({
        [dayTo]: searchDay
      });
    }
  }
  render() {
    return (
      <>
        <h1>Prep info for a week</h1>
        <WeeklyTable
          favorites={this.state.favorites}
          monday={this.state.monday}
          tuesday={this.state.tuesday}
          wednesday={this.state.wednesday}
          thursday={this.state.thursday}
          friday={this.state.friday}
          saturday={this.state.saturday}
          sunday={this.state.sunday}
          clickedMeal={this.clicked.bind(this)}
          updateState={this.updateState.bind(this)}
        />
        <h4>
          Exprected total prep time for the week <span>{this.state.time}</span>
        </h4>
        <h4>
          Meals <span>{this.state.meals}</span>
        </h4>
        <h4>Ingredient list</h4>
        <ul>
          {this.state.ingredients.map(item => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
        <SingleRecipe meal={this.state.clicked} />
      </>
    );
  }
}

export default Dashboard;
