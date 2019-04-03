import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

class ProjectList extends Component {
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
                  <tr>
                    <td>Java Project</td>
                    <td>JP</td>
                    <td>New Java Project</td>
                    <td>2019/01/01</td>
                    <td>2019/05/01</td>
                    <td>Mohamed ben Ali</td>
                    <td>Mariem Ayari</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Node Project</td>
                    <td>NP</td>
                    <td>New Node Project</td>
                    <td>2019/02/01</td>
                    <td>2019/06/01</td>
                    <td>Ali</td>
                    <td>Mariem Ben Salah</td>
                    <td>
                      <Badge color="secondary">Inactive</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Scrum Project</td>
                    <td>SP</td>
                    <td>Scrum Project Manager Platform</td>
                    <td>2019/03/01</td>
                    <td>2019/07/01</td>
                    <td>Nabil Ben Ali</td>
                    <td>Mariem Ayari</td>
                    <td>
                      <Badge color="warning">Pending</Badge>
                    </td>
                  </tr>
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
