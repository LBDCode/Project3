import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';

import API from "../../utils/API";
import Firebase from "../../config/Firebase";
import Container from '../Droptarget'
// import ControlledExpansionPanels from "../Accordian";
import CarouselTwo from "../CarouselTwo";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
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
  root: {
    width: '100%',
    flexGrow: 1,
  },
  paper: {
    position: "absolute",
    width: "80%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  styledModal: {
    overflow: "auto"
  },
  styledHeader: {
    // background: '#56ab2f',
    color: "black",
    padding: "2px",
    fontSize: "40px"
  }
});

class Quickplanner extends React.Component {
  state = {
    open: false,
    favorites: [],
    monday: {},
    tuesday: {},
    wednesday: {},
    thursday: {},
    friday: {},
    saturday: {},
    sunday: {},
    menu: {},
    currentUser: "",
    expanded: null,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };


  mapFavs() {
    let newFavs = [...this.state.favorites];
    newFavs.map((value, index) => {
      value.id = index + 1;
    })
    console.log(newFavs);
    return(newFavs);
  };

  getAll(user) {
    API.getDBRecipes(user)
      .then(res => {
        this.setState({
          favorites: res.data.favorites,
          menu: res.data.weeklymenu,
          mondayBreakfast: res.data.weeklymenu.monday.breakfast,
          mondayLunch: res.data.weeklymenu.monday.lunch,
          mondayDinner: res.data.weeklymenu.monday.dinner,
        });
        console.log(this.state.monday);
        this.mapFavs();
      })
      .catch(err => console.log(err));
  };


  componentDidMount() {
    Firebase.auth().onAuthStateChanged(user => {
      if (user && !Firebase.auth().currentUser.isAnonymous) {
        this.setState({
          currentUser: user.email
        });
        this.getAll(user.email);
      }
    });
  };

 



  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

		const style = {
			display: "flex",
			justifyContent: "space-around",
			paddingTop: "20px"
    }
    

		const listOne = [];

		const listTwo = [];

		const favorites = this.mapFavs();
    
    const listFour = [
			{ id: 7, text: "Test1" },
			{ id: 8, text: "Test2" },
      { id: 9, text: "Test3" },
      { id: 9, text: "Test4" },
      { id: 9, text: "Test5" },
      { id: 9, text: "Test6" } 
		];

		return (
      <div>

      <Button onClick={this.handleOpen}>Manage Meals</Button>
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
          <CarouselTwo id="favorites" list={favorites}/>
          <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Monday</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div style={{...style}}>
                <Container id="MondayBreakfast" list={listOne} saveMeal={this.saveMeal}/>
              </div>
              <div style={{...style}}>
                <Container id="MondayLunch" list={listTwo} saveMeal={this.saveMeal}/>
              </div>
              <div style={{...style}}>
                <Container id="MondayDinner" list={listOne} saveMeal={this.saveMeal} />
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Tuesday</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div style={{...style}}>
                <Container id="TuesdayBreakfast" list={listOne} />
              </div>
              <div style={{...style}}>
                <Container id="TuesdayLunch" list={listTwo} />
              </div>
              <div style={{...style}}>
                <Container id="TuesdayDinner" list={listOne} />
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Wednesday</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div style={{...style}}>
              <Container id="WednesdayBreakfast" list={listOne} />
            </div>
            <div style={{...style}}>
              <Container id="WednesdayLunch" list={listTwo} />
            </div>
            <div style={{...style}}>
              <Container id="WednesdayDinner" list={listOne} />
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Thursday</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div style={{...style}}>
              <Container id="ThursdayBreakfast" list={listOne} />
            </div>
            <div style={{...style}}>
              <Container id="ThursdayLunch" list={listTwo} />
            </div>
            <div style={{...style}}>
              <Container id="ThursdayDinner" list={listOne} />
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel5'} onChange={this.handleChange('panel5')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Friday</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div style={{...style}}>
              <Container id="FridayBreakfast" list={listOne} />
            </div>
            <div style={{...style}}>
              <Container id="FridayLunch" list={listTwo} />
            </div>
            <div style={{...style}}>
              <Container id="FridayDinner" list={listOne} />
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel6'} onChange={this.handleChange('panel6')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Saturday</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div style={{...style}}>
              <Container id="SaturdayBreakfast" list={listOne} />
            </div>
            <div style={{...style}}>
              <Container id="SaturdayLunch" list={listTwo} />
            </div>
            <div style={{...style}}>
              <Container id="SaturdayDinner" list={listOne} />
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel7'} onChange={this.handleChange('panel7')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Sunday</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div style={{...style}}>
              <Container id="SundayBreakfast" list={listOne} />
            </div>
            <div style={{...style}}>
              <Container id="SundayLunch" list={listTwo} />
            </div>
            <div style={{...style}}>
              <Container id="SundayDinner" list={listOne} />
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>

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
