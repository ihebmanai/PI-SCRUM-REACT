import React, { Component, Suspense } from 'react';
import { Redirect, Switch  } from 'react-router-dom';
import moment from "moment";
import FlashMassage from 'react-flash-message';

import PropTypes from 'prop-types';
import axios from 'axios';
import Moment from 'react-moment';

import toast from 'toasted-notes' ;
import 'toasted-notes/src/styles.css';




import Users from '../../views/Users/Users';
import CreateMeeting from '../../components/meetingComponents/CreateMeeting';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

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
import { Container, Table,CardBody,Row,Col,Card,CardHeader,Button,Badge,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import navigation from '../../_nav';
import routes from '../../routes';

const DefaultAside = React.lazy(() => import('../../containers/DefaultLayout/DefaultAside'));
const DefaultFooter = React.lazy(() => import('../../containers/DefaultLayout/DefaultFooter'));
const DefaultHeader = React.lazy(() => import('../../containers/DefaultLayout/DefaultHeader'));



const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

//this.props.match.params.id

class Meetings extends Component {

  state = {
    meetings : [],
    date: new Date(),
    username :''
  }

  componentWillMount() {
      console.log('Recuperation des données : meetings')
      axios.get('http://localhost:3000/meetings').then((response)=>{
       this.setState({
         meetings : response.data
       })
       console.log(this.state.meetings)
      
      });
  }

  getScrumMaster(id) {

    console.log('Recuperation des données : scrum master')
    axios.get('http://localhost:3000/user/'+id).then((response)=>{
     
     console.log(response.data)
     this.setState({
       username:response.data.username
     })
    } );
}

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }


  handleClickDelete(id) {
   console.log('id'+id)
  // console.log(event.target.getAttribute('index'));
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>{
            axios.delete('http://localhost:3000/meetings/delete/'+id).then((response)=>{
           this.componentWillMount();

           [
          
            'bottom-right'
            
          ].forEach(position => {
            toast.notify("Meeting Deleted Successfully ", {
              position
            });
          });
       console.log(this.meetings)
      });
          }
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    });
    console.log(this.state.date)
  }

  handleClickPasse() {
  
    console.log('Recuperation des données : meetings Passe')
    axios.get('http://localhost:3000/meetings/passe').then((response)=>{
     this.setState({
       meetings : response.data
     })
     console.log(this.state.meetings)
    });
    
   
   }

   handleClickFutur() {
  
    console.log('Recuperation des données : meetings Futur')
    axios.get('http://localhost:3000/meetings/Futur').then((response)=>{
     this.setState({
       meetings : response.data
     })
     console.log(this.state.meetings)
    });
    
   
   }

   handleClickToday() {
  
    console.log('Recuperation des données : meetings Futur')
    axios.get('http://localhost:3000/meetings/now').then((response)=>{
     this.setState({
       meetings : response.data
     })
     console.log(this.state.meetings)
    });
    
   
   }
  
  render() {
    let scrum=[];
    let meetings = this.state.meetings.map((meeting) => {

     
    
      return (
      

         

<Col xs="12" sm="6" md="4">
<Card key={meeting._id.toString()} >
  <CardHeader className="text-white bg-info">
 <h5>  {meeting.title}</h5> <center> {moment(this.state.date).isAfter(moment(meeting.date))  ?  <Badge className="mr-1" color="danger">Passed</Badge> :
                      
                      <Badge className="mr-1" color="success">En Cours</Badge>
                       
                       }</center>
    <div className="card-header-actions">
      <Badge pill color="danger" className="float-right">{meeting.duree}</Badge>
    </div>
  </CardHeader>
  <CardBody>
  <center>
    <h5>Scrum master : Dhiaeddine</h5>
    <h6>Type:{meeting.type}</h6>

    <Moment parse="YYYY-MM-DD HH:mm">
          Date :  {moment(meeting.date).format('YYYY MM DD') } At {meeting.startDate} Am
          </Moment> <br></br>       
    
    <h6>Duree :{meeting.duree} Min</h6>

   
   <Link className="btn-pill btn btn-success btn-sm" to={`/detailsmeeting/${meeting._id}`}>see details</Link>
   <Link className="btn-pill btn btn-warning btn-sm" to={`/updatemeeting/${meeting._id}`}>update</Link>
   <Button color="danger" size="sm" className="btn-pill btn btn-danger btn-sm" onClick={() => this.handleClickDelete(meeting._id)}>Delete</Button>
   {meeting.feedback == ' ' ? <Link aria-pressed="true" class="btn-pill btn btn-light btn-sm active" to={`/inviteMeeting/${meeting._id}`}>invite</Link> :
                      <p></p>
                        }
   
  
   </center>
  </CardBody>
</Card>
</Col>
      )
    })

    return (
     
    <div className="app">
       
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
                <Breadcrumb>
                  {/*eslint-disable-next-line*/}
                  <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
                  <BreadcrumbItem active>Meetings</BreadcrumbItem>
                </Breadcrumb>
            <Container fluid>
              <Suspense fallback={this.loading()}>
             
              
              <Link to="/createmeeting" className="navbar-brand">Create a New Meeting...</Link>
              
              <br></br>
              <center>
              <Button color="danger" size="sm" className="btn-pill btn btn-danger btn-sm" onClick={() => this.handleClickPasse()}>Passed Meetings</Button>                         
              <Button color="success" size="sm" className="btn-pill btn btn-success btn-sm" onClick={() => this.handleClickFutur()}>Incoming Meetings</Button>
                </center>

<br></br>
              <Row> 
              {
                meetings
              }
              </Row>
          
              </Suspense>
              </Container>
         </main>
         </div>

         
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


   
  

export default Meetings;

