import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  fetchUserStories,
  fetchColumns
} from "../../actions/ScrumtableActions";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import "./Scrumtable.css";
import initialdata from "../../api/InitialData";
import Column from "./Column";

const Container = styled.div`
  display: flex;
`;
class ScrumTable extends Component {
  state = initialdata;

  componentDidMount() {
    this.props.fetchUserStories();
    this.props.fetchColumns();
  }
  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const start = this.props.scrum.columns.data[source.droppableId];
    const finish = this.props.scrum.columns.data[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.UserStories);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        UserStories: newTaskIds
      };
      const newState = {
        ...this.state,
        columns: {
          ...this.props.scrum.columns.data,
          [newColumn._id]: newColumn
        }
      };
      this.setState(newState);
      return;
    }

    //moving from one list to another
    const startTaskIds = Array.from(start.UserStories);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      UserStories: startTaskIds
    };
    const finishTaskIds = Array.from(finish.UserStories);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      UserStories: finishTaskIds
    };
    const newState = {
      ...this.state,
      columns: {
        ...this.props.scrum.columns.data,
        [newStart._id]: newStart,
        [newFinish._id]: newFinish
      }
    };
    this.setState(newState);
  };
  render() {
    console.log(this.props.scrum.userStories.data);
    console.log(this.props.scrum.columns.data);
    // console.log(this.state);
    // const newEtat =
    //   this.props.scrum.userStories.data &&
    //   _.groupBy(this.props.scrum.userStories.data, "etat");
    // console.log(newEtat);

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          {/* {newEtat &&
            Object.keys(newEtat).map(columnID => {
              // console.log(columnID);
            })} */}
          {this.state.columnOrder.map(columnId => {
            console.log(columnId);

            const column = this.state.columns[columnId];
            console.log("column", column);

            const columnA =
              this.props.scrum.columns.data &&
              this.props.scrum.columns.data[columnId];
            console.log("columnA", columnA);
            const TasksObject = Object.assign(
              {},
              this.props.scrum.userStories.data
            );
            console.log(TasksObject);
            console.log(this.state.tasks);
            const tasksA =
              columnA &&
              columnA.UserStories.map(taskId => {
                Object.keys(TasksObject);
              });

            const tasks = column.UserStories.map(
              taskId => this.state.tasks[taskId]
            );

            return (
              columnA &&
              this.props.scrum.userStories.data && (
                <Column key={columnA._id} column={columnA} tasks={tasks} />
              )
            );
          })}
        </Container>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => {
  return {
    scrum: state.scrum
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { fetchUserStories, fetchColumns }
  )(ScrumTable)
);
