import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./style.css";




export default class Carousel extends Component {
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
          <div>
            <img src="https://www.fillmurray.com/200/200" />
          </div>
          <div>
            <img src="https://www.fillmurray.com/200/200" />
          </div>
          <div>
            <img src="https://www.fillmurray.com/200/200" />
          </div>
          <div>
            <img src="https://www.fillmurray.com/200/200" />
          </div>
          <div>
            <img src="https://www.fillmurray.com/200/200" />
          </div>
          <div>
            <img src="https://www.fillmurray.com/200/200" />
          </div>
          <div>
            <img src="https://www.fillmurray.com/200/200" />
          </div>
          <div>
            <img src="https://www.fillmurray.com/200/200" />
          </div>
        </Slider>
      </div>
    );
  }
}