import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import API from "../../utils/API";
import RecipeCard from "../RecipeCard/index";
import Firebase from "../../config/Firebase";
import Swal from "sweetalert2";
import "./style.css";
import { constants } from "zlib";

const styles = theme => ({
  root: {
    width: "100%"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "rgba(55, 55, 55, 0.65)",
    "&:hover": {
      backgroundColor: "rgba(55, 55, 55, 0.8)"
    },
    marginLeft: "0!important",
    width: "100%",
    height: "48px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    height: "35px",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  recipeModalTitle: {
    fontSize: "12px"
  },
  recipeModalText: {
    fontSize: "10px"
  }
});

class SearchAppBar extends Component {
  state = {
    vegan: false,
    vegetarian: false,
    sugar_conscious: false,
    peanut_free: false,
    tree_nut_free: false,
    alcohol_free: false,
    dietType: "",
    favorites: [],
    currentUser: "",
    menu:{},
  };

  // Checking Auth state and getting current user and info
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

  // Re-evaluates MongoDB for newly saved preferences.
  componentWillReceiveProps() {
    if (this.state.currentUser) {
      this.refreshPreferences(this.state.currentUser);
    }
  }

  handleSearchQuery = event => {
    this.setState({ searchQuery: event.target.value });
  };

  handleDietTypes = event => {
    this.setState({ dietType: event.target.value });
  };

  handleAllergies = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleSearchValues = event => {
    event.preventDefault();
    const values = {
      vegan: this.state.vegan,
      vegetarian: this.state.vegetarian,
      sugar_conscious: this.state.sugar_conscious,
      peanut_free: this.state.peanut_free,
      tree_nut_free: this.state.tree_nut_free,
      alcohol_free: this.state.alcohol_free,
      dietType: this.state.dietType,
      searchQuery: this.state.searchQuery
    };
    API.postRecipediaValues(values)
      .then(response => this.setState({ recipes: response.data.hits }))
      .catch(err => console.log(err));
  };

  //this is the code to add recipes to favorites

  getAll(user) {
    API.getDBRecipes(user)
      .then(res => {
        this.setState({
          favorites: res.data.favorites,
          userPreferences: res.data.preferences,
          vegan: res.data.preferences.vegan || false,
          vegetarian: res.data.preferences.vegetarian || false,
          sugar_conscious: res.data.preferences.sugar_conscious || false,
          peanut_free: res.data.preferences.peanut_free || false,
          tree_nut_free: res.data.preferences.tree_nut_free || false,
          alcohol_free: res.data.preferences.alcohol_free || false,
          dietType: res.data.preferences.dietType,
          menu: res.data.weeklymenu,
          // monday: res.data.weeklymenu.monday,
          // tuesday: res.data.weeklymenu.tuesday,
          // wednesday: res.data.weeklymenu.wednesday,
          // thursday: res.data.weeklymenu.thursday,
          // friday: res.data.weeklymenu.friday,
          // saturday: res.data.weeklymenu.saturday,
          // sunday: res.data.weeklymenu.sunday,
          // time: this.getTime(res.data.weeklymenu),
          // meals: this.getMeals(res.data.weeklymenu),
          // ingredients: this.getIngredients(res.data.weeklymenu)
        });
        console.log(this.state);
      })
      .catch(err => console.log(err));
  }

  refreshPreferences(user) {
    API.getDBRecipes(user)
      .then(res => {
        this.setState({
          vegan: res.data.preferences.vegan || false,
          vegetarian: res.data.preferences.vegetarian || false,
          sugar_conscious: res.data.preferences.sugar_conscious || false,
          peanut_free: res.data.preferences.peanut_free || false,
          tree_nut_free: res.data.preferences.tree_nut_free || false,
          alcohol_free: res.data.preferences.alcohol_free || false,
          dietType: res.data.preferences.dietType
        });
      })
      .catch(err => console.log(err));
  }

  formatRecipe = favObj => {
    let formRec = {
      uri: favObj.recipe.uri,
      calories: favObj.recipe.calories,
      protein: favObj.recipe.digest[2].total,
      fat: favObj.recipe.digest[0].total,
      carb: favObj.recipe.digest[1].total,
      label: favObj.recipe.label,
      url: favObj.recipe.url,
      time: favObj.recipe.totalTime,
      ingredients: favObj.recipe.ingredientLines,
      image: favObj.recipe.image
    };

    return formRec;
  };

  handleFavorite = (fav, recipeName) => {
    let newFav = this.formatRecipe(fav);

    API.updateFavs(this.state.currentUser, newFav)
      .then(() => {
        this.getAll(this.state.currentUser);
      })
      .then(() => {
        Swal.fire({
          position: "center",
          type: "success",
          title: recipeName.toUpperCase(),
          text: "This recipe has been added to your favorites.",
          showConfirmButton: false,
          timer: 4000,
          customClass: {
            header: this.props.classes.recipeModalTitle,
            content: this.props.classes.recipeModalText
          }
        });
      })
      .catch(err => console.log(err));
  };

