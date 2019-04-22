import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

import axios from "axios";
class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  componentDidMount(e) {
    var self = this;
    axios.get("http://localhost:3000/project")
      .then((response) => {
        console.log(response.data[0]);
        self.setState({
          projects:response.data[0]})
        console.log(this.state.projects);
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
            return (
                  <tr key={idx}>
                    <td>{project.projectName}</td>
                    <td>{project.key}</td>
                    <td>{project.description}</td>
                    <td>{project.startingDate}</td>
                    <td>{project.endDate}</td>
                    <td>{project.prductOwner}</td>
                    <td>{project.scrumMaster}</td>
                    <td>
                      <Badge color="success">{project.status}</Badge>
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
