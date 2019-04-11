import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/ViewList";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
// import InputLabel from "@material-ui/core/InputLabel";
// import Input from "@material-ui/core/Input";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
import ReactCardFlip from "react-card-flip";
import Firebase from "../../config/Firebase";
import "./style.css";

const styles = theme => ({
  card: {
    maxWidth: 285,
    minWidth: 285,
    position: "relative",
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
  },
  media: {
    height: 0,
    paddingTop: "100%", // 16:9
    filter: "opacity(.8)"
  },
  avatar: {
    background: "rgb(150,150,150)",
    fontFamily: "Norican, cursive",
    fontSize: "25px",
    fontWeight: 900
  },
  recipeIcons: {
    color: "rgb(150,150,150)"
  },
  recipeTitle: {
    fontSize: "23px",
    fontFamily: "Roboto, cursive",
    "font-variant-caps": "all-petite-caps",
    color: "rgb(150,150,150)",
    height: "50px",
    width: "197px",
    overflow: "hidden",
    display: "grid",
    alignItems: "center"
  },
  header: {
    padding: "5px 16px"
  },
  button: {
    borderRadius: "100%",
    height: "40px!important",
    width: "40px!important",
    minWidth: "40px!important",
    padding: 0
  },
  typography: {
    padding: "10px",
    background: "rgb(55,55,55)",
    color: "white",
    fontFamily: "Roboto",
    fontWeight: 600,
    fontVariant: "all-petite-caps",
    fontSize: "20px",
    borderRadius: "5px",
    textAlign: "center"
  },
  cardFlipIcon: {
    position: "absolute",
    right: "3%"
  },
  nutritionBtn: {
    margin: theme.spacing.unit,
    position: "absolute",
    bottom: "7px",
    color: "rgb(150,150,150)"
  }
});

class RecipeReviewCard extends Component {
  constructFavObj = () => {
    let newFav = {
      uri: String,
      calories: String,
      protein: String,
      fat: String,
      carb: String,
      label: String,
      url: String,
      time: Number,
      ingredients: [String],
      image: String
    };
  };

  state = {
    open: false,
    day: "M",
    meal: "",
    isFlipped: false,
    isAnonymous: false
  };

  componentWillMount() {
    this.authListener();
  }

  authListener() {
    Firebase.auth().onIdTokenChanged(user => {
      this.setState({ isAnonymous: user.isAnonymous });
    });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCardFlip = e => {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  };

  getNutritionValue = (nutritionValue, totalServings) => {
    // console.log(object);
    // console.log(nutritionValue);
    if (nutritionValue !== undefined) {
      const valuePerServing =
        parseFloat(nutritionValue.quantity) / parseInt(totalServings);
      return parseFloat(valuePerServing.toFixed(1));
    } else {
      return "0";
    }
  };

  convertDay(original) {
    var newDay;
    switch (original) {
      case "M":
        newDay = "monday";
        break;
      case "T":
        newDay = "tuesday";
        break;
      case "W":
        newDay = "wednesday";
        break;
      case "TH":
        newDay = "thursday";
        break;
      case "F":
        newDay = "friday";
        break;
      case "S":
        newDay = "saturday";
        break;
      case "SU":
        newDay = "sunday";
        break;
    }
    console.log(newDay);
    return newDay;
  }

  handleDayPick = day => {
    let newDay = this.convertDay(day);
    console.log(newDay);
    this.setState({ day: newDay });
    console.log("meal" + this.state.day);
  };

  handleMealPick = meal => {
    this.setState({ meal });
  };

  renderDayFunction = () => {
    const days = ["M", "T", "W", "TH", "F", "S", "SU"];
    const fullDays = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday"
    ];
    return days.map((day, i) => {
      const color =
        this.state.day === fullDays[i] ? "#4a4848" : "rgb(192, 187, 187)";
      return (
        <Avatar
          style={{ backgroundColor: color }}
          key={day}
          onClick={() => {
            console.log("hello");
            this.handleDayPick(day);
          }}
        >
          {day}
        </Avatar>
      );
    });
  };

  renderMealFunction = () => {
    const meals = ["breakfast", "lunch", "dinner"];
    return meals.map(meal => {
      const color = this.state.meal === meal ? "#4a4848" : "rgb(192, 187, 187)";
      return (
        <Button
          style={{ backgroundColor: color, color: "white" }}
          key={meal}
          onClick={() => this.handleMealPick(meal)}
        >
          {meal.toUpperCase()}
        </Button>
      );
    });
  };

