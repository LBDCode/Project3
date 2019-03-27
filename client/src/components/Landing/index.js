import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import logoImg from "../../images/recipediaTransparent.png";
import img from "../../images/pastaIngredients.jpg";
import img2 from "../../images/salad.jpg";
import img3 from "../../images/cookies.jpg";
import img4 from "../../images/pizza.jpg";
import "./style.css";

function CenteredGrid(props) {
  return (
    <Grid className="root" container>
      <Grid className="gridItem gridOne" item xs={12}>
        <img className="main" alt="logo" src={logoImg} />
      </Grid>
      <Grid container className="wrapper">
        <Grid className="gridItem" xs={3}>
          <img alt="pastaIngredients" src={img} />
        </Grid>

        <Grid className="gridItem" xs={3} spacing={10}>
          <img alt="salad" src={img2} />
        </Grid>

        <Grid className="gridItem" xs={3} spacing={10}>
          <img alt="cookies" src={img3} />
        </Grid>

        <Grid className="gridItem" xs={3}>
          <img alt="pizza" src={img4} />
        </Grid>
      </Grid>
    </Grid>
  );
}

CenteredGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default CenteredGrid;
