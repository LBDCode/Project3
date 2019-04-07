import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Paper from "@material-ui/core/Paper";
import QuickPlannerIcon from "@material-ui/icons/Dashboard";
import API from "../../utils/API";
import Firebase from "../../config/Firebase";
import Container from "../Droptarget";
import Grid from "@material-ui/core/Grid";
import CarouselTwo from "../CarouselTwo";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import "./style.css";

function getModalStyle() {
  const top = 20;
  const left = 20;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  root: {
    width: "100%",
    flexGrow: 1
  },
  paper: {
    position: "absolute",
    width: "90%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    textAlign: "center",
    padding: theme.spacing.unit * 4
  },
  styledModal: {
    overflow: "auto"
  },
  styledHeader: {
    // background: '#56ab2f',
    color: "black",
    padding: "2px",
    fontSize: "40px"
  }
});

class Quickplanner extends React.Component {
  state = {
    open: false,
    favorites: [],
    menu: {},
    newMenu: [],
    currentUser: "",
    expanded: null
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

  handleOpen = () => {
    this.setState({ open: true });
    this.getAll(this.state.currentUser);
  };

  handleClose = () => {
    this.setState({ open: false });
    this.getAll(this.state.currentUser);
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
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

  saveMeal(user, day, meal, recipe) {
    // const mealString = day + meal;
    // const newMeal = {mealString: recipe};
    console.log("hi");
    // API.updateMenu(user, newMeal)
    // .then(res =>  {
    //   this.setState({

    //   })
    // })
  }

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    const style = {
      display: "flex",
      justifyContent: "space-around",
      paddingTop: "20px"
    };

    const listOne = [];
    const listTwo = [];

    let meals = this.mapMenu();
    const favorites = this.mapFavs();

    return (
      <div>
        <Button className="nav-icon" onClick={this.handleOpen}>
          <QuickPlannerIcon />
          Manage Meals
        </Button>

        <Dialog
          // className={this.props.classes.styledModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          {/* <div style={getModalStyle()} className={classes.paper}> */}
          <DialogTitle
            className={this.props.classes.styledHeader}
            align="center"
            variant="title"
            id="modal-title"
          >
            plan your menu
          </DialogTitle>
          <DialogContent>
            <CarouselTwo id="favorites" list={favorites} />
            <ExpansionPanel
              expanded={expanded === "panel1"}
              onChange={this.handleChange("panel1")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Monday</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid style={{ ...style }} container spacing={24}>
                  <Grid item xs={12} sm={12} med={4}>
                    <div style={{ ...style }}>
                      <Container
                        id="MondayBreakfast"
                        list={[meals.monday.breakfast]}
                        saveMeal={this.saveMeal}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} med={4}>
                    <div style={{ ...style }}>
                      <Container
                        id="MondayLunch"
                        list={[meals.monday.lunch]}
                        saveMeal={this.saveMeal}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} med={4}>
                    <div style={{ ...style }}>
                      <Container
                        id="MondayDinner"
                        list={[meals.monday.dinner]}
                        saveMeal={this.saveMeal}
                      />
                    </div>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel2"}
              onChange={this.handleChange("panel2")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Tuesday</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div style={{ ...style }}>
                  <Container
                    id="TuesdayBreakfast"
                    list={[meals.tuesday.breakfast]}
                  />
                </div>
                <div style={{ ...style }}>
                  <Container id="TuesdayLunch" list={[meals.tuesday.lunch]} />
                </div>
                <div style={{ ...style }}>
                  <Container id="TuesdayDinner" list={[meals.tuesday.dinner]} />
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel3"}
              onChange={this.handleChange("panel3")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Wednesday</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div style={{ ...style }}>
                  <Container
                    id="WednesdayBreakfast"
                    list={[meals.wednesday.breakfast]}
                  />
                </div>
                <div style={{ ...style }}>
                  <Container
                    id="WednesdayLunch"
                    list={[meals.wednesday.lunch]}
                  />
                </div>
                <div style={{ ...style }}>
                  <Container
                    id="WednesdayDinner"
                    list={[meals.wednesday.dinner]}
                  />
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel4"}
              onChange={this.handleChange("panel4")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Thursday</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div style={{ ...style }}>
                  <Container
                    id="ThursdayBreakfast"
                    list={[meals.thursday.breakfast]}
                  />
                </div>
                <div style={{ ...style }}>
                  <Container id="ThursdayLunch" list={[meals.thursday.lunch]} />
                </div>
                <div style={{ ...style }}>
                  <Container
                    id="ThursdayDinner"
                    list={[meals.thursday.dinner]}
                  />
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel5"}
              onChange={this.handleChange("panel5")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Friday</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div style={{ ...style }}>
                  <Container
                    id="FridayBreakfast"
                    list={[meals.friday.breakfast]}
                  />
                </div>
                <div style={{ ...style }}>
                  <Container id="FridayLunch" list={[meals.friday.lunch]} />
                </div>
                <div style={{ ...style }}>
                  <Container id="FridayDinner" list={[meals.friday.dinner]} />
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel6"}
              onChange={this.handleChange("panel6")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Saturday</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div style={{ ...style }}>
                  <Container
                    id="SaturdayBreakfast"
                    list={[meals.saturday.breakfast]}
                  />
                </div>
                <div style={{ ...style }}>
                  <Container id="SaturdayLunch" list={[meals.saturday.lunch]} />
                </div>
                <div style={{ ...style }}>
                  <Container
                    id="SaturdayDinner"
                    list={[meals.saturday.dinner]}
                  />
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel7"}
              onChange={this.handleChange("panel7")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Sunday</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div style={{ ...style }}>
                  <Container
                    id="SundayBreakfast"
                    list={[meals.sunday.breakfast]}
                  />
                </div>
                <div style={{ ...style }}>
                  <Container id="SundayLunch" list={[meals.sunday.lunch]} />
                </div>
                <div style={{ ...style }}>
                  <Container id="SundayDinner" list={[meals.sunday.dinner]} />
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            {/* </div> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Quickplanner.propTypes = {
  classes: PropTypes.object.isRequired
};

const QuickplannerWrapped = withStyles(styles)(Quickplanner);

export default DragDropContext(HTML5Backend)(QuickplannerWrapped);
