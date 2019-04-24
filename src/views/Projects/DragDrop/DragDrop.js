import React,{Component} from 'react'

import {ListGroup,ListGroupItem,Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table ,Button} from 'reactstrap';
import axios from "axios";
import {

  CardFooter,

  
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label
} from 'reactstrap';
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
          title:'',
          goals:"",
          status:"unstarted",
          startingDate:null,
          releaseDate:null,
          numberSprint:"",
          userstories:[],
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
    onChange(e) {
      e.preventDefault() 
      this.setState({
        [e.target.name] : e.target.value,
       
      })
  }
  componentDidMount() {
    
  }
    onSubmit(p) {
      p.preventDefault() 
      const data = this.state
      console.log(data)
      axios.post('http://localhost:3000/release/addRelease/5c9609a16bbc9f17c0c0d734',{
        title: this.state.title,
        goals:this.state.goals,
        status:this.state.status,
        numberSprint:this.state.numberSprint,
        releaseDate:this.state.releaseDate,
        startingDate:this.state.startingDate,
        project:"5c9609a16bbc9f17c0c0d734"
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          
          console.log('release added')
          alert('release added')
        }
      })
      .catch(function(error){
        console.log(error);
      });
  
  
  
      this.setState({
      })
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
         
                    
              <div style={styles.droppable}>
              <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <strong>Add New Release</strong>
              </CardHeader>
              <form name="form" onSubmit={this.onSubmit}>
              <CardBody>
                
                <FormGroup >
                <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Title</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="title" name="title" value={this.state.title}
                      onChange={this.onChange}/>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Goals</InputGroupText>
                      </InputGroupAddon>
                      <Input type="textarea" id="goals" name="goals" value={this.state.goals}
                                                   onChange={this.onChange} />
                    </InputGroup>
                </FormGroup>

                <FormGroup>
                <FormGroup>
                <InputGroup>
                <InputGroupAddon addonType="prepend">
                      <InputGroupText>Starting date</InputGroupText>
                    </InputGroupAddon>
                    <Input type="Date" id="startingDate" name="startingDate" value={this.state.startingDate}
                                                 onChange={this.onChange}/>
                  </InputGroup> 
              </FormGroup>
              
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                      <InputGroupText>Release date</InputGroupText>
                    </InputGroupAddon>
                    <Input type="Date" id="releaseDate" name="releaseDate" value={this.state.releaseDate}
                                                 onChange={this.onChange}/>
                  </InputGroup> 
              </FormGroup>
              <FormGroup>
              <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Number of sprints</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="numberSprint" name="numberSprint" value={this.state.numberSprint}
                                                   onChange={this.onChange}/>
                    </InputGroup>
                </FormGroup>
              
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
                  
               
                    
                 
                  </tbody>
                </Table>
               
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      </div>  
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
              </div>
              </CardBody>
              <CardFooter style={{display: 'flex', justifyContent: 'center'}}>
                <Button  type="submit" size="m" color="primary"><i className="fa fa-dot-circle-o"></i> Add Release</Button>
                <Button  type="reset" size="m"  color="danger"><i className="fa fa-ban"></i> Cancel</Button>
              </CardFooter>
              </form>
            </Card>
          </Col>
        </Row>
      </div>
          </div>
         
        )
    }

}

export default DragDrop;