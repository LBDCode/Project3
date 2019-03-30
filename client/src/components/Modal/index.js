import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import ControlledExpansionPanels from "../Accordian";
import Carousel from "../Carousel";
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
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
  paper: {
    position: "absolute",
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  styledModal: {
    overflow: 'auto'    
  },
  styledHeader: {
    // background: '#56ab2f',
    color: 'black',
    padding: '2px',
    fontSize:'40px'
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
          className={this.props.classes.styledModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography className={this.props.classes.styledHeader} align="center" variant="title" id="modal-title">
              plan your menu
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

export default DragDropContext(HTML5Backend)(QuickplannerWrapped);

