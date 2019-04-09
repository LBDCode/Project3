import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import "./style.css";


const style = {
	width: '90%',
	alignContent: 'center',
  // height: '75px',
	// border: '1px dashed gray',
	// padding: '0.5rem 1rem',
	// margin: '.5rem',
	backgroundColor: 'white',
	cursor: 'move'
};

class CarouselCard extends Component {

	render() {
		const { card, isDragging, connectDragSource, connectDropTarget } = this.props;
		const opacity = isDragging ? 0 : 1;

		return connectDragSource(connectDropTarget(
			<div data-obj={card} style={{ ...style, opacity }}>
				<div className="img-container">
				{card.image ? 
					<>
					<img
						className="image-recepie"
						alt="recepie"
						src={card.image} 		
					/> 
					<p className="lable">{card.label}</p>
					</>
					: 
					<></>
				}
				</div>
			</div>

		));
	}
}

const cardSource = {

	beginDrag(props) {		
		return {			
			index: props.index,
			listId: props.listId,
			card: props.card,
			user: props.user
		};
	},

	endDrag(props, monitor) {
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();	

		if ( dropResult && dropResult.listId !== item.listId && dropResult.listId !== 'favorites') {
			let parseNew = dropResult.listId.split('y');
			let parseOld = item.listId.split('y');
			let newDay = parseNew[0] + 'y';
			let newMeal = parseNew[1];
			let oldDay = parseOld[0] + 'y';
			let oldMeal = parseOld[1];
			if(item.listId !== 'favorites') {
				props.removeCard(item.index);
				props.saveMeal(newDay, newMeal, item.card, item.user);
				props.saveMeal(oldDay, oldMeal, {}, item.user);
			} else {
				props.saveMeal(newDay, newMeal, item.card, item.user);
			}
		}
	}
};

const cardTarget = {

	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;
		const sourceListId = monitor.getItem().listId;	

		if (dragIndex === hoverIndex) {
			return;
		}

		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
		const clientOffset = monitor.getClientOffset();
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;

		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}

		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}

		if ( props.listId === sourceListId ) {
			props.moveCard(dragIndex, hoverIndex);
			monitor.getItem().index = hoverIndex;
		}		
	}
};

export default flow(
	DropTarget("CARD", cardTarget, connect => ({
		connectDropTarget: connect.dropTarget()
	})),
	DragSource("CARD", cardSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}))
)(CarouselCard);