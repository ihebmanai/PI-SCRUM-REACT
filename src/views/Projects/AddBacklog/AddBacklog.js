import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col,Modal, ModalBody, ModalFooter, ModalHeader, Pagination, PaginationItem, PaginationLink, Row, Table ,Button,Input} from 'reactstrap';
import axios from "axios";
class AddBacklog extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      modal: false,
      danger: false,
      ID:'',
      _id:'',
      userstory:'',
      p:'',
      t:'',
      userstories:[{
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
    onChange (event){
      event.preventDefault() 
      this.setState({
        [event.target.name] : event.target.value,
       
      })
    }
    onSubmit(p) {
      var self=this
      p.preventDefault() 
      const data = this.state
      console.log(data)
      axios.put('http://localhost:3000/backlogProject/addUserStory/5c96402f20a9240ec8f5c590',{
        
        userStory: this.state.userstory,
        priority:this.state.p,
        timeestimation:this.state.t
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          const i={
            userStory: self.state.userstory,
            priority:self.state.p,
            timeestimation:self.state.t
           }
           
         
         alert("User story has been added!")
       
         self.setState({
          userstories:[...self.state.userstories,i],
          userstory:'',p:'',t:''
          
        })
        }
      })
      .catch(function(error){
        console.log(error);
      });
      this.setState({
        
      });
    }
  

componentDidMount(e) {

  var self = this;
  axios.get("http://localhost:3000/project/getBacklog/5cc23892b8a2c809c0998415")
    .then((response) => {
      console.log(response.data[0]);
      self.setState({
        userstories:response.data[0].userstories,
        ID:response.data[0]._id,})
      console.log(this.state.userstories);
    
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
              <form name="form" onSubmit={this.onSubmit}>
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
                    this.state.userstories.map((userstory,idx) => {
          return (
            <tr key={idx}>
              <td><Input type="text" id="userStory" name="userStory" value={this.state.userStory} placeholder={userstory.userStory}
                                                   onChange={this.onChange} disabled/></td>
              <td><Input type="text" id="priority" name="priority" value={this.state.priority} placeholder={userstory.priority}
                                                   onChange={this.onChange} disabled/> </td>
              <td><Input type="text" id="timeestimation" name="timeestimation" value={this.state.timeestimation} placeholder={userstory.timeestimation}
                                                   onChange={this.onChange} disabled/></td>
                    <td> <Button block color="primary" disabled>Add user story</Button></td>
              <td><Button block color="danger"  onClick={this.toggleDanger} disabled>Cancel</Button></td>
              </tr>
                     ) }) }
                     <tr >
              <td><Input type="text" id="userstory" name="userstory" value={this.state.userstory} 
                                                   onChange={this.onChange}/></td>
              <td><Input type="text" id="p" name="p" value={this.state.p} 
                                                   onChange={this.onChange}/> </td>
              <td><Input type="text" id="t" name="t" value={this.state.t}
                                                   onChange={this.onChange}/></td>
               <td> <Button block color="primary" >Add user story</Button></td>
              <td><Button block color="danger"  onClick={this.toggleDanger} >Cancel</Button></td>
              
              
              </tr>
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
              </form>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default AddBacklog;
