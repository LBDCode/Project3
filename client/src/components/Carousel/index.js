import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import API from "../../utils/API";
import Firebase from "../../config/Firebase";
import Typography from '@material-ui/core/Typography';



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
              <div data-obj={item}>
                <img src={item.image} alt="recipe"/>
              </div>
            )
          })}
        </Slider>
      </div>
    );
  }
}