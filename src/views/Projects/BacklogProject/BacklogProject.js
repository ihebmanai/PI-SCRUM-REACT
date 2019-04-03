import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table ,Button} from 'reactstrap';

class BacklogProject extends Component {
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
                    <td>1</td>
                    <td>As a user I want to reset my password</td>
                    <td>1</td>
                    <td>1</td>
                    <td><Button block color="primary">Edit</Button></td>
                    <td> <Button block color="danger">Delete</Button></td>
                  </tr>
                  <tr>
                  <td>2</td>
                    <td>As a user I want to edit my profile</td>
                    <td>1</td>
                    <td>12</td>
                    <td><Button block color="primary">Edit</Button></td>
                    <td> <Button block color="danger">Delete</Button></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>As a user I want to buy products</td>
                    <td>1</td>
                    <td>20</td>
                    <td><Button block color="primary">Edit</Button></td>
                    <td> <Button block color="danger">Delete</Button></td>
                  </tr>
                  <tr>
                  <td>4</td>
                    <td>As a user I want to cancel my order</td>
                    <td>2</td>
                    <td>15</td>
                    <td><Button block color="primary">Edit</Button></td>
                    <td> <Button block color="danger">Delete</Button></td>
                  </tr>
                  <tr>
                  <td>5</td>
                    <td>As a user I want to update my order</td>
                    <td>4</td>
                    <td>12</td>
                    <td><Button block color="primary">Edit</Button></td>
                    <td> <Button block color="danger">Delete</Button></td>
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
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default BacklogProject;
