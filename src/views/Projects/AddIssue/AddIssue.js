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

class AddIssue extends Component {
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
      title : '',
      type:'',
      createdDate :'',
      description :'',
      status: 'not solved',
      language:'',
      projects:[],
      project:''
      
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
  axios.get("http://localhost:3000/project")
    .then((response) => {
      console.log(response)
      let p = response.data.map(pr => { return {value: pr._id, display: pr.projectName + " "+pr.key} })
      this.setState({ projects: [{value: '', display: 'Select the project'}].concat(p) });
    })
    .catch(error => {
      console.log(error);
    });
}
  onSubmit(p) {
    p.preventDefault() 
    const data = this.state
    console.log(data)
    let today = new Date();
    let date1=today.getFullYear() + "-0"+parseInt(today.getMonth()+1)+"-"+ parseInt(today.getDate())
    this.setState({createdDate:date1})
    axios.post('http://localhost:3000/issue/add/5cbacf5e75c4bc1df0a5bf6e',{
      title: this.state.title,
      description:this.state.description,
      status:this.state.status,
      project:this.state.project,
      language:this.state.language,
      createdDate:this.state.createdDate,
      type:this.state.type
    })
    .then(function (response) {
      console.log(response);
      if (response.status === 201) {
        
        console.log('issue added')
        alert('issue added')
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
                <strong>Add New Issue</strong>
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
                        <InputGroupText>Description</InputGroupText>
                      </InputGroupAddon>
                      <Input type="textarea" id="description" name="description" value={this.state.description}
                                                   onChange={this.onChange} />
                    </InputGroup>
                </FormGroup>

                <FormGroup>
                <InputGroupText>Type</InputGroupText>
                <Input type="select" name="type" id="type" 
                value={this.state.type} 
              onChange={(e) => this.setState({type: e.target.value})}>
              <option key='' >Select a type</option>
              <option key='task' >task</option>
              <option key ='sub-task'>sub-task</option>
              <option key='bug'>bug</option>
              <option key='story'>story </option>
              <option key='epic'>epic</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <InputGroupText>Language</InputGroupText>
                <Input type="select" name="language" id="language"
                value={this.state.language} 
              onChange={(e) => this.setState({language: e.target.value})}>
              <option key='' >Select a language</option>
              <option key='java' >java</option>
              <option key ='angular' >angular</option>
              <option key='php'>php</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <InputGroupText>Project</InputGroupText>
                <Input type="select" name="project" id="project" 
                value={this.state.project} 
              onChange={(e) => this.setState({project: e.target.value})}>
               {this.state.projects.map((p) => <option key={p.value} value={p.value}>{p.display}</option>)} 
               
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
                <Button  type="submit" size="m" color="primary"><i className="fa fa-dot-circle-o"></i> Add Issue</Button>
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

export default AddIssue;
