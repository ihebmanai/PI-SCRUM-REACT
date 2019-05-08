import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

import axios from "axios";
class AllIssues extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      scrumMasterName:'',
      title : '',
      type:'',
      createdDate :'',
      description :'',
      status: '',
      priority:'',
      language:'',
      issues:[],
      project:''
      
    }
  }
  onChange = idx => e => {
    const { name, value } = e.target;
    const issues = [...this.state.issues];
    issues[idx] = {
      [name]: value
    };
    this.setState({
      issues
    });
  }
  componentDidMount(e) {
    var self = this;
    axios.get("http://localhost:3000/issue/project/5cd2e2618cfe9f3b20add864")
      .then((response) => {
        console.log(response.data);
       
        self.setState({
          issues:response.data})
        console.log(this.state.issues);
      })
      .catch(error => {
        console.log(error);
      })
    

      
     
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
                    <th>Title</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Created Date</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Language</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                      this.state.issues.map((issue,idx) => {
                        var d = new Date(issue.createdDate);
                        var formattedDate =  d.getFullYear()+"-" + (d.getMonth() + 1) + "-" + d.getDate() 
                       var c="success"
                        if ((issue.status) == "not solved")
                        c="danger"

                     return (
                  <tr key={idx}>
                    <td>{this.state.issues[idx].title}</td>
                    <td>{this.state.issues[idx].type}</td>
                    <td>{this.state.issues[idx].description}</td>
                    <td>{formattedDate}</td>
                    <td>{this.state.issues[idx].priority}</td>
                    <td>{this.state.issues[idx].status}</td>
                    <td>{this.state.issues[idx].language}</td>
                    <td>
                     
                   
                      <Badge color={c}>{issue.status}</Badge>
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

export default AllIssues;
