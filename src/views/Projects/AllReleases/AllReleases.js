import React, { Component } from 'react';
import { Badge, Card, CardBody, CardFooter, CardHeader, Col, Row, Collapse, Fade } from 'reactstrap';
import { AppSwitch } from '@coreui/react'

class AllReleases extends Component {
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
          <Col xs="12" sm="6" md="4">
            <Card className="text-white bg-primary">
              <CardHeader>
                Release 1 
              </CardHeader>
              <CardBody style={{backgroundColor:"white",color:"black"}}>
               <p>Project: Java project</p> 
               <p>Goals: Develop an e-learning platfomr with java</p>
               <p>Status:Not started</p>
                <p>Starting date: 2019-05-01</p>
                <p>Release date:2019-09-30</p>
                <p>Number of sprints:5</p>
                
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card className="text-white bg-success">
              <CardHeader>
                Release 2
              </CardHeader>
              <CardBody style={{backgroundColor:"white",color:"black"}}>
              <p>Project: Java project</p> 
               <p>Goals: Develop an e-learning platfomr with java</p>
               <p>Status:Not started</p>
                <p>Starting date: 2019-05-01</p>
                <p>Release date:2019-09-30</p>
                <p>Number of sprints:5</p>
              </CardBody>
            </Card>
          </Col>
        
          <Col xs="12" sm="6" md="4">
            <Card className="text-white bg-danger">
              <CardHeader>
                Release 3
              </CardHeader>
              <CardBody style={{backgroundColor:"white",color:"black"}}>
              <p>Project: Java project</p> 
               <p>Goals: Develop an e-learning platfomr with java</p>
               <p>Status:Not started</p>
                <p>Starting date: 2019-05-01</p>
                <p>Release date:2019-09-30</p>
                <p>Number of sprints:5</p>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
              <Card>
                <CardHeader>
                  Release 4
                  <div className="card-header-actions">
                    {/*eslint-disable-next-line*/}
                    <a href="#" className="card-header-action btn btn-setting"><i className="icon-settings"></i></a>
                    {/*eslint-disable-next-line*/}
                    <a className="card-header-action btn btn-minimize" data-target="#collapseExample" onClick={this.toggle}><i className="icon-arrow-up"></i></a>
                    {/*eslint-disable-next-line*/}
                    <a className="card-header-action btn btn-close" onClick={this.toggleFade}><i className="icon-close"></i></a>
                  </div>
                </CardHeader>
                <Collapse isOpen={this.state.collapse} id="collapseExample">
                  <CardBody style={{backgroundColor:"white",color:"black"}}>
                  <p>Project: Java project</p> 
               <p>Goals: Develop an e-learning platfomr with java</p>
               <p>Status:Not started</p>
                <p>Starting date: 2019-05-01</p>
                <p>Release date:2019-09-30</p>
                <p>Number of sprints:5</p>
                  </CardBody>
                </Collapse>
              </Card>
            </Fade>
          </Col>

        </Row>
      </div>
    );
  }
}

export default AllReleases;
