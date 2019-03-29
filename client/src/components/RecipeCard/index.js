import React, { Component } from "react";
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
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  card: {
    maxWidth: 285,
    minWidth: 285,
    position: "relative",
    border: "solid white 5px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
  },
  media: {
    height: 0,
    paddingTop: "100%", // 16:9
    filter: "opacity(.8)"
  },
  actions: {
    position: "absolute",
    bottom: 0,
    left: 0
  },
  actionsAlt: {
    position: "absolute",
    bottom: 0,
    right: 0
  },
  avatar: {
    background: "linear-gradient( to right, #a8e063, #56ab2f )",
    fontFamily: "Roboto",
    fontSize: "25px",
    fontWeight: 900
  },
  recipeIcons: {
    background: "linear-gradient(to right, #ef473a, #cb2d3e)",
    color: "rgba(255,255,255,1.8.5)"
  },
  recipeIconsAlt: {
    background: "linear-gradient(to right, #0072ff, #00c6ff)",
    color: "rgba(255,255,255,1.8.5)"
  },
  recipeTitle: {
    fontSize: "25px",
    fontFamily: "Roboto, cursive",
    "font-variant-caps": "all-petite-caps",
    color: "#a8e063",
    textAlign: "center",
    height: "24px",
    width: "197px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap"
  },
  header: {
    padding: "5px 16px",
    background: "rgb(55,55,55)",
    borderBottom: "solid white 5px"
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
  popover: {
    pointerEvents: "none"
  },
  paper: {
    padding: "3px",
    borderRadius: "5px"
  }
});

class RecipeReviewCard extends Component {
  state = {
    anchorEl: null
  };

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

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
    }
    console.log(newFav);
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <>
        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          onClose={this.handlePopoverClose}
          disableRestoreFocus
        >
          <Typography className={classes.typography}>
            {this.props.recipeInfo.recipe.label}
          </Typography>
        </Popover>
        <Card className={classes.card}>
          <CardHeader
            className={classes.header}
            avatar={
              <Typography
                aria-owns={open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                onMouseEnter={this.handlePopoverOpen}
                onMouseLeave={this.handlePopoverClose}
              >
                <Avatar aria-label="Recipe" className={classes.avatar}>
                  R
                </Avatar>
              </Typography>
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
          />
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton
              aria-label="Add to favorites"
              className={classes.recipeIcons}
              onClick={() => this.props.handleFavorite(this.props.recipeInfo)}
            >
              <FavoriteIcon />
            </IconButton>
          </CardActions>
          <CardActions className={classes.actionsAlt} disableActionSpacing>
            <IconButton aria-label="Share" className={classes.recipeIconsAlt}>
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      </>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RecipeReviewCard);
