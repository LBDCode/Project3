import React, { Component } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import API from "../utils/API";
import DashboardTable from "../components/DashboardTable";
import SingleRecipe from "../components/SingleRecipe";
import Navbar from "../components/Navbar/index";
import Firebase from "../config/Firebase";
import Swal from "sweetalert2";

let styles = function() {
  if (window.innerWidth < 768) {
    return midStyles;
  } else {
    return maxStyles;
  }
};
let midStyles = {
  crossout: {
    textDecoration: "line-through",
    display: "inline"
  },
  none: {
    display: "inline"
  },
  smallCardsWr: {
    width: "100%",
    display: "flex"
  },
  cardList: {
    width: "93%",
    margin: "30px 30px"
  },
  card: {
    width: "50%",
    margin: "30px 30px",
    padding: "20px",
    color: "grey",
    fontSize: "20px"
  },
  SubmitForm: {
    width: "82%",
    margin: "30px 30px",
    display: "flex",
    flexFlow: "column",
    padding: "30px"
  },
  wrapper: {
    display: "flex",
    flexFlow: "column",
    width: "100%",
    alignItems: "center",
    fontFamily: "Dosis"
  },
  i: {
    fontSize: "30px",
    marginRight: "5px"
  },
  header: {
    textAlign: "center",
    color: "rgb(62, 65, 64)",
    fontFamily: "Dosis"
  },
  textWr: {
    width: "90%",
    color: "grey",
    textAlign: "center",
    borderTop: "1px solid #8080801f",
    padding: "20px"
  }
};

let maxStyles = {
  crossout: {
    textDecoration: "line-through",
    display: "inline"
  },
  none: {
    display: "inline"
  },
  textfield: {
    marginRight: "10px"
  },
  SubmitForm: {
    display: "flex",
    flexFlow: "column",
    width: "20%",
    padding: "20px",
    margin: "30px 30px",
    alignItems: "center"
  },
  header: {
    textAlign: "center",
    color: "rgb(62, 65, 64)",
    fontFamily: "Dosis"
  },
  card: {
    minWidth: "10%",
    height: "164px",
    margin: "30px 30px",
    padding: "20px",
    textAlign: "center",
    color: "grey",
    fontSize: "20px"
  },
  cardList: {
    height: "400px",
    width: "60%",
    minWidth: "300px",
    margin: "30px 30px",
    padding: "20px",
    overflow: "scroll",
    display: "flex"
  },
  wrapper: {
    display: "flex",
    width: "100%",
    fontFamily: "Dosis"
  },
  smallCardsWr: {
    width: "30%"
  },
  i: {
    fontSize: "30px",
    marginRight: "5px"
  },
  textWr: {
    width: "30%",
    color: "grey",
    marginLeft: "80px",
    textAlign: "center",
    borderLeft: "1px solid #8080801f",
    paddingLeft: "20px"
  },
  list: {
    width: "350px"
  }
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
    clicked: "",
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
    window.onresize = function() {
      this.forceUpdate();
    }.bind(this);
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
    var reg = new RegExp("^[0-9]+$");

    if (name === "phone" && value.match(reg) && value.length < 11) {
      this.setState({
        [name]: value
      });
    }
    if (name === "notes") {
      this.setState({
        [name]: value
      });
    }
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.phone.length !== 10) {
      Swal.fire({
        type: "error",
        title: "Oops...",
        text: "Check your phone number"
      });
    } else {
      let listArr = Object.keys(this.state.ingredients).filter(item => {
        if (!this.state.ingredients[item]) {
          return item;
        }
      });
      let text =
        "This is your shopping list: \n" +
        listArr.join("\n") +
        "\n" +
        this.state.notes;
      API.sendSMS(this.state.phone, text).then(res => {
        if (res.data) {
          Swal.fire({
            type: "success",
            title: "Your message has been sent!"
          });
        }
      });
    }
  };
  render() {
    return (
      <>
        <Navbar />
        <h1 style={styles().header}>Prep info for a week</h1>
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
        <div style={styles().wrapper}>
          <div style={styles().smallCardsWr}>
            <Paper style={styles().card}>
              <h5>
                Exprected total prep time for the week:
                <p>
                  <span>
                    <i style={styles().i} class="fas fa-clock" />
                  </span>
                  {this.state.time}
                </p>
              </h5>
            </Paper>
            <Paper style={styles().card}>
              <h5>
                Total meals for this week{" "}
                <p>
                  <span>
                    <i style={styles().i} class="fas fa-hamburger" />
                  </span>
                  {this.state.meals}
                </p>
              </h5>
            </Paper>
          </div>
          <Paper style={styles().cardList}>
            <ul>
              {Object.keys(this.state.ingredients).map(item => {
                return (
                  <TableRow>
                    <TableCell style={styles().list} padding="checkbox">
                      <Checkbox
                        key={item}
                        checked={this.state.ingredients[item]}
                        onChange={() => this.ingredientChecked(item)}
                      />
                      <p
                        style={
                          this.state.ingredients[item]
                            ? styles().crossout
                            : styles().none
                        }
                      >
                        {item}
                      </p>
                    </TableCell>
                  </TableRow>
                );
              })}
            </ul>
            <div style={styles().textWr}>
              <h4 style={styles().header}>Ingredient list for all the meals</h4>
              <p>
                Here you can customize your shopping list, check items that you
                have in your pantry
              </p>
            </div>
          </Paper>
          <Paper style={styles().SubmitForm}>
            <h4 style={styles().header}>
              Share your shopping list with others
            </h4>
            <TextField
              style={styles().textfield}
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
              style={styles().textfield}
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
        </div>
        {this.state.clicked ? <SingleRecipe meal={this.state.clicked} /> : ""}
      </>
    );
  }
}

export default Dashboard;
