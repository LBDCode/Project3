import React from "react";
import QuickplannerWrapped from "../components/Modal";
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class Modal extends React.Component {

  render() {

    return (

    <DragDropContextProvider backend={HTML5Backend}>
      <QuickplannerWrapped></QuickplannerWrapped>
    </DragDropContextProvider>

    );
  }
}


export default Modal;


