import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import API from "../../utils/API";
import Firebase from "../../config/Firebase";
import { DragSource } from 'react-dnd'
// import Typography from '@material-ui/core/Typography';



export default class Carousel extends Component {

  state = {
    favorites: [],
    
  };

  componentDidMount() {
    var user = Firebase.auth().currentUser;
    if (user) {
      this.setState({
        currentUser: user.email
      });
    }
    this.getAll(user.email);
  };

  getAll(user) {
    API.getDBRecipes(user)
      .then(res => {
        this.setState({
          favorites: res.data.favorites
        });
        console.log(this.state.favorites);
      })
      .catch(err => console.log(err));
  };


  

  render() {

    const style = {
      border: '1px dashed gray',
      padding: '0.5rem',
      margin: '0.5rem',
    };
    const SourceBoxRaw = ({
      children,
      isDragging,
      connectDragSource
    }) => {
      const opacity = isDragging ? 0.4 : 1
      
      return connectDragSource(
        <div
          style={Object.assign({}, style, {
            opacity
          })}
        >
          {children}
        </div>,
      )
    };
    const SourceBox = DragSource(
      props => props.color + '',
      {
        beginDrag: () => ({}),
      },
      (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
      }),
    )(SourceBoxRaw);

    const StatefulSourceBox = props => {
      return (
        <SourceBox
          {...props}
          >
        <img src={props.image} data-obj={props.dataObj} alt="recipe"/>
        </ SourceBox>
      )
    };
    
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      swipeToSlide: true,
      afterChange: function(index) {
        console.log(
          `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
        );
      },
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        }
      ]
    };
    return (
      <div>
        <Slider {...settings}>
          {this.state.favorites.map(item => {
            return (
              <StatefulSourceBox
              image={item.image}
              dataObj={item}
            />
        
            )
          })}
        </Slider>
      </div>
    );
  }
}

