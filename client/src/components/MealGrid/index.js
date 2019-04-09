import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Firebase from "../../config/Firebase";
import Paper from '@material-ui/core/Paper';
import withWidth, { isWidthUp } from 'material-ui/utils/withWidth';



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
    justify: 'center',
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

class InteractiveGrid extends React.Component {
  state = {
    direction: '',
    style: styleCheck(),
    currentUser: '',
  };

  componentDidMount() {
    Firebase.auth().onAuthStateChanged(user => {
      if (user && !Firebase.auth().currentUser.isAnonymous) {
        this.setState({
          currentUser: user.email
        });
        // this.getAll(user.email);
      }
    });
    this.directionCheck();
    window.onresize = function() {
      this.forceUpdate();
      this.directionCheck();
      styleCheck();
    }.bind(this);
  }

  
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
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    



    return (
  
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
                {[day, "Breakfast", "Lunch", "Dinner"].map(value => (
                  <Grid key={value} item spacing={4}>
                    <Paper
                      className={classes.paper}
                    >
                      {value}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )
        })}
      </Grid>
    )
  }  
}


InteractiveGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleCheck())(InteractiveGrid);
