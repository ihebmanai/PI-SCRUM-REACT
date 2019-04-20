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
      id:'',
      userStory:'',
      priority:'',
      timeEstimation:''
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
      self.setState({
          userStories:response.data[0].userStories,
          ID:response.data[0]._id,
      })
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
                    <th>ID</th>
                    <th>User Stroy</th>
                    <th>Priority</th>
                    <th>Time Estimation</th>
                    <th></th>
                    <th></th>
                    </tr>
                    </thead>
                    <tbody>
                  <tr>
                  {this.state.userStories.map((us) => {
                return (
                    <div>
                    <td>{us._id}</td>
                    <td>{us.priority}</td>
                    <td>{us.userStory}</td>
                    <td>1</td>
                    <td><Button block color="primary">Edit</Button></td>
                    <td> <Button block color="danger">Delete</Button></td>
                    </div>
                )
            })}
                  
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

export default BacklogProject;
