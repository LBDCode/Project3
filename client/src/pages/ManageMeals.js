import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import API from "../utils/API";
import Navbar from "../components/Navbar/index";
import Title from "../components/Title";
import Firebase from "../config/Firebase";
import Carousel from "../components/CarouselTwo";
import Container from "../components/DropTargetTwo";
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
  header: {
    textAlign: "center",
    color: "rgb(62, 65, 64)",
    fontFamily: "Dosis"
  },
  subheader: {
    textAlign: "left",
    margin: "20px 10px",
    color: "rgb(62, 65, 64)",
    fontFamily: "Dosis",
    fontSize: 16,
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
  heading: {
    width: 90,
    height: 90,
    backgroundColor: 'lightgray',
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
    // margin:5,
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
  header: {
    textAlign: "center",
    color: "rgb(62, 65, 64)",
    fontFamily: "Dosis"
  },
  paper: {
    width: 70,
    height: 70,
    color: theme.palette.text.secondary,
    margin: 5,
    justify: 'center',
    alignItems: 'space-around'
  },
  subheader: {
    textAlign: "left",
    margin: "20px 10px",
    color: "rgb(62, 65, 64)",
    fontFamily: "Dosis",
    fontSize: 16,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  row: {
    // margin:5,
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
    // margin: 10,
  },
  demo: {
    direction:"row",
  },
  header: {
    textAlign: "center",
    color: "rgb(62, 65, 64)",
    fontFamily: "Dosis"
  },
  paper: {
    width: 50,
    height: 50,
    color: theme.palette.text.secondary,
    // margin: 10,
    justify: 'center',
    margin: 'auto',
    alignItems: 'space-around'
  },  
  subheader: {
    textAlign: "left",
    margin: "20px 10px",
    color: "rgb(62, 65, 64)",
    fontFamily: "Dosis",
    fontSize: 16,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  row: {
    // margin:5,
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

  
  state = {
    favorites: [],
    menu: {},
    currentUser: "",
    direction: '',
    style: styleCheck(),
  };


  componentWillMount() {
    Firebase.auth().onAuthStateChanged(user => {
      if (user && !Firebase.auth().currentUser.isAnonymous) {
        this.setState({
          currentUser: user.email
        });
        this.getAll(user.email);
        this.directionCheck();
        styleCheck();
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
        });
        console.log(this.state.menu);
        this.mapMeals();
        this.mapFavs();
      })
      .catch(err => console.log(err));
  };

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

    if (!menu || menu === undefined) {
      let menu = {};
      for (let i = 0; i < days.length; i++) {
        menu[days[i]] = {};
        let day = menu[days[i]];

        for (let j = 0; j < meals.length; j++) {
          day[meals[j]] = {};
          day[meals[j]].id = days[i] + "-" + meals[j];
        }
      }
      this.setState({ newMenu: menu });
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
      this.setState({ newMenu: menu });
    }
  };

  mapFavs() {
    let newFavs = [...this.state.favorites];
    newFavs.map((value, index) => {
      value.id = index + 1;
    });
    // console.log(newFavs);
    this.setState({ mappedFavs: newFavs });
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

    const days = [
      "",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday"
    ];

    return (
        <>
        <Navbar />
        <Title title="Recipedia Quickplanner"> Recipedia Quickplanner</Title>
        
        <h2 className={classes.subheader}>Choose recipes from your favorites and add them to your weekly menu!</h2>
        
        { (this.state && this.state.mappedFavs) &&
          <Carousel id="favorites" user={this.state.currentUser} list={this.state.mappedFavs}/>
        }

        { this.state && this.state.newMenu &&
          <Grid container className={classes.root}>
            {days.map( day => {
              return(
                <Grid item className={classes.row} >
                  <Grid
                    container
                    className={classes.demo}
                    // if screen is large or tablet, this should be column, if small should be row
                    direction={direction}
                  >
                  {[day, "breakfast", "lunch", "dinner"].map(value => (                
                      <Grid key={`${day}${value}`} item spacing={0}>
                        <Container
                          className={(day !== "" && (value === "breakfast" || value === "lunch" || value === "dinner")) ? classes.paper: classes.heading}
                          id={(day !== "" && (value === "breakfast" || value === "lunch" || value === "dinner")) ? `${day}${value}` : `header-${day}-${value}`}
                          list={(day !== "" && (value === "breakfast" || value === "lunch" || value === "dinner")) ? [this.state.newMenu[day][value]] : [{id:"header", day:{day}, meal:{value}}]}
                          user={this.state.currentUser}
                          // saveMeal={this.saveMeal}
                        >
                        </Container>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                )
              })}
            </Grid>
          }
        </>
    );
  }
}

ManageMeals.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ManageMealsWrapped = withStyles(styleCheck())(ManageMeals);

export default DragDropContext(HTML5Backend)(ManageMealsWrapped);

