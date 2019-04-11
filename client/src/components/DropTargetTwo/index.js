import React, { Component } from 'react';
import update from 'immutability-helper';
import Card from '../CarouselCard';
import { DropTarget } from 'react-dnd';
import API from "../../utils/API";
import "./style.css";



class Container extends Component {

	constructor(props) {
		super(props);		
		this.state = { cards: props.list };
	}

	// shouldComponentUpdate()

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
		API.updateMeal(user, day, meal, obj)
		// .then(res => console.log(this.state)
		// )
		.catch(err => console.log(err));
	};

	showOptions() {
		console.log("hi");
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
		const listID  = this.props.id.split("-");
		const type = listID[0];
		const lable = listID[2];
		const isActive = canDrop && isOver;
		const style = {
			width: "85px",
			height: "85px",
			textAlign: 'center',
			border: '1px dashed gray'
		};

		const backgroundColor = isActive ? 'lightgray' : '#FFF';

		return connectDropTarget(
			<div>
			{type === "header" ?
			<div className="gridHeader" >{lable}</div>
			:
			<div style={{...style, backgroundColor}}>

				{cards.map((card, i) => {
					return (
						<Card
							key={card.id}
							index={i}
							listId={this.props.id}
							card={card}	
							user={this.props.user}
							showOptions={this.showOptions}
							saveMeal={this.saveMeal}
							removeCard={this.removeCard.bind(this)}
							moveCard={this.moveCard.bind(this)} />
					)
				})}

				
			</div>

			}
			</div>
		);
  }
}

const cardTarget = {
	drop(props, monitor, component ) {
		const { id, list } = props;
		const sourceObj = monitor.getItem();		
		if ( id !== sourceObj.listId ) component.pushCard(sourceObj.card);
		return {
			listId: id,
			list: list
		};
	}
}

export default DropTarget("CARD", cardTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop()
}))(Container);