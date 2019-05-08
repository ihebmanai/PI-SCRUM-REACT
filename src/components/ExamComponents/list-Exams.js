import React, { Component, Suspense } from 'react';
import { Redirect, Switch  } from 'react-router-dom';

import PropTypes from 'prop-types';
import axios from 'axios';


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
import { Container, Table,CardBody,Row,Col,Card,CardHeader,Badge,Button} from 'reactstrap';
import navigation from '../../_nav';
import routes from '../../routes';

const DefaultAside = React.lazy(() => import('../../containers/DefaultLayout/DefaultAside'));
const DefaultFooter = React.lazy(() => import('../../containers/DefaultLayout/DefaultFooter'));
const DefaultHeader = React.lazy(() => import('../../containers/DefaultLayout/DefaultHeader'));



const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};


class ListExams extends Component {
  

    
  
    componentWillMount() {
        console.log('Recuperation des données : exams')
        axios.get('http://localhost:3000/exams').then((response)=>{
         this.setState({
          exams : response.data
         })
         console.log(this.state.exams)
        });
        
    }
  
    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  
    signOut(e) {
      e.preventDefault()
      this.props.history.push('/login')
    }

    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.toggleFade = this.toggleFade.bind(this);
      this.state = {
        collapse: true,
        fadeIn: true,
        timeout: 300,
        exams : []
      };
    }
  
    toggle() {
      this.setState({ collapse: !this.state.collapse });
    }
  
    toggleFade() {
      this.setState((prevState) => { return { fadeIn: !prevState }});
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
               axios.delete('http://localhost:3000/exams/delete/'+id).then((response)=>{
              this.componentWillMount();
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
     }
  
  
   
    
    render() {
     
      let exams = this.state.exams.map((exams) => {
        
        return (
          
            
              <Col xs="12" sm="6" md="4">
              <Card key={exams._id.toString()} >
                <CardHeader className="text-white bg-warning">
               <h5>  {exams.title}</h5> 
                  <div className="card-header-actions">
                    <Badge pill color="danger" className="float-right">{exams.duree}</Badge>
                  </div>
                </CardHeader>
                <CardBody>
                  <center>
                  <h6>Type Exam:{exams.type}</h6>
                  <h6>Niveau:{exams.niveau}</h6>
                  <h6>Duree :{exams.duree}</h6>
                  <br></br>
                  <br></br>
                 <Link className="btn-pill btn btn-primary btn-sm" to={`/detailsexam/${exams._id}`}>see details</Link>
                 <Link className="btn-pill btn btn-warning btn-sm" to={`/updateExam/${exams._id}`}>update Exam</Link>
                 <Button color="danger" size="sm" className="btn-pill btn btn-danger btn-sm" onClick={() => this.handleClickDelete(exams._id)}>Delete</Button>
                 </center>
                </CardBody>
              </Card>
              </Col>
        )
      })
  
      
  
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
                <Suspense fallback={this.loading()}>
               
  
                <Link to="/createexam" className="navbar-brand">Create new Exam ... </Link>
                
                <Row> 
               
                {
                  exams
                }
               </Row> 
                
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
  
  
     
    
  
  export default ListExams;
  