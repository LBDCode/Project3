import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import update from 'immutability-helper';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { DropTarget } from 'react-dnd';
import "./style.css";
import Card from '../CarouselCard';
// import API from "../../utils/API";
// import Firebase from "../../config/Firebase";
// import { DragSource } from 'react-dnd'


class CarouselTwo extends Component {
	constructor(props) {
		super(props);		
		this.state = { cards: props.list };
	}

	pushCard(card) {
		this.setState(update(this.state, {
			cards: {
				$push: [ card ]
			}
		}));
	}

	removeCard(index) {		
		this.setState(update(this.state, {
			cards: {
				$splice: [
					[index, 1]
				]
			}
		}));
	}

	saveMeal(day, meal, obj, user) {
		console.log(`Saving: ${day} ${meal} ${obj} for ${user}`);
	};

	moveCard(dragIndex, hoverIndex) {
		const { cards } = this.state;		
		const dragCard = cards[dragIndex];

		this.setState(update(this.state, {
			cards: {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, dragCard]
				]
			}
		}));
	}

	render() {
		const { cards } = this.state;
		const { canDrop, isOver, connectDropTarget } = this.props;
		// const isActive = canDrop && isOver;
		const style = {
			width: "90%",
			maxWidth: 1000,
			margin: "0 auto",
			// alignContent:'center'
		};

        // const backgroundColor = isActive ? 'lightgreen' : '#FFF';
        
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 2,
            swipeToSlide: true,
            initialSlide: 0,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: true
                }
							},
							{
                breakpoint: 800,
                settings: {
                  slidesToShow: 4,
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

		return connectDropTarget(
			<div style={{...style}}>
        <Slider {...settings}>
				{cards.map((card, i) => {
					return (
						<Card 
							key={card.id}
              index={i}
              image={card.image ? card.image : ""}
							listId={this.props.id}
							saveMeal={this.saveMeal}
							user = {this.props.user}
							card={card}														
							removeCard={this.removeCard.bind(this)}
							moveCard={this.moveCard.bind(this)} />
					);
                })}
        </Slider>
			</div>



		);
  }
}

const cardTarget = {
	drop(props, monitor, component ) {
		const { id } = props;
		const sourceObj = monitor.getItem();		
		if ( id !== sourceObj.listId ) component.pushCard(sourceObj.card);
		return {
			listId: id
		};
	}
}

export default DropTarget("CARD", cardTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop()
}))(CarouselTwo);