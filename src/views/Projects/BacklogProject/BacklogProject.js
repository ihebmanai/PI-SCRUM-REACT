import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col,Modal, ModalBody, ModalFooter, ModalHeader, Pagination, PaginationItem, PaginationLink, Row, Table ,Button,Input} from 'reactstrap';
import axios from "axios";
class BacklogProject extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      modal: false,
      danger: false,
      idDel:'',
      ID:'',
      userStories:[{
      _id:'',
      userStory:'',
      priority:'',
      timeestimation:''
      }]
      
    }
    this.toggleDanger = this.toggleDanger.bind(this);
  }
  toggleDanger() {
    this.setState({
      danger: !this.state.danger,
    });
  }
    onChange = idx => e => {
      const { name, value } = e.target;
      const userStories = [...this.state.userStories];
      userStories[idx] = {
        [name]: value
      };
      this.setState({
        userStories
      });
    }
onSubmit(p) {
  p.preventDefault() 
  const data = this.state
  console.log(p)
  
  this.setState({
  })
}
handleUpdateSpecificRow = (id,idx) => () => {
  console.log("iii "+idx)
  console.log( this.state.userStories[idx].timeestimation)
  this.setState({
    userStories: [...this.state.userStories]
  });
  axios.put("http://localhost:3000/backlogProject/updateUserStory/5cd2e7c48cfe9f3b20add870/5cd2e7c48cfe9f3b20add871",{
    priority: this.state.userStories[idx].priority})
  .then((response) => {
    
    console.log("updated");
    alert('User story updated')
  })
  .catch(error => {
    console.log(error);
  });
 
}
handleRemoveSpecificRow = (idx) => () => {
  console.log("iii"+idx)
  const userStories = [...this.state.userStories]
  this.setState({ userStories })
  console.log("aaaaaa"+idx)
  userStories.splice(idx, 1)
  axios.put("http://localhost:3000/backlogProject/delete/5cd2e7c48cfe9f3b20add870/"+idx)
  .then((response) => {
    
    console.log("deleted");
    this.setState({
      danger: !this.state.danger,
    });
  })
  .catch(error => {
    console.log(error);
  });
 
}
componentDidMount(e) {
  var self = this;
  axios.get("http://localhost:3000/project/getBacklog/5cd2e2618cfe9f3b20add864")
    .then((response) => {
      console.log(response.data[0].userstories.length);
      self.setState({
        userStories:response.data[0].userstories,
        ID:response.data[0]._id,})
      console.log(this.state.userStories);
    })
    .catch(error => {
      console.log(error);
    });
   
}

  render() {
    
    return (
      <div className="animated fadeIn">
     
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Backlog Project
              </CardHeader>
             
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>User Story</th>
                    <th>Priority</th>
                    <th>Time Estimation</th>
                    <th></th>
                    <th></th>
                    
                  </tr>
                  </thead>
                  <tbody>
                  
                    { 
                      this.state.userStories.map((userstory,idx) => {
            return (
              <tr key={idx}>
              <td hidden> <Input type="text" id="_id" name="_id" value={this.state.userStories[idx]._id} placeholder={userstory._id}
                                                   onChange={this.onChange(idx)}/></td>
              <td><Input type="text" id="userStory" name="userStory" value={this.state.userStories[idx].userStory} placeholder={userstory.userStory}
                                                   onChange={this.onChange(idx)}/></td>
              <td><Input type="text" id="priority" name="priority" value={this.state.userStories[idx].priority} placeholder={userstory.priority}
                                                   onChange={this.onChange(idx)}/> </td>
              <td><Input type="text" id="timeestimation" name="timeestimation" value={this.state.userStories[idx].timeestimation} placeholder={userstory.timeestimation}
                                                   onChange={this.onChange(idx)}/></td>
               <td> <Button block color="primary" onClick={this.handleUpdateSpecificRow(userstory._id,idx)}>Edit</Button></td>
              <td><Button block color="danger"  onClick={this.toggleDanger} >Delete</Button></td>
          
              <Modal isOpen={this.state.danger} toggle={this.toggleDanger}
                       className={'modal-danger ' + this.props.className}>
                  <ModalHeader toggle={this.toggleDanger}>Delete user story</ModalHeader>
                  <ModalBody>
                    Are you sure ?
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onClick={this.handleRemoveSpecificRow(userstory._id,idx)}>Delete</Button>{' '}
                    <Button color="secondary" onClick={this.toggleDanger}>Cancel</Button>
                  </ModalFooter>
                </Modal>  
              </tr>
            );
          })
                    }
                    
                    </tbody>
                </Table>
               
                <nav>
                  <Pagination>
                    <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                  </Pagination>
                </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default BacklogProject;
