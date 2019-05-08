import React, { Component } from 'react';
import { Badge, Card, CardBody, CardFooter, CardHeader, Col, Row, Collapse, Fade } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import axios from "axios";
class AllReleases extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      
      releases:[{
        goals:'',
    status:'',
    startingDate:'',
    releaseDate:'',
    numberSprint:'',
    userstories: []
      }
      ]
    };
  }
  onChange = idx => e => {
    const { name, value } = e.target;
    const releases = [...this.state.releases];
    releases[idx] = {
      [name]: value
    };
    this.setState({
      releases
    });
  }
  componentDidMount(e) {
    var self = this;
    axios.get("http://localhost:3000/release")
      .then((response) => {
        console.log(response.data);
       
        self.setState({
          releases:response.data})
        console.log(this.state.releases);
      })
      .catch(error => {
        console.log(error);
      })
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
        {
                      this.state.releases.map((release,idx) => {
                        var d2 = new Date(release.releaseDate);
                        var formattedDate2 =  d2.getFullYear()+"-" + (d2.getMonth() + 1) + "-" + d2.getDate() 

                     return (
          <Col xs="12" sm="6" md="4"  key={idx}>
            <Card className="text-white bg-primary">
              <CardHeader>
                Release {idx+1}
              </CardHeader>
              <CardBody style={{backgroundColor:"white",color:"black"}}>
               <p >Goals : {this.state.releases[idx].goals}</p> 
               <p>Status: {this.state.releases[idx].status}</p> 
               <p>Number of Sprints: {this.state.releases[idx].numberSprint}</p> 
               <p>Release Date: {formattedDate2}</p> 
               
                
              </CardBody>
            </Card>
          </Col>
                     ) }) }
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
