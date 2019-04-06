import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import API from "../../utils/API";
import "./style.css";
import Swal from "sweetalert2";

class DashboardTable extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.weekDays = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday"
    ];
    this.meals = ["breakfast", "lunch", "dinner"];
  }

  clearDashboardMeal = event => {
    event.preventDefault();
    API.removeMeal(
      this.props.currentUser,
      event.target.getAttribute("data-day"),
      event.target.getAttribute("data-meal")
    ).then(res => {
      if (res.data === "removed") {
        Swal.fire({
          type: "success",
          title: "You removed all the meals from the current week!"
        });
        this.props.mealRemoved();
      } else {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: "Something went wrong, contact the support please."
        });
      }
    });
  };

  render() {
    return (
      <>
        <Paper className="root">
          <Table className="table">
            <TableHead>
              <TableRow>
                <TableCell className="meal">
                  <p id="clearWeek" onClick={e => this.clearDashboardMeal(e)}>
                    Clear the week
                  </p>
                </TableCell>
                <TableCell className="meal" align="left">
                  <p>Monday</p>
                </TableCell>
                <TableCell className="meal" align="left">
                  <p>Tuesday</p>
                </TableCell>
                <TableCell className="meal" align="left">
                  <p>Wednesday</p>
                </TableCell>
                <TableCell className="meal" align="left">
                  <p>Thursday</p>
                </TableCell>
                <TableCell className="meal" align="left">
                  <p>Friday</p>
                </TableCell>
                <TableCell className="meal" align="left">
                  <p>Saturday</p>
                </TableCell>
                <TableCell className="meal" align="left">
                  <p>Sunday</p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.meals.map((meal, i) => (
                <TableRow key={i}>
                  <TableCell
                    className="meal"
                    component="th"
                    scope="row"
                    align="center"
                  >
                    <p>{meal}</p>
                  </TableCell>
                  {this.weekDays.map(day => (
                    <TableCell
                      align="left"
                      className="cell"
                      id={
                        this.props[day] && this.props[day][meal]
                          ? this.props[day][meal].uri
                          : ""
                      }
                    >
                      {this.props[day] && this.props[day][meal] ? (
                        <div className="cell">
                          {this.props[day][meal].label ? (
                            <>
                              <div
                                onClick={() =>
                                  this.props[day] && this.props[day][meal].label
                                    ? this.props.clickedMeal(
                                        this.props[day][meal]
                                      )
                                    : ""
                                }
                                className="img-container"
                              >
                                <img
                                  className="image-recepe"
                                  alt="recepe"
                                  src={this.props[day][meal].image}
                                />
                                <p className="lableImg">
                                  {this.props[day][meal].label}
                                </p>
                              </div>
                              <button
                                data-day={day}
                                data-meal={meal}
                                className="removeOneMeal"
                                onClick={e => this.clearDashboardMeal(e)}
                              >
                                X
                              </button>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </>
    );
  }
}

export default DashboardTable;
