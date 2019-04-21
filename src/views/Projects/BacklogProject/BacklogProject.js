import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table ,Button,Input} from 'reactstrap';
import axios from "axios";
class BacklogProject extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      idDel:'',
      ID:'',
      userStories:[{
      _id:'',
      userStory:'',
      priority:'',
      timeestimation:''
      }]
      
    }
  }
  onChange(event) {
    event.preventDefault() 
    console.log(event)
    console.log(event.target.name)
    console.log(event.target.value)
    this.setState({
      [event.target.name] : event.target.value,
     
    })
}
onSubmit(p) {
  p.preventDefault() 
  const data = this.state
  console.log(p)
  
  this.setState({
  })
}
handleUpdateSpecificRow = (idx) => () => {
  console.log("iii"+idx)
  console.log("iiiiiii"+ this.state.userStories)
  const userStories = [...this.state.userStories]

  this.setState({ userStories })
  axios.put("http://localhost:3000/backlogProject/updateUserStory/5cbc4de40942e908ec256b88/"+idx,{
    priority: this.state.userStories.priority,
    timeestimation:this.state.userStories.timeestimation})
  .then((response) => {
    
    console.log("updated");
  })
  .catch(error => {
    console.log(error);
  });
 
}
handleRemoveSpecificRow = (idx) => () => {
  console.log("iii"+idx)
  const userStories = [...this.state.userStories]
  userStories.splice(idx, 1)
  this.setState({ userStories })
  axios.put("http://localhost:3000/backlogProject/delete/5cbc3978f5fbbe338870a59a/"+idx)
  .then((response) => {
    
    console.log("deleted");
  })
  .catch(error => {
    console.log(error);
  });
 
}
componentDidMount() {
  var self = this;
  axios.get("http://localhost:3000/project/getBacklog/5cbad555e7622d2ab4868c60")
    .then((response) => {
      console.log(response.data[0].userstories[0]);
      
      self.setState({
          userStories:response.data[0].userstories,
          ID:response.data[0]._id,
      })
      console.log(this.state.ID);
      console.log("aaa"+this.state.userStories);
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
                    <th>User Stroy</th>
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
              <td hidden> <Input type="text" id="_id" name="_id" value={this.state.userStories._id} placeholder={userstory._id}
                                                   onChange={this.onChange}/></td>
              <td><Input type="text" id="_id" name="_id" value={this.state.userStories.userstory} placeholder={userstory.userStory}
                                                   onChange={this.onChange}/></td>
              <td><Input type="text" id="_id" name="_id" value={this.state.userStories.priority} placeholder={userstory.priority}
                                                   onChange={this.onChange}/> </td>
              <td><Input type="text" id="_id" name="_id" value={this.state.userStories.timeestimation} placeholder={userstory.timeestimation}
                                                   onChange={this.onChange}/></td>
               <td> <Button block color="primary" onClick={this.handleUpdateSpecificRow(userstory._id)}>Edit</Button></td>
              <td><Button block color="danger" onClick={this.handleRemoveSpecificRow(userstory._id)}>Delete</Button></td>
          
                    
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
