import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

import axios from "axios";
class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      scrumMasterName:'',
      prodcutOwnerName:'',
      projects:[{
      projectName: '',
      startingDate:'',
      endDate:'',
      key:'',
      status:'',
      description:'',
      scrumMaster:'',
      productOwner:''
      }]
    }
  }
  onChange = idx => e => {
    const { name, value } = e.target;
    const projects = [...this.state.projects];
    projects[idx] = {
      [name]: value
    };
    this.setState({
      projects
    });
  }
  componentDidMount(e) {
    var self = this;
    axios.get("http://localhost:3000/project")
      .then((response) => {
        console.log(response.data);
       
        self.setState({
          projects:response.data})
        console.log(this.state.projects);
      })
      .catch(error => {
        console.log(error);
      });
      axios.get("http://localhost:3000/user/5c7fc059cf7f4c364c9a306e")
      .then((response) => {
        console.log(response.data);
        var scrumName=response.data.firstName+" "+response.data.lastName
        self.setState({
          scrumMasterName:scrumName})
        console.log(this.state.scrumMasterName);
      })
      .catch(error => {
        console.log(error);
      });
      axios.get("http://localhost:3000/user/5c950997c8fc1f2d846c17e2")
      .then((response) => {
        console.log(response.data);
        var productOwnerrName=response.data.firstName+" "+response.data.lastName
        self.setState({
          productOwnerName:productOwnerrName})
      })
      .catch(error => {
        console.log(error);
      });
      
     
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Projects List
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Key</th>
                    <th>Description</th>
                    <th>Starting Date</th>
                    <th>End Date</th>
                    <th>Product Owner</th>
                    <th>Scrum Master</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                      this.state.projects.map((project,idx) => {
                        var d = new Date(project.startingDate);
                        var formattedDate =  d.getFullYear()+"-" + (d.getMonth() + 1) + "-" + d.getDate() 
                        var d2 = new Date(project.endDate);
                        var formattedDate2 =  d2.getFullYear()+"-" + (d2.getMonth() + 1) + "-" + d2.getDate() 
                        console.log("ddddddddddddd"+formattedDate)
                        var c="success"
                        if ((project.status) == "not started")
                        c="danger"

                     return (
                  <tr key={idx}>
                    <td>{this.state.projects[idx].projectName}</td>
                    <td>{this.state.projects[idx].key}</td>
                    <td>{this.state.projects[idx].description}</td>
                    <td>{formattedDate}</td>
                    <td>{formattedDate2}</td>
                    <td>{this.state.productOwnerName}</td>
                    <td>{this.state.scrumMasterName}</td>
                    <td>
                     
                   
                      <Badge color={c}>{project.status}</Badge>
                    </td>
                  </tr>
                       )})
                       }
            
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default ProjectList;
