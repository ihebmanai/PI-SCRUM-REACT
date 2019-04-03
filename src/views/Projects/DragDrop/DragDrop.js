import React,{Component} from 'react'

import {ListGroup,ListGroupItem,Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table ,Button} from 'reactstrap';

import { Nav, NavItem, NavLink } from 'reactstrap';

const styles = {
  left : {
    width: '550px',
    height: '150px',
    border: '1px solid #DCDCDC',

    backgroundColor:'white'
  },
  right : {
    width: '550px',
    height: '150px',
    border: '1px solid #DCDCDC',
    float: 'left',
    marginLeft: '40px'
  },
  droppable : {
    backgroundColor:'white'
  },
  para : {
    marginRight: '11px',
    border: '1px solid #DCDCDC',
    padding: '12px 16px',
    borderRadius: '50%',
    width: '15px',
    float : 'left'
  }
}

class DragDrop extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          items : [
            { ID : 1, UserStory : "As a user I want to reset my password   ",Priority:"1",TimeEstimation:"15" },
            { ID : 2, UserStory : "As a user I want to edit my profile  ",Priority:"2",TimeEstimation:"13"},
            { ID : 3, UserStory : "As a user I want to cancel my order   ",Priority:"2",TimeEstimation:"15" },
            { ID : 4, UserStory : "As a user I want to update my order  ",Priority:"4",TimeEstimation:"12" }
          ],
          rightContainer : [],
          leftContainer : []
        }
    }
    
    onDragStart = (e,v) =>{
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.setData( "text/plain", v )
    }
    
    allowDrop = ev =>{
        ev.preventDefault();
    }
    
    onDropLeft = e =>{
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        let {leftContainer} = this.state;
        leftContainer.push(data);
        this.setState({ leftContainer });
    }
    
    onDropRight = e =>{
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        let {rightContainer} = this.state;
        rightContainer.push(data);
        this.setState({ rightContainer });
    }

    render() {
        const {items, leftContainer, rightContainer} = this.state;

        return(
          <div>
              <Nav />
              <div style={{ marginTop: '35px' , display:"-webkit-box"}}>
                   
                    
                    
                    <div style={{display : 'inline-block' }}>
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
                  </tr>
                  </thead>
                  <tbody>
                  
                  {
                        items.map((item) =>{
                          return <tr style= {{ backgroundColor:'white'}} draggable="true" onDragStart={ (e) => this.onDragStart(e,
                          [item.ID+" : "+item.UserStory]) } >
                          
                          
                          
                          <td>{item.ID}</td>
                    <td>{item.UserStory}</td>
                    <td>{item.Priority}</td>
                    <td>{item.TimeEstimation}</td>
                  </tr>
                          
                        
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

      </div>  
                    
              <div style={styles.droppable}>
                <div style={styles.left} onDragOver={this.allowDrop} onDrop={this.onDropLeft}>
                <div className="animated fadeIn">
        
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Release 1
              </CardHeader>
              <CardBody>
              <ListGroup>
                  <ListGroupItem action color="success">
                  {
                    leftContainer.map( itm =>{
                      return <tr><p style={{fontSize:'14px', color:'black'}}>{itm}</p><hr></hr></tr>
                    })
                  }
                  </ListGroupItem>
                </ListGroup>
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
               
             </div>

              </div>

                 
               
                <div style={styles.right} onDragOver={this.allowDrop} onDrop={this.onDropRight}>Release 2
                  {
                    rightContainer.map( itm =>{
                      return <p>{itm}</p>
                    })
                  }
                </div>
              </div>
          </div>
        )
    }

}

export default DragDrop;