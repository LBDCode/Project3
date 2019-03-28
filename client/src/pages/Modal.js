import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import QuickplannerWrapped from "../components/Modal";

class Modal extends React.Component {

  render() {

    return (
      <div>
          <QuickplannerWrapped></QuickplannerWrapped>
      </div>
    );
  }
}


export default Modal;


