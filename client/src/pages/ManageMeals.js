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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Firebase from "../config/Firebase";
import Swal from "sweetalert2";
import Carousel from "../components/Carousel";

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
  },
  list: {
    display: "flex"
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
    margin: "5px 10px 20px 0"
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
    width: "350px",
    display: "flex"
  }
};

class ManageMeals extends Component {
  state = {
    favorites: [],
    menu: {},
    newMenu: [],
    currentUser: "",
  };
  constructor(props) {
    super(props);
    this.mealRef = React.createRef();
  }


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
  };


  getAll(user) {
    API.getDBRecipes(user)
      .then(res => {
        this.setState({
          favorites: res.data.favorites,
          menu: res.data.weeklymenu,
          newMenu: this.mapMenu()
        });
      })
      .catch(err => console.log(err));
  }

  mapMenu() {
    let menu = this.state.menu;
    let days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday"
    ];
    let meals = ["breakfast", "lunch", "dinner"];

    if (!menu) {
      let menu = {};
      for (let i = 0; i < days.length; i++) {
        menu[days[i]] = {};
        let day = menu[days[i]];

        for (let j = 0; j < meals.length; j++) {
          day[meals[j]] = {};
          day[meals[j]].id = days[i] + "-" + meals[j];
        }
      }
      console.log(menu);
      return menu;
    } else {
      for (let i = 0; i < days.length; i++) {
        let day = menu[days[i]];

        if (!day) {
          menu[days[i]] = {};
          day = menu[days[i]];
        }

        for (let j = 0; j < meals.length; j++) {
          if (!day[meals[j]]) {
            day[meals[j]] = {};
          }
          day[meals[j]].id = days[i] + "-" + meals[j];
        }
      }
    }
    console.log(menu);
    // this.setState({ newMenu: menu });
    return menu;
  }
  mapFavs() {
    let newFavs = [...this.state.favorites];
    newFavs.map((value, index) => {
      value.id = index + 1;
    });
    // console.log(newFavs);
    return newFavs;
  }






  render() {
    const { classes } = this.props;

    return (
        <>
        <Navbar />
        <Carousel favorites={this.state.favorites}/>
        </>
    );
  }
}

export default ManageMeals;
