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
          <IconButton aria-label="Share" className={classes.recipeIcons}>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RecipeReviewCard);
