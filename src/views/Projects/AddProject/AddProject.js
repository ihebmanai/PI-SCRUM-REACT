import React, { Component } from 'react';
import axios from "axios";
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
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
  Label,
  Row,
} from 'reactstrap';

class AddProject extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      projectName: '',
      key:'',
      status:'not started',
      description:'',
      scrumMaster:''
      
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
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
    axios.post('http://localhost:3000/project/add/5cbacf5e75c4bc1df0a5bf6e',{
      projectName: this.state.projectName,
      key:this.state.key,
      status:this.state.status,
      description:this.state.description,
      scrumMaster:this.state.scrumMaster
    })
    .then(function (response) {
      console.log(response);
      if (response.status === 201) {
        
        console.log('project added')
        alert('project added')
      }
    })
    .catch(function(error){
      console.log(error);
    });



    this.setState({
    })
}
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <strong>Add New Project</strong>
              </CardHeader>
              <form name="form" onSubmit={this.onSubmit}>
              <CardBody>
                
                <FormGroup >
                <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Project Name</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="projectName" name="projectName" value={this.state.projectName}
                                                   onChange={this.onChange}/>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Key</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="key" name="key" value={this.state.key}
                                                   onChange={this.onChange}/>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Description</InputGroupText>
                      </InputGroupAddon>
                      <Input type="textarea" id="description" name="description" value={this.state.description}
                                                   onChange={this.onChange} />
                    </InputGroup>
                </FormGroup>
               { /*} <FormGroup row className="my-0">
                  <Col xs="6">
                  <FormGroup>
                  <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Starting date</InputGroupText>
                      </InputGroupAddon>
                      <Input type="Date" id="startingDate" name="startingDate" value={this.state.project.startingDate}
                                                   onChange={this.onChange} />
                    </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                  <FormGroup>
                  <InputGroup>
                  <InputGroupAddon addonType="prepend">
                        <InputGroupText>End date</InputGroupText>
                      </InputGroupAddon>
                      <Input type="Date" id="endDate" name="endDate" value={this.state.project.endDate}
                                                   onChange={this.onChange}/>
                    </InputGroup>
                </FormGroup>
                  </Col>
                </FormGroup>
               */}
                <FormGroup>
                <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Scrum Master </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="scrumMaster" name="scrumMaster" value={this.state.scrumMaster}
                                                   onChange={this.onChange} />
                    </InputGroup>
                </FormGroup>
              
              </CardBody>
              <CardFooter style={{display: 'flex', justifyContent: 'center'}}>
                <Button  type="submit" size="m" color="primary"><i className="fa fa-dot-circle-o"></i> Add Project</Button>
                <Button  type="reset" size="m"  color="danger"><i className="fa fa-ban"></i> Cancel</Button>
              </CardFooter>
              </form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AddProject;
