import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  fetchUserStories,
  fetchColumns,
  updateEtat
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
  onDragEnd =   result => {
    const { destination, source, draggableId } = result;
console.log(result);
const values={
  _id:draggableId,
  etat:destination.droppableId
}
    // if (!destination) {
    //   return;
    // }
    // if (
    //   destination.droppableId === source.droppableId &&
    //   destination.index === source.index
    // ) {
    //   return;
    // }
    // const start = this.props.scrum.columns.data[source.droppableId];
    // const finish = this.props.scrum.columns.data[destination.droppableId];

    // if (start === finish) {
    //   const newTaskIds = Array.from(start.UserStories);
    //   newTaskIds.splice(source.index, 1);
    //   newTaskIds.splice(destination.index, 0, draggableId);

    //   const newColumn = {
    //     ...start,
    //     UserStories: newTaskIds
    //   };
    //   const newState = {
    //     ...this.state,
    //     columns: {
    //       ...this.props.scrum.columns.data,
    //       [newColumn._id]: newColumn
    //     }
    //   };
    //   this.setState(newState);
    //   return;
    // }

    // //moving from one list to another
    // const startTaskIds = Array.from(start.UserStories);
    // startTaskIds.splice(source.index, 1);
    // const newStart = {
    //   ...start,
    //   UserStories: startTaskIds
    // };
    // const finishTaskIds = Array.from(finish.UserStories);
    // finishTaskIds.splice(destination.index, 0, draggableId);
    // const newFinish = {
    //   ...finish,
    //   UserStories: finishTaskIds
    // };
    // const newState = {
    //   ...this.state,
    //   columns: {
    //     ...this.props.scrum.columns.data,
    //     [newStart._id]: newStart,
    //     [newFinish._id]: newFinish
    //   }
    // };
    // this.setState(newState);
      this.props.updateEtat(values);
    
  }
  componentDidUpdate(prevProps) {
    if (this.props.scrum.loadingUpdateEtat !== prevProps.scrum.loadingUpdateEtat) {
 this.props.fetchUserStories();
    this.props.fetchColumns();
    }
  }

  render() {
  
   console.log(this.props);
   

    return (
  
      <DragDropContext onDragEnd={this.onDragEnd}>
      {this.props.scrum.loading ?  <div className="animated fadeIn pt-1 text-center">Loading...</div>:    <Container>
          {this.state.columnOrder.map(columnId => {
           
            
            const newEtat =
            _.groupBy(this.props.scrum.userStories.data, "etat");
           
            
           const column = this.state.columns[columnId];
         
            const tasks = column.UserStories.map(
              taskId => this.state.tasks[taskId]
            );
            
            let taches = new Array();
    // console.log(newEtat);
    this.props.scrum.userStories.data &&this.props.scrum.userStories.data.forEach(element => {
    if(columnId ==="ToDo"){
      if(element.etat=== "ToDo"){
       taches.push({_id: element._id, UserStoryName: element.UserStoryName, description: element.description})
      }
    }

    if(columnId ==="InProgress"){
      if(element.etat=== "InProgress"){
       taches.push({_id: element._id, UserStoryName: element.UserStoryName, description: element.description})
      }
    }

    if(columnId ==="Test"){
      if(element.etat=== "Test"){
       taches.push({_id: element._id, UserStoryName: element.UserStoryName, description: element.description})
      }
    }

    if(columnId ==="Done"){
      if(element.etat=== "Done"){
       taches.push({_id: element._id, UserStoryName: element.UserStoryName, description: element.description})
      }
    }
    });

  

            return <Column key={columnId} column={column} tasks={taches} />;
          })}
        </Container> }
     
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
    { fetchUserStories, fetchColumns,updateEtat }
  )(ScrumTable)
);
