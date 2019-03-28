import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import ControlledExpansionPanels from "../Accordian";
import Carousel from "../Carousel";

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
  paper: {
    position: "absolute",
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

class Quickplanner extends React.Component {
  state = {
    open: false,
  };


  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;


    return (
      <div>
        <Typography gutterBottom>
          Click to open modal
        </Typography>
        <Button onClick={this.handleOpen}>Open Modal</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography align="center" variant="title" id="modal-title">
              Plan your menu
            </Typography>
          <Carousel></Carousel>
          <ControlledExpansionPanels></ControlledExpansionPanels>


          </div>
        </Modal>
      </div>
    );
  }
}

Quickplanner.propTypes = {
  classes: PropTypes.object.isRequired
};

const QuickplannerWrapped = withStyles(styles)(Quickplanner);

export default QuickplannerWrapped;

