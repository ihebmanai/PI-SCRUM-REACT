import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table ,Button} from 'reactstrap';
import axios from "axios";
class BacklogProject extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
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
  console.log(data)
  axios.get('http://localhost:3000/project/getBacklog/5cbad555e7622d2ab4868c60')
  .then(function (response) {
    console.log(response.data);
    
    
  })
  .catch(function(error){
    console.log(error);
  });



  this.setState({
  })
}
componentDidMount() {
  var self = this;
  axios.get("http://localhost:3000/project/getBacklog/5cbad555e7622d2ab4868c60")
    .then((response) => {
      console.log(response.data[0]);
      self.setState({
          userStories:response.data[0].userstories,
          ID:response.data[0]._id,
      })
      console.log(this.state.ID);
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
              <form name="form" onSubmit={this.onSubmit}>
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
                      this.state.userStories.map((userstory,index) => {
            return (
            
              <tr key={index}>
              <td hidden>{userstory._id}</td>
              <td>{userstory.userStory}</td>
              <td>{userstory.priority}</td>
              <td>{userstory.timeestimation}</td>
              <td><Button block color="primary">Edit</Button></td>
                    <td> <Button block color="danger">Delete</Button></td>
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
              </form>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default BacklogProject;
