import React, { Component } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import API from "../utils/API";
//import WeeklyTable from "../components/Weeklytable";
import DashboardTable from "../components/DashboardTable";
import SingleRecipe from "../components/SingleRecipe";
import Navbar from "../components/Navbar/index";
import Firebase from "../config/Firebase";
import QuickplannerWrapped from "../components/Modal";

const crossout = {
  textDecoration: "line-through",
  display: "inline"
};
const none = {
  display: "inline"
};
const textfield = {
  marginRight: "10px"
};
const SubmitForm = {
  display: "flex",
  flexFlow: "column",
  width: "200px",
  padding: "20px"
};

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
    ingredients: {},
    clicked: {},
    currentUser: "",
    phone: "",
    notes: ""
  };

  componentDidMount() {
    Firebase.auth().onAuthStateChanged(user => {
      if (user && !Firebase.auth().currentUser.isAnonymous) {
        this.setState({
          currentUser: user.email
        });
        this.getAll(user.email);
      }
    });
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
    let obj = {};
    for (let day in data) {
      for (let meal in data[day]) {
        data[day][meal].ingredients.forEach(item => {
          if (item in obj) {
            item += " (x2)";
          }
          obj[item] = false;
        });
      }
    }
    return obj;
  }
  getAll(user) {
    API.getDBRecipes(user)
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
  ingredientChecked(item) {
    let ingredientProperty = { ...this.state.ingredients };
    if (ingredientProperty[item]) {
      ingredientProperty[item] = false;
    } else {
      ingredientProperty[item] = true;
    }
    this.setState({ ingredients: ingredientProperty });
  }

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    // const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    let listArr = Object.keys(this.state.ingredients).filter(item => {
      if (!this.state.ingredients[item]) {
        return item;
      }
    });
    let text = "\n" + listArr.join("\n") + "\n" + this.state.notes;
    API.sendSMS(this.state.phone, text);
  };

  // updateState(day, meal, obj, fav, dayTo, mealTo) {
  //   if (!fav && meal) {
  //     var searchDay = { ...this.state[dayTo] };
  //     var removed = { ...this.state[day] };
  //     removed[meal] = {};
  //     searchDay[mealTo] = obj;
  //     this.setState({
  //       [dayTo]: searchDay,
  //       [day]: removed
  //     });
  //   } else if (meal !== "favorites") {
  //     var removed = { ...this.state[day] };
  //     removed[meal] = {};
  //     this.setState({
  //       [day]: removed
  //     });
  //   } else {
  //     var searchDay = { ...this.state[dayTo] };
  //     searchDay[mealTo] = obj;
  //     this.setState({
  //       [dayTo]: searchDay
  //     });
  //   }
  // }
  render() {
    return (
      <>
        <Navbar />
        <QuickplannerWrapped />
        <h1>Prep info for a week</h1>
        <DashboardTable
          monday={this.state.monday}
          tuesday={this.state.tuesday}
          wednesday={this.state.wednesday}
          thursday={this.state.thursday}
          friday={this.state.friday}
          saturday={this.state.saturday}
          sunday={this.state.sunday}
          clickedMeal={this.clicked.bind(this)}
        />
        {/* <WeeklyTable
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
        /> */}
        <h4>
          Exprected total prep time for the week <span>{this.state.time}</span>
        </h4>
        <h4>
          Meals <span>{this.state.meals}</span>
        </h4>
        <h4>Ingredient list</h4>
        <ul>
          {Object.keys(this.state.ingredients).map(item => {
            return (
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    key={item}
                    checked={this.state.ingredients[item]}
                    onChange={() => this.ingredientChecked(item)}
                  />
                  <p style={this.state.ingredients[item] ? crossout : none}>
                    {item}
                  </p>
                </TableCell>
              </TableRow>
            );
          })}
        </ul>
        <Paper style={SubmitForm}>
          <TextField
            style={textfield}
            id="outlined-uncontrolled"
            label="Phone Number"
            placeholder="(000)-000-00-00"
            margin="normal"
            variant="outlined"
            name="phone"
            value={this.state.phone}
            onChange={this.handleInputChange}
          />
          <TextField
            style={textfield}
            id="outlined-multiline-flexible"
            label="Notes"
            multiline
            rowsMax="4"
            value={this.state.notes}
            name="notes"
            onChange={this.handleInputChange}
            margin="normal"
            variant="outlined"
          />
          <Button variant="outlined" onClick={this.handleFormSubmit}>
            Send my list
          </Button>
        </Paper>

        <SingleRecipe meal={this.state.clicked} />
      </>
    );
  }
}

export default Dashboard;