  handleMealSave = (day, meal, recipe)=> {
    this.getAll(this.state.currentUser);
    let newMeal = this.formatRecipe(recipe);
    let curMenu = {...this.state.menu};

    curMenu[day] = { [meal]: newMeal };
    console.log(curMenu); 
    console.log(this.state.menu);

    API.updateMenu(this.state.currentUser, curMenu)
    .then(res => this.getAll(this.state.currentUser))
    .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
    const {
      vegan,
      vegetarian,
      sugar_conscious,
      peanut_free,
      tree_nut_free,
      alcohol_free,
      dietType
    } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className="searchMenuBg">
            <Grid container spacing={24}>
              <Grid className="searchbarPlacing" item xs={12} md={5}>
                <FormLabel
                  component="legend"
                  className="optionLabels searchbarMarginFix"
                >
                  Find Recipes
                </FormLabel>
                <div className="searchbarFlexFix">
                  <Button
                    variant="contained"
                    color="secondary"
                    className="searchBtn"
                    onClick={this.handleSearchValues}
                  >
                    Search
                  </Button>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      name="searchTerm"
                      onChange={this.handleSearchQuery}
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                      }}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={7}>
                <FormLabel
                  component="legend"
                  className="optionLabels dietOptionsMarginFix searchbarMarginFix"
                >
                  Diet Types
                </FormLabel>
                <RadioGroup
                  aria-label="Diet Types"
                  name="dietType"
                  className="dietOptions"
                  value={dietType}
                  onChange={this.handleDietTypes}
                >
                  <FormControlLabel
                    value="balanced"
                    control={<Radio />}
                    label="Balanced"
                    className="formatDietOptions"
                  />
                  <FormControlLabel
                    value="high-protein"
                    control={<Radio />}
                    label="High Protein"
                    className="formatDietOptions"
                  />
                  <FormControlLabel
                    value="low-carb"
                    control={<Radio />}
                    label="Low Carb"
                    className="formatDietOptions"
                  />
                  <FormControlLabel
                    value="low-fat"
                    control={<Radio />}
                    label="Low Fat"
                    className="formatDietOptions"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12} className="allergyMarginFix">
                <FormLabel component="legend" className="optionLabels">
                  Food Allergies
                </FormLabel>
                <FormGroup className="allergyOptions">
                  <FormControlLabel
                    className="formatAllergyOptions"
                    control={
                      <Checkbox
                        checked={vegan}
                        onChange={this.handleAllergies("vegan")}
                      />
                    }
                    label="Vegan"
                  />
                  <FormControlLabel
                    className="formatAllergyOptions"
                    control={
                      <Checkbox
                        checked={vegetarian}
                        onChange={this.handleAllergies("vegetarian")}
                      />
                    }
                    label="Vegetarian"
                  />
                  <FormControlLabel
                    className="formatAllergyOptions"
                    control={
                      <Checkbox
                        checked={sugar_conscious}
                        onChange={this.handleAllergies("sugar_conscious")}
                      />
                    }
                    label="Sugar-conscious"
                  />
                  <FormControlLabel
                    className="formatAllergyOptions"
                    control={
                      <Checkbox
                        checked={peanut_free}
                        onChange={this.handleAllergies("peanut_free")}
                      />
                    }
                    label="Peanut-free"
                  />
                  <FormControlLabel
                    className="formatAllergyOptions"
                    control={
                      <Checkbox
                        checked={tree_nut_free}
                        onChange={this.handleAllergies("tree_nut_free")}
                      />
                    }
                    label="Tree Nut-free"
                  />
                  <FormControlLabel
                    className="formatAllergyOptions"
                    control={
                      <Checkbox
                        checked={alcohol_free}
                        onChange={this.handleAllergies("alcohol_free")}
                      />
                    }
                    label="Alcohol-free"
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid container spacing={24} className="gridFormatting">
          {this.state.recipes && this.state.recipes.length !== 0 ? (
            this.state.recipes.map(recipe => {
              return (
                <Grid item lg={3} className="gridCard">
                  <RecipeCard
                    recipeInfo={recipe}
                    handleFavorite={this.handleFavorite}
                    saveMeal={this.handleMealSave}  
                    user={this.state.currentUser}
                  />
                </Grid>
              );
            })
          ) : (
            <h1 className="noResultsFound">No Recipes To Display</h1>
          )}
        </Grid>
      </div>
    );
  }
}

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchAppBar);

// THIS IS A TEST
