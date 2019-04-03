import React, { Component } from 'react';
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
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
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
              <CardBody>
                <FormGroup>
                <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Project Name</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="projectName" name="projectName"/>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Key</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="key" name="key"/>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Description</InputGroupText>
                      </InputGroupAddon>
                      <Input type="textarea" id="description" name="description" />
                    </InputGroup>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="6">
                  <FormGroup>
                  <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Starting date</InputGroupText>
                      </InputGroupAddon>
                      <Input type="Date" id="startingDate" name="startingDate" />
                    </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                  <FormGroup>
                  <InputGroup>
                  <InputGroupAddon addonType="prepend">
                        <InputGroupText>End date</InputGroupText>
                      </InputGroupAddon>
                      <Input type="Date" id="endDate" name="endDate" />
                    </InputGroup>
                </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup>
                <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Product Owner</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="productOwner" name="ProductOwner" autoComplete="productOwner" />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Scrum Master </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="ScrumMaster" name="ScrumMaster" autoComplete="ScrumMaster" />
                    </InputGroup>
                </FormGroup>
              </CardBody>
              <CardFooter style={{display: 'flex', justifyContent: 'center'}}>
                <Button  type="submit" size="m" color="primary"><i className="fa fa-dot-circle-o"></i> Add Project</Button>
                <Button  type="reset" size="m"  color="danger"><i className="fa fa-ban"></i> Cancel</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AddProject;