  render() {
    const { classes } = this.props;
    const nutritionValue = this.props.recipeInfo.recipe.totalNutrients;
    const totalServings = this.props.recipeInfo.recipe.yield;

    return (
      <Card className={[classes.card, "wholeRecipeCard"].join(" ")} key="back">
        <ReactCardFlip
          isFlipped={this.state.isFlipped}
          flipSpeedBackToFront={0.8}
          flipSpeedFrontToBack={0.8}
          flipDirection="horizontal"
        >
          <div key="front" className="frontFlipCard">
            <CardHeader
              className={classes.header}
              avatar={
                <Avatar aria-label="Recipe" className={classes.avatar}>
                  R
                </Avatar>
              }
              title={
                <h1 className={classes.recipeTitle}>
                  {this.props.recipeInfo.recipe.label}
                </h1>
              }
            />
            <CardMedia
              className={[classes.media, "recipeCardImage"].join(" ")}
              image={this.props.recipeInfo.recipe.image}
              title={this.props.recipeInfo.recipe.label}
              alt={this.props.recipeInfo.recipe.label}
              onClick={() =>
                this.props.history.push(
                  "recipe/" + this.props.recipeInfo.recipe.uri.split("_")[1]
                )
              }
            />
          </div>

          <div key="back">
            {/* NUTRITION LABEL STARTS HERE */}
            <section className="performance-facts">
              <header className="performance-facts__header">
                <h1 className="performance-facts__title">Nutrition Facts</h1>
                <p className="nutritionParaStyling">
                  Servings Per Recipe {totalServings}
                </p>
              </header>
              <table className="performance-facts__table">
                <thead>
                  <tr>
                    <th colspan="3" className="small-info">
                      Amount Per Serving
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colspan="2" className="calorieStyling">
                      <b>Calories</b>
                      &nbsp;
                      {this.getNutritionValue(
                        nutritionValue.ENERC_KCAL,
                        totalServings
                      )}
                    </th>
                  </tr>
                  <tr>
                    <th colspan="2">
                      <b>Total Fat</b>
                      &nbsp;
                      {this.getNutritionValue(
                        nutritionValue.FAT,
                        totalServings
                      )}
                      g
                    </th>
                  </tr>
                  <tr>
                    <td className="blank-cell" />
                    <th>
                      Saturated Fat&nbsp;
                      {this.getNutritionValue(
                        nutritionValue.FASAT,
                        totalServings
                      )}
                      g
                    </th>
                  </tr>
                  <tr>
                    <td className="blank-cell" />
                    <th>
                      Trans Fat&nbsp;
                      {this.getNutritionValue(
                        nutritionValue.FATRN,
                        totalServings
                      )}
                      g
                    </th>
                    <td />
                  </tr>
                  <tr>
                    <th colspan="2">
                      <b>Cholesterol</b>
                      &nbsp;
                      {this.getNutritionValue(
                        nutritionValue.CHOLE,
                        totalServings
                      )}
                      mg
                    </th>
                  </tr>
                  <tr>
                    <th colspan="2">
                      <b>Sodium</b>
                      &nbsp;
                      {this.getNutritionValue(nutritionValue.NA, totalServings)}
                      mg
                    </th>
                  </tr>
                  <tr>
                    <th colspan="2">
                      <b>Total Carbohydrate</b>
                      &nbsp;
                      {this.getNutritionValue(
                        nutritionValue.CHOCDF,
                        totalServings
                      )}
                      g
                    </th>
                  </tr>
                  <tr>
                    <td className="blank-cell" />
                    <th>
                      Dietary Fiber &nbsp;
                      {this.getNutritionValue(
                        nutritionValue.FIBTG,
                        totalServings
                      )}
                      g
                    </th>
                  </tr>
                  <tr>
                    <td className="blank-cell" />
                    <th>
                      Sugars &nbsp;
                      {this.getNutritionValue(
                        nutritionValue.SUGAR,
                        totalServings
                      )}
                      g
                    </th>
                    <td />
                  </tr>
                  <tr>
                    <th colspan="2">
                      <b>Protein</b>
                      &nbsp;
                      {this.getNutritionValue(
                        nutritionValue.PROCNT,
                        totalServings
                      )}
                      g
                    </th>
                    <td />
                  </tr>
                </tbody>
              </table>
            </section>
            {/* NUTRITION LABEL ENDS HERE */}
          </div>
        </ReactCardFlip>
        <CardActions className={classes.actions} disableActionSpacing>
          <div
            style={
              this.state.isAnonymous
                ? { visibility: "hidden" }
                : { visibility: "visible" }
            }
          >
            <IconButton
              style={
                this.props.favorite === true
                  ? { color: "indianred" }
                  : { color: "rgb(150,150,150)" }
              }
              aria-label="Add to favorites"
              className={classes.recipeIcons}
              onClick={() =>
                this.props.handleFavorite(
                  this.props.recipeInfo,
                  this.props.recipeInfo.recipe.label
                )
              }
            >
              <FavoriteIcon />
            </IconButton>
            <IconButton
              aria-label="Share"
              className={classes.recipeIcons}
              onClick={
                // this.props.saveMeal("friday", "dinner", this.props.recipeInfo)
                this.handleClickOpen
              }
            >
              <ShareIcon />
            </IconButton>
            <Button
              variant="outlined"
              color="default"
              onClick={this.handleCardFlip}
              className={[classes.nutritionBtn, classes.cardFlipIcon].join(" ")}
            >
              Nutrition Facts
            </Button>
            <Dialog
              disableBackdropClick
              disableEscapeKeyDown
              open={this.state.open}
              onClose={this.handleClose}
            >
              <DialogTitle className="addTo">Add To Weekly Menu:</DialogTitle>
              <DialogContent className="main">
                <div className="pickContainer">
                  <div className="pickCenter">{this.renderDayFunction()}</div>
                  <div className="pickCenter">{this.renderMealFunction()}</div>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} className="btn-title">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    this.props.saveMeal(
                      this.state.day,
                      this.state.meal,
                      this.props.recipeInfo
                    );
                    this.handleClose();
                  }}
                  className="btn-title"
                >
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </CardActions>
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(RecipeReviewCard));

// THIS IS A TEST
