import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { withRouter } from "react-router-dom";
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
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
    console.log(newFav);
  };

  state = {
    open: false,
    day: "",
    meal: ""
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
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
          className={classes.media}
          image={this.props.recipeInfo.recipe.image}
          title={this.props.recipeInfo.recipe.label}
          alt={this.props.recipeInfo.recipe.label}
          onClick={() =>
            this.props.history.push(
              "recipe/" + this.props.recipeInfo.recipe.uri.split("_")[1]
            )
          }
        />
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
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
          <>
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
            <Dialog
              disableBackdropClick
              disableEscapeKeyDown
              open={this.state.open}
              onClose={this.handleClose}
            >
              <DialogTitle>Add this meal to your weekly menu</DialogTitle>
              <DialogContent>
                <form className={classes.container}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="day-native-simple">Day</InputLabel>
                    <Select
                      native
                      value={this.state.day}
                      onChange={this.handleChange("day")}
                      input={<Input id="day-native-simple" />}
                    >
                      <option value="" />
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
                      <option value="saturday">Saturday</option>
                      <option value="sunday">Sunday</option>
                    </Select>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="meal-simple">Meal</InputLabel>
                    <Select
                      value={this.state.meal}
                      onChange={this.handleChange("meal")}
                      input={<Input id="meal-simple" />}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="breakfast">Breakfast</MenuItem>
                      <MenuItem value="lunch">Lunch</MenuItem>
                      <MenuItem value="dinner">Dinner</MenuItem>
                    </Select>
                  </FormControl>
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
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
                  color="primary"
                >
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
          </>
        </CardActions>
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(RecipeReviewCard));
