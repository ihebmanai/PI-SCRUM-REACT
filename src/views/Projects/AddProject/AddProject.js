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
      smasters:[],
      projectName: '',
      startingDate:'',
      endDate:'',
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

componentDidMount() {
  axios.get("http://localhost:3000/user")
    .then((response) => {
      console.log(response)
      let sc = response.data.map(smaster => { return {value: smaster._id, display: smaster.firstName + " "+smaster.lastName} })
      this.setState({ smasters: [{value: '', display: 'Select scrum master'}].concat(sc) });
    })
    .catch(error => {
      console.log(error);
    });
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
      scrumMaster:this.state.scrumMaster,
      startingDate:this.state.startingDate,
      endDate:this.state.endDate
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
               <FormGroup row className="my-0">
                  <Col xs="6">
                  <FormGroup>
                  <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Starting date</InputGroupText>
                      </InputGroupAddon>
                      <Input type="Date" id="startingDate" name="startingDate" value={this.state.startingDate}
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
                      <Input type="Date" id="endDate" name="endDate" value={this.state.endDate}
                                                   onChange={this.onChange}/>
                    </InputGroup> 
                </FormGroup>
                  </Col>
                </FormGroup>
            
                <FormGroup>
                <InputGroupText>Scrum Master</InputGroupText>
                <Input type="select" name="scrumMaster" id="scrumMaster" 
                value={this.state.scrumMaster} 
              onChange={(e) => this.setState({scrumMaster: e.target.value})}>
                {this.state.smasters.map((sc) => <option key={sc.value} value={sc.value}>{sc.display}</option>)}
                </Input>
              </FormGroup>
               {/*}
                <FormGroup>
                <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Scrum Master </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="scrumMaster" name="scrumMaster" value={this.state.scrumMaster}
                                                   onChange={this.onChange} />
                    </InputGroup>
                </FormGroup>
             {} */ }
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
