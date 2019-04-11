import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import TableRow from "@material-ui/core/TableRow";
// import TableCell from "@material-ui/core/TableCell";
// import Checkbox from "@material-ui/core/Checkbox";
// import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
// import Paper from "@material-ui/core/Paper";
// import Button from "@material-ui/core/Button";
// import API from "../../utils/API";
// import DashboardTable from "../components/DashboardTable";
// import SingleRecipe from "../components/SingleRecipe";
// import Navbar from "../Navbar";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Switch from "@material-ui/core/Switch";
// import Firebase from "../../config/Firebase";
// import Swal from "sweetalert2";
// import Carousel from "../components/Carousel";
import Container from "../DropTargetTwo";
import Title from "../Title";
// import MealGrid from "../components/MealGrid";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";


const largeStyles = theme => ({
  root: {
    flexGrow: 1,
    direction: 'row',
    maxWidth: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center',
    margin: 10,
    padding: 10,
  },
  demo: {
    direction:"row",
  },
  paper: {
    width: 90,
    height: 90,
    color: theme.palette.text.secondary,
    // margin: 10,
    justify: 'center',
    margin: 'auto',
    alignItems: 'space-around'
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  row: {
    margin:5,
    // padding:10,
    justify:'center',
    alignItems:'center',
    direction:'row'
  },

});

const tabletStyles = theme => ({
  root: {
    flexGrow: 1,
    direction: 'row',
    // maxWidth: '59%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center',
    // margin: 5,
  },
  demo: {
    direction:"row",
  },
  paper: {
    width: 70,
    height: 70,
    color: theme.palette.text.secondary,
    margin: 5,
    justify: 'center',
    margin: 'auto',
    alignItems: 'space-around'
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  row: {
    margin:5,
    // padding:10,
    justify:'center',
    alignItems:'center',
    direction:'row'
  },

});

const mobileStyles = theme => ({
  root: {
    flexGrow: 1,
    direction: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center',
    margin: 10,
  },
  demo: {
    direction:"row",
  },
  paper: {
    width: 70,
    height: 70,
    color: theme.palette.text.secondary,
    // margin: 10,
    justify: 'center',
    margin: 'auto',
    alignItems: 'space-around'
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  row: {
    margin:5,
    // padding:10,
    justify:'center',
    alignItems:'center',
    direction:'row'
  },

});
  
const styleCheck = function() {

  if (window.innerWidth < 650) {
    return mobileStyles;
  } else if (window.innerWidth < 900 && window.innerWidth > 651) {
    return tabletStyles;
  } else {
    return largeStyles;
  }
};


class ManageMeals extends Component {

//   constructor(props) {
//     super(props);

//   }

 state = {
    favorites: this.props.favorites,
    menu: this.props.curMenu,
    // newMenu: this.mapMeals(),
    currentUser: "",
    direction: '',
    style: styleCheck(),
  };



//   componentDidMount() {
//     Firebase.auth().onAuthStateChanged(user => {
//       if (user && !Firebase.auth().currentUser.isAnonymous) {
//         this.setState({
//           currentUser: user.email
//         });
//         this.getAll(user.email);
//         this.directionCheck();
//         styleCheck();
//       }
//     });
//     window.onresize = function() {
//       this.forceUpdate();
//     }.bind(this);
//   };


//   getAll(user) {
//     API.getDBRecipes(user)
//       .then(res => {
//         this.setState({
//           favorites: res.data.favorites,
//           menu: res.data.weeklymenu,
//           newMenu: this.state.mapMeals()
//         });
//       })
//       .catch(err => console.log(err));
//   }

  mapMeals() {
    let menu = this.state.menu;
    console.log(menu);
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
      // console.log(menu);
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
    // console.log(menu);
    // this.setState({ newMenu: menu });
    return menu;
  };

  mapFavs() {
    let newFavs = [...this.state.favorites];
    newFavs.map((value, index) => {
      value.id = index + 1;
    });
    // console.log(newFavs);
    return newFavs;
  };

  directionCheck = function() {

    if (window.innerWidth < 650) {
      this.setState({
        direction:'row',
      });
    } else {
      this.setState({
        direction:'column',
      });
    }
  };
  




  render() {
    const { classes } = this.props;
    const { direction } = this.state;
    // const { newMenu };

    const days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday"
    ];
    const meals = ["breakfast", "lunch", "dinner"];
    const mealList = this.mapMeals();
    console.log(mealList);

    return (
        <>
        {/* <Carousel favorites={this.state.favorites}/> */}
        {/* <MealGrid /> */}

        <Grid container className={classes.root}>
        {days.map( day => {
          return(
            <Grid item className={classes.row} >
              <Grid
                container
                spacing={2}
                className={classes.demo}
                // if screen is large or tablet, this should be column, if small should be row
                direction={direction}
              >
                {meals.map(value => (
                  <Grid key={value} item spacing={8}>
                    {/* <Container
                      className={classes.paper}
                      id={`${day}${value}`}
                      list={[mealList[0]]}
                      // saveMeal={this.saveMeal}
                    >
                      {day} {value}
                    </Container> */}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )
        })}
      </Grid>

        </>
    );
  }
}

ManageMeals.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ManageMealsWrapped = withStyles(styleCheck())(ManageMeals);

export default DragDropContext(HTML5Backend)(ManageMealsWrapped);
