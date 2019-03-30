import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DropTarget from '../Droptarget';



const styles = theme => ({
  root: {
    width: '100%',
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class ControlledExpansionPanels extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Monday</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <DropTarget></DropTarget>
            {/* <Grid container spacing={24}>
              <Grid item xs={4}>
                <Paper className={classes.paper}>Breakfast</Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>Lunch</Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>Dinner</Paper>
              </Grid>
            </Grid> */}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Tuesday</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <Grid container spacing={24}>
              <Grid item xs={4}>
                <Paper className={classes.paper}>Breakfast</Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>Lunch</Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>Dinner</Paper>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Wednesday</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <Grid container spacing={24}>
              <Grid item xs={4}>
                <Paper className={classes.paper}>Breakfast</Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>Lunch</Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>Dinner</Paper>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Thursday</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <Grid container spacing={24}>
              <Grid item xs={4}>
                <Paper className={classes.paper}>Breakfast</Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>Lunch</Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>Dinner</Paper>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel5'} onChange={this.handleChange('panel5')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Friday</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={24}>
              <Grid item xs={4}>
                <Paper className={classes.paper}>Breakfast</Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>Lunch</Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>Dinner</Paper>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

      </div>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);