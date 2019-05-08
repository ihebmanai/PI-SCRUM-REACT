import React, { Component, Suspense } from 'react';

import { Button, Card,Alert, CardBody, Container,CardHeader ,Badge,Collapse} from 'reactstrap';
import moment from "moment";

import {
    AppAside,
    AppBreadcrumb,
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav,
  } from '@coreui/react';
  import PropTypes from 'prop-types';
  import axios from "axios";
  import toast from 'toasted-notes' ;

  import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import navigation from '../../_nav';
import routes from '../../routes';

const DefaultAside = React.lazy(() => import('../../containers/DefaultLayout/DefaultAside'));
const DefaultFooter = React.lazy(() => import('../../containers/DefaultLayout/DefaultFooter'));
const DefaultHeader = React.lazy(() => import('../../containers/DefaultLayout/DefaultHeader'));


const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DetailsMeeting extends Component {
  constructor(props) {
    super(props);
    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.toggleCustom = this.toggleCustom.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: false,
      accordion: [true, false, false],
      custom: [true, true,true,true,true],
      status: 'Closed',
      fadeIn: true,
      timeout: 300,
      meeting : [],
      value: '',
      date: new Date(),
      titleError:'',
      titleLengthError:''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  
  
  onEntering() {
    this.setState({ status: 'Opening...' });
  }

  onEntered() {
    this.setState({ status: 'Opened' });
  }

  onExiting() {
    this.setState({ status: 'Closing...' });
  }

  onExited() {
    this.setState({ status: 'Closed' });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleAccordion(tab) {

    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      accordion: state,
    });
  }

  toggleCustom(tab) {

    const prevState = this.state.custom;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      custom: state,
    });
  }

  toggleFade() {
    this.setState({ fadeIn: !this.state.fadeIn });
  }
componentDidMount() {
    console.log('recuperation du details du meeting'+this.props.match.params.id)
    axios.get('http://localhost:3000/meetings/id/'+this.props.match.params.id).then((response)=>{
       this.setState({
         meeting : response.data
       })
       console.log(this.state.meeting)
      });

}

validate = () =>{
  let titleError =" Title is required"
  let titleLengthError="Length of title must be > 10 letters" 
  
  if(this.state.value==="") {
    this.setState({
        titleError
    })
    return false
  }
  
  if(this.state.value.length<10) {
    this.setState({
        titleLengthError
    })
    return false
  }
  
  return true
    } 
  

handleInputChange = (event) => {
  event.preventDefault() 
  console.log(event)
  console.log(event.target.name)
  console.log(event.target.value)
  this.setState({
    [event.target.name] : event.target.value
  })
}
handleChange(event) {
  console.log(event)
  this.setState({value: event.target.value});
  console.log(this.state.value)
}

handleSubmit = (event) => {
  event.preventDefault() 
  const isValid = this.validate();
  if(isValid) {
    
  const data = this.state
  console.log(data)
  axios.put('http://localhost:3000/meetings/addFeedBack/'+this.props.match.params.id, {
       feedback:this.state.value,
      
  })
  .then(function (response) {
    console.log(response);
    if (response.status === 200) {
      
      console.log('Ajout feed back successfully');
      [
          
        'top-right', 
        
      ].forEach(position => {
        toast.notify("Meeting Created Successfully ", {
          position
        });
      });
       
       this.props.history.push('/meeting');
      }
    
    
  
  })
  .catch(function (error) {
    console.log(error);
  });
}

}

loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    render() {
     
      
      
          return (
            <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={navigation} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
            
                
                
                {moment(this.state.date).isAfter(moment(this.state.meeting.date))  ?  
                <Alert color="danger">
                   this meeting is left  ...........!
                </Alert> :
                      
                      <Alert color="primary">
                  Be prepared for This Meeting  ........!
                </Alert>
                       
                       }
              <Suspense fallback={this.loading()}>
             
              <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Details :  <small>Meeting</small>
                <div className="card-header-actions">
                {this.state.meeting.feedback !== ' ' ? <Badge pill color="success" className="float-right">Feedback Added sccessfully</Badge> :
                      <Badge pill color="warning" className="float-right">FeedBack Not added</Badge>
                        }
                </div>
              </CardHeader>
              <CardBody>
                <div id="exampleAccordion" data-children=".item">
                  <div className="item">
                    <Button className="m-0 p-0" color="link" onClick={() => this.toggleCustom(0)} aria-expanded={this.state.custom[0]} aria-controls="exampleAccordion1">
                      Title
                    </Button>
                    <Collapse isOpen={this.state.custom[0]} data-parent="#exampleAccordion" id="exampleAccordion1">
                      <p className="mb-3">
                        {this.state.meeting.title}
                      </p>
                    </Collapse>
                  </div>
                  <div className="item">
                    <Button className="m-0 p-0" color="link" onClick={() => this.toggleCustom(1)} aria-expanded={this.state.custom[1]} aria-controls="exampleAccordion2">
                      Date :
                    </Button>
                    <Collapse isOpen={this.state.custom[1]} data-parent="#exampleAccordion" id="exampleAccordion2">
                      <p className="mb-3">
                        {this.state.meeting.date}
                      </p>
                    </Collapse>
                  </div>

                  <div className="item">
                    <Button className="m-0 p-0" color="link" onClick={() => this.toggleCustom(2)} aria-expanded={this.state.custom[2]} aria-controls="exampleAccordion2">
                      Start Date :
                    </Button>
                    <Collapse isOpen={this.state.custom[2]} data-parent="#exampleAccordion" id="exampleAccordion3">
                      <p className="mb-3">
                        {this.state.meeting.startDate}
                      </p>
                    </Collapse>
                  </div>

                  <div className="item">
                    <Button className="m-0 p-0" color="link" onClick={() => this.toggleCustom(3)} aria-expanded={this.state.custom[3]} aria-controls="exampleAccordion2">
                    Duree :
                    </Button>
                    <Collapse isOpen={this.state.custom[3]} data-parent="#exampleAccordion" id="exampleAccordion4">
                      <p className="mb-3">
                        {this.state.meeting.duree}
                      </p>
                    </Collapse>
                  </div>

                  <div className="item">
                    <Button className="m-0 p-0" color="link" onClick={() => this.toggleCustom(4)} aria-expanded={this.state.custom[4]} aria-controls="exampleAccordion1">
                      FeedBack: 
                    </Button>
                    
                    <Collapse isOpen={this.state.custom[4]} data-parent="#exampleAccordion" id="exampleAccordion5">
                      
                      {this.state.meeting.feedback !== ' ' ? <p className="mb-3">{this.state.meeting.feedback}</p> :
                      <div>
                        <center>
                        <div style={{color:"red"}}>{this.state.titleError} </div>
                        <div style={{color:"red"}}>{this.state.titleLengthError} </div>
                        <form onSubmit={this.handleSubmit}>
                        <textarea value={this.state.value} onChange={this.handleChange} rows="5" cols="100" />
                        <br></br>
                        <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Add FeedBack</Button>
                        </form>
                        </center>
                        </div>
                        }
                        

                        <br>
                        </br>
                        <br></br>
                        
                        
                      
                      
                    </Collapse>
                    
                  </div>

               <center>   <Link className="btn-pill btn btn-success btn-sm" to={`/inviteMeeting/${this.state.meeting._id}`}>Invite Members To This Meeting...</Link></center>
                

                </div>

                
              </CardBody>
            </Card>
            
             
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
        
      </div>
          );
        }
    }

    export default DetailsMeeting;